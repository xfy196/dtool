import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import HomeView from './pages/home.vue'
import {tools} from "./pages/index"
const toolsRoutes = tools.map(({name, component, path, ...config}) => ({
    path,
    name,
    component,
    meta: {name, ...config}
}))

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: HomeView
    },
    ...toolsRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router