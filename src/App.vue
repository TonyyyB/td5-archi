<template>
  <div id="app">
    <h1>Application de Quiz</h1>
    <div id="error" v-if="error">
      <b>Une erreur s'est produite :</b> {{ error }}
    </div>

    <QuestionnaireList 
      v-if="!selectedQuestionnaire" 
      @select="selectQuestionnaire"
      ref="questionnaireListRef"
    />

    <QuestionList 
      v-else 
      :questionnaire="selectedQuestionnaire" 
      @back="deselectQuestionnaire"
      @update="updateSelectedQuestionnaire"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import QuestionnaireList from '@/components/QuestionnaireList.vue'
import QuestionList from '@/components/QuestionList.vue'

export default {
  components: {
    QuestionnaireList,
    QuestionList
  },
  setup() {
    const selectedQuestionnaire = ref(null)
    const error = ref(null)
    const questionnaireListRef = ref(null)

    function selectQuestionnaire(questionnaire) {
      // Créer une copie pour éviter les références partagées
      selectedQuestionnaire.value = {...questionnaire}
    }

    function deselectQuestionnaire() {
      selectedQuestionnaire.value = null
      
      // Rafraîchir la liste des questionnaires lors du retour
      if (questionnaireListRef.value && 
          typeof questionnaireListRef.value.fetchQuestionnaires === 'function') {
        questionnaireListRef.value.fetchQuestionnaires()
      }
    }
    
    function updateSelectedQuestionnaire(updatedQuestionnaire) {
      // Mettre à jour l'objet questionnaire sélectionné
      if (updatedQuestionnaire && updatedQuestionnaire.id) {
        selectedQuestionnaire.value = {...updatedQuestionnaire}
      }
    }

    return {
      selectedQuestionnaire,
      error,
      selectQuestionnaire,
      deselectQuestionnaire,
      updateSelectedQuestionnaire,
      questionnaireListRef
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

#error {
  color: red;
  margin-bottom: 20px;
}
</style>