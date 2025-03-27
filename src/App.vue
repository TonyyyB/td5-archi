<script>
import API from './services/API.js';
import QuestionnaireList from './components/QuestionnaireList.vue';
import { RouterView } from 'vue-router';
export default {
  name: "App",
  data() {
    return {
      api: new API("http://127.0.0.1:5000/todo/api/v1.0/")
    }
  },
  created() {
  },
  methods: {

  },
  components: {
    QuestionnaireList
  }
};
</script>
<template>
  <div id="app">
    <header>
      <h1>Application de gestion de questionnaires</h1>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
