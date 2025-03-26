<script>
import API from './services/API.js';
import QuestionnaireList from './components/QuestionnaireList.vue';
export default {
  name: "App",
  data() {
    return {
      api: new API()
    }
  },
  created() {
  },
  methods: {

  }
};
</script>
<template>
  <div id="app">
    <header>
      <h1>Application de gestion de questionnaires</h1>
    </header>
    <main>
      <QuestionnaireList>

      </QuestionnaireList>
    </main>
  </div>
</template>
