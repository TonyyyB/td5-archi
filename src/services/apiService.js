// src/services/apiService.js
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:5000/todo/api/v1.0'

export const apiService = {
  // Questionnaire methods
  async getQuestionnaires() {
    const response = await axios.get(`${BASE_URL}/questionnaires`)
    return response.data.questionnaires
  },

  async createQuestionnaire(name) {
    const response = await axios.post(`${BASE_URL}/questionnaires`, { name })
    return response.data
  },

  async updateQuestionnaire(questionnaire) {
    const response = await axios.put(`${BASE_URL}/questionnaires/${questionnaire.id}`, { 
      name: questionnaire.name 
    })
    return response.data
  },

  async deleteQuestionnaire(questionnaireId) {
    await axios.delete(`${BASE_URL}/questionnaires/${questionnaireId}`)
  },

  // Question methods
  async getQuestions(questionnaireId) {
    const response = await axios.get(`${BASE_URL}/questionnaires/${questionnaireId}/questions`)
    return response.data.questions
  },

  async createQuestion(questionnaireId, question) {
    const response = await axios.post(`${BASE_URL}/questionnaires/${questionnaireId}/questions`, {
      title: question.title,
      type: 'text',
      order: question.order
    })
    return response.data
  },

  async updateQuestion(questionnaireId, question) {
    const response = await axios.put(`${BASE_URL}/questionnaires/${questionnaireId}/questions/${question.id}`, {
      title: question.title
    })
    return response.data
  },

  async deleteQuestion(questionnaireId, questionId) {
    await axios.delete(`${BASE_URL}/questionnaires/${questionnaireId}/questions/${questionId}`)
  }
}