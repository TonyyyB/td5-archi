<template>
  <div class="question-list">
    <h2>{{ questionnaire.name }}</h2>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <QuestionItems 
        :questions="questions" 
        @edit="editQuestion" 
        @delete="deleteQuestion"
      />
    </div>
    <div class="questionnaire-actions">
      <button @click="showAddQuestionModal = true">
        Ajouter une question
      </button>
      <button @click="editQuestionnaire">
        Modifier le questionnaire
      </button>
      <button @click="deleteCurrentQuestionnaire">
        Supprimer le questionnaire
      </button>
      <button @click="$emit('back')">
        Retour à la liste
      </button>
    </div>

    
    <div v-if="showAddQuestionModal" class="modal">
      <div class="modal-content">
        <h3>{{ isEditing ? 'Modifier la question' : 'Ajouter une nouvelle question' }}</h3>
        <input v-model="newQuestionTitle" placeholder="Titre de la question" />
        <div class="modal-actions">
          <button @click="cancelQuestionEdit">Annuler</button>
          <button @click="addQuestion">Valider</button>
        </div>
      </div>
    </div>

    
    <div v-if="showEditQuestionnaireModal" class="modal">
      <div class="modal-content">
        <h3>Modifier le questionnaire</h3>
        <input v-model="editedQuestionnaireName" placeholder="Nom du questionnaire" />
        <div class="modal-actions">
          <button @click="updateQuestionnaire">Valider</button>
          <button @click="showEditQuestionnaireModal = false">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { apiService } from '@/services/apiService'
import QuestionItems from '@/components/QuestionItems.vue'

export default {
  components: {
    QuestionItems
  },
  props: {
    questionnaire: {
      type: Object,
      required: true
    }
  },
  emits: ['back', 'update'],
  setup(props, { emit }) {
    const questions = ref([])
    const loading = ref(true)
    const error = ref(null)

    const showAddQuestionModal = ref(false)
    const showEditQuestionnaireModal = ref(false)
    const newQuestionTitle = ref('')
    const editedQuestionnaireName = ref('')

    const isEditing = ref(false)
    const currentQuestionId = ref(null)

    
    watch(() => props.questionnaire.id, (newId, oldId) => {
      if (newId && newId !== oldId) {
        fetchQuestions();
      }
    });

    async function fetchQuestions() {
      if (!props.questionnaire.id) return

      try {
        loading.value = true
        questions.value = await apiService.getQuestions(props.questionnaire.id)
        loading.value = false
      } catch (err) {
        error.value = 'Erreur lors du chargement des questions'
        loading.value = false
      }
    }

    function cancelQuestionEdit() {
      showAddQuestionModal.value = false
      isEditing.value = false
      newQuestionTitle.value = ''
      currentQuestionId.value = null
    }

    async function addQuestion() {
      if (!props.questionnaire.id || !newQuestionTitle.value.trim()) return

      try {
        if (isEditing.value) {
          const questionToUpdate = questions.value.find(q => q.id === currentQuestionId.value)
          if (questionToUpdate) {
            const updatedQuestion = {
              ...questionToUpdate,
              title: newQuestionTitle.value
            }
            await apiService.updateQuestion(props.questionnaire.id, updatedQuestion)
          }
        } else {
          const newQuestion = {
            id: null,
            title: newQuestionTitle.value,
            order: questions.value.length + 1,
            type: 'text'
          }
          await apiService.createQuestion(props.questionnaire.id, newQuestion)
        }

        
        await fetchQuestions()
        cancelQuestionEdit()
      } catch (err) {
        error.value = isEditing.value
          ? 'Erreur lors de la mise à jour de la question'
          : 'Erreur lors de l\'ajout de la question'
      }
    }

    async function deleteQuestion(question) {
      if (!props.questionnaire.id || !question.id) return

      try {
        await apiService.deleteQuestion(props.questionnaire.id, question.id)
        await fetchQuestions()
      } catch (err) {
        error.value = 'Erreur lors de la suppression de la question'
      }
    }

    function editQuestion(question) {
      newQuestionTitle.value = question.title
      currentQuestionId.value = question.id
      isEditing.value = true
      showAddQuestionModal.value = true
    }

    function editQuestionnaire() {
      if (!props.questionnaire.name) return

      editedQuestionnaireName.value = props.questionnaire.name
      showEditQuestionnaireModal.value = true
    }

    async function updateQuestionnaire() {
      if (!props.questionnaire.id) return

      try {
        const updatedQuestionnaire = {
          ...props.questionnaire,
          name: editedQuestionnaireName.value
        }
        await apiService.updateQuestionnaire(updatedQuestionnaire)
        
        
        emit('update', {...updatedQuestionnaire})
        
        showEditQuestionnaireModal.value = false
      } catch (err) {
        error.value = 'Erreur lors de la mise à jour du questionnaire'
      }
    }

    async function deleteCurrentQuestionnaire() {
      if (!props.questionnaire.id) return

      try {
        await apiService.deleteQuestionnaire(props.questionnaire.id)
        emit('back')
      } catch (err) {
        error.value = 'Erreur lors de la suppression du questionnaire'
      }
    }

    onMounted(fetchQuestions)

    return {
      questions,
      loading,
      error,
      showAddQuestionModal,
      showEditQuestionnaireModal,
      newQuestionTitle,
      editedQuestionnaireName,
      isEditing,
      currentQuestionId,
      addQuestion,
      deleteQuestion,
      editQuestion,
      editQuestionnaire,
      updateQuestionnaire,
      deleteCurrentQuestionnaire,
      cancelQuestionEdit
    }
  }
}
</script>

<style scoped>
.question-list {
  max-width: 800px;
  margin: 0 auto;
}

.questionnaire-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>