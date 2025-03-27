import { createMemoryHistory, createRouter } from 'vue-router'
import QuestionnaireList from './components/QuestionnaireList.vue'
const routes = [
    { path: '/', component: QuestionnaireList },
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;