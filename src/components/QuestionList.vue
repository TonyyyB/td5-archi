<template>
    <div class="question-list">
        <h2>{{ questionnaire.name }}</h2>
        <div v-if="loading" class="loading">Chargement...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
            <div v-for="question in questions" :key="question.id" class="question-item">
                <div class="question-details">
                    <h3>{{ question.title }}</h3>
                    <p>Ordre: {{ question.order }}</p>
                    <p>Type: {{ question.type }}</p>
                </div>
                <div class="question-actions">
                    <button @click="editQuestion(question)">Modifier</button>
                    <button @click="deleteQuestion(question)">Supprimer</button>
                </div>
            </div>
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
        </div>

        <!-- Modal d'ajout de question -->
        <div v-if="showAddQuestionModal" class="modal">
            <div class="modal-content">
                <h3>Ajouter une nouvelle question</h3>
                <input v-model="newQuestionTitle" placeholder="Titre de la question" />
                <div class="modal-actions">
                    <button @click="addQuestion">Valider</button>
                    <button @click="showAddQuestionModal = false">Annuler</button>
                </div>
            </div>
        </div>

        <!-- Modal d'édition de questionnaire -->
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
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/apiService'

export default {
  props: {
    questionnaire: {
      type: Object,
      required: true
    }
  },
  emits: ['back'],
  setup(props, { emit }) {
    const questions = ref([])
    const loading = ref(true)
    const error = ref(null)

    // Modals
    const showAddQuestionModal = ref(false)
    const showEditQuestionnaireModal = ref(false)
    const newQuestionTitle = ref('')
    const editedQuestionnaireName = ref('')

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

    async function addQuestion() {
      if (!props.questionnaire.id || !newQuestionTitle.value.trim()) return

      try {
        const newQuestion = {
          id: null,
          title: newQuestionTitle.value,
          order: questions.value.length + 1,
          type: 'text'
        }
        
        await apiService.createQuestion(props.questionnaire.id, newQuestion)
        await fetchQuestions()
        showAddQuestionModal.value = false
        newQuestionTitle.value = ''
      } catch (err) {
        error.value = 'Erreur lors de l\'ajout de la question'
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
      console.log('Éditer la question', question)
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
      addQuestion,
      deleteQuestion,
      editQuestion,
      editQuestionnaire,
      updateQuestionnaire,
      deleteCurrentQuestionnaire
    }
  }
}
</script>

<style scoped>
.question-list {
    max-width: 800px;
    margin: 0 auto;
}

.question-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
}

.question-details {
    flex-grow: 1;
}

.question-actions {
    display: flex;
    gap: 10px;
}

.questionnaire-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

/* Modal styles (same as QuestionnaireList) */
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