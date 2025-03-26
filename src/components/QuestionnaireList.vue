<script>
export default {
    name: "QuestionnaireList",
    props: {
        api: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            questionnaires: []
        };
    },
    created() {
        this.loadQuestionnaires();
    },
    methods: {
        async loadQuestionnaires() {
            try {
                this.questionnaires = await this.api.getQuestionnaires();
                console.log(this.questionnaires);
            } catch (error) {
                this.$emit('error', error);
            }
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