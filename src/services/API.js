export default class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getQuestionnaires() {
        try {
            const response = await fetch(`${this.baseURL}/questionnaires`);
            const data = await response.json();
            return data["questionnaires"].map(questionnaire => this._mapQuestionnaire(questionnaire));
        } catch (error) {
            this.onerror(error);
        }
    }

    async addQuestionnaire(questionnaire) {
        try {
            const response = await fetch(`${this.baseURL}/questionnaires`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: questionnaire.name })
            });
            return response;
        } catch (error) {
            this.onerror(error);
        }
    }

    async editQuestionnaire(questionnaire) {
        try {
            const response = await fetch(questionnaire.uri, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: questionnaire.name })
            });
            return response;
        } catch (error) {
            this.onerror(error);
        }
    }

    async deleteQuestionnaire(questionnaire) {
        try {
            const response = await fetch(questionnaire.uri, {
                method: 'DELETE'
            });
            return response;
        } catch (error) {
            this.onerror(error);
        }
    }

    async getQuestions(questionnaire) {
        try {
            const response = await fetch(`${questionnaire.uri}/questions`);
            const data = await response.json();
            return data["questions"].map(question => this._mapQuestion(question, questionnaire));
        } catch (error) {
            this.onerror(error);
        }
    }

    async addQuestion(question) {
        try {
            const response = await fetch(`${question.questionnaire.uri}/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: question.title,
                    type: question.type,
                    order: question.order
                })
            });
            return response;
        } catch (error) {
            this.onerror(error);
        }
    }

    async editQuestion(question) {
        try {
            const response = await fetch(question.uri, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: question.title,
                    type: question.type,
                    order: question.order
                })
            });
            return response;
        } catch (error) {
            this.onerror(error);
        }
    }

    async deleteQuestion(question) {
        try {
            const response = await fetch(question.uri, {
                method: 'DELETE'
            });
            return response;
        } catch (error) {
            this.onerror(error);
        }
    }

    onerror(error) {
        console.error("Une erreur s'est produite:", error);
    }

    _mapQuestionnaire(json) {
        return {
            id: json.id,
            name: json.name,
            uri: json.uri,
            questions: []
        };
    }

    _mapQuestion(json, questionnaire) {
        return {
            id: json.id,
            title: json.title,
            order: json.order,
            type: json.type,
            questionnaire: questionnaire,
            uri: json.uri
        };
    }
}
