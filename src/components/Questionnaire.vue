<template>
    <div>
        <h2>{{ questionnaire.name }}</h2>
        <div>
            <button @click="editQuestionnaire">Modifier le questionnaire</button>
            <button @click="deleteQuestionnaire">Supprimer le questionnaire</button>
            <button @click="addQuestion">Ajouter une question</button>
            <button @click="goBack">Retour à la liste</button>
        </div>

        <div v-if="questionnaire.questions.length > 0">
            <h3>Questions</h3>
            <div v-for="question in questionnaire.questions" :key="question.id" class="question-item">
                <p>{{ question.title }} (Order: {{ question.order }})</p>
                <button @click="editQuestion(question)">Modifier</button>
                <button @click="deleteQuestion(question)">Supprimer</button>
            </div>
        </div>

        <div v-else>
            <p>Aucune question dans ce questionnaire.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Questionnaire",
    props: {
        apiService: {
            type: Object,
            required: true
        },
        questionnaire: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            questionnaireData: this.questionnaire
        };
    },
    methods: {
        async editQuestionnaire() {
            this.$emit("edit-questionnaire", this.questionnaireData);
        },

        async deleteQuestionnaire() {
            try {
                await this.apiService.deleteQuestionnaire(this.questionnaireData);
                this.$emit("delete-questionnaire", this.questionnaireData);
            } catch (error) {
                this.$emit("error", error);
            }
        },

        async addQuestion() {
            this.$emit("add-question", this.questionnaireData);
        },

        async editQuestion(question) {
            this.$emit("edit-question", question);
        },

        async deleteQuestion(question) {
            try {
                await this.apiService.deleteQuestion(question);
                this.$emit("question-deleted", question);
            } catch (error) {
                this.$emit("error", error);
            }
        },

        goBack() {
            this.$emit("go-back");
        }
    }
};
</script>