<template>
  <ul>
    <li v-for="questionnaire in questionnaires" :key="questionnaire.id" @click="$emit('select', questionnaire)">
      {{ questionnaire.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    questionnaires: {
      type: Array,
      required: true
    }
  },
  emits: ['select']
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
}

li:hover {
  background-color: #f0f0f0;
}
</style>