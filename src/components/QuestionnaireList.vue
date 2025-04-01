<template>
  <div class="questionnaire-list">
    <h2>Mes Questionnaires</h2>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <QuestionnaireItems 
      v-else
      :questionnaires="questionnaires"
      @select="selectQuestionnaire"
    />
    
    <button @click="showCreateModal = true">Créer un questionnaire</button>
          
    <div v-if="showCreateModal" class="modal">
      <div class="modal-content">
        <h3>Créer un nouveau questionnaire</h3>
        <input v-model="newQuestionnaireName" placeholder="Nom du questionnaire" />
        <div class="modal-actions">
          <button @click="showCreateModal = false">Annuler</button>
          <button @click="createQuestionnaire">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/apiService'
import QuestionnaireItems from '@/components/QuestionnaireItems.vue'

export default {
  components: {
    QuestionnaireItems
  },
  emits: ['select'],
  setup(props, { emit }) {
    const questionnaires = ref([])
    const loading = ref(true)
    const error = ref(null)
    const showCreateModal = ref(false)
    const newQuestionnaireName = ref('')
    
    async function fetchQuestionnaires() {
      try {
        loading.value = true
        questionnaires.value = await apiService.getQuestionnaires()
        loading.value = false
      } catch (err) {
        error.value = 'Erreur lors du chargement des questionnaires'
        loading.value = false
      }
    }
    
    async function createQuestionnaire() {
      if (!newQuestionnaireName.value.trim()) return
      
      try {
        const newQuestionnaire = await apiService.createQuestionnaire(newQuestionnaireName.value)
        
        
        await fetchQuestionnaires()
        
        showCreateModal.value = false
        newQuestionnaireName.value = ''
        
        
        if (newQuestionnaire && newQuestionnaire.id) {
          selectQuestionnaire(newQuestionnaire)
        }
      } catch (err) {
        error.value = 'Erreur lors de la création du questionnaire'
      }
    }
    
    function selectQuestionnaire(questionnaire) {
      emit('select', questionnaire)
    }
    
    onMounted(fetchQuestionnaires)
    
    return {
      questionnaires,
      loading,
      error,
      showCreateModal,
      newQuestionnaireName,
      createQuestionnaire,
      selectQuestionnaire,
      fetchQuestionnaires 
    }
  }
}
</script>

<style scoped>
.questionnaire-list {
  max-width: 600px;
  margin: 0 auto;
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