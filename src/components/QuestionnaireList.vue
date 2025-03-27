<script>
export default {
    name: "QuestionnaireList",
    data() {
        return {
            questionnaires: []
        };
    },
    mounted() {
        this.loadQuestionnaires();
    },
    methods: {
        loadQuestionnaires() {

        },
        viewQuestionnaire(questionnaire) {

        },
        addQuestionnaire() {

        }
    }
}
</script>
<template>
    <div>
        <h2>Liste des questionnaires</h2>
        <ul>
            <li v-for="questionnaire in questionnaires" :key="questionnaire.id"
                @click="viewQuestionnaire(questionnaire)">
                {{ questionnaire.name }}
            </li>
        </ul>
        <button @click="addQuestionnaire">Ajouter un questionnaire</button>
    </div>
</template>