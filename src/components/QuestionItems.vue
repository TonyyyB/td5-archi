<template>
    <div>
      <div v-for="question in questions" :key="question.id" class="question-item">
        <div class="question-details">
          <h3>{{ question.title }}</h3>
          <p>Ordre: {{ question.order }}</p>
          <p>Type: {{ question.type }}</p>
        </div>
        <div class="question-actions">
          <button @click="$emit('edit', question)">Modifier</button>
          <button @click="$emit('delete', question)">Supprimer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      questions: {
        type: Array,
        required: true
      }
    },
    emits: ['edit', 'delete']
  }
  </script>
  
  <style scoped>
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
  </style>