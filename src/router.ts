import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import HomeView from './pages/home.vue'
import {tools} from "./pages/index"
import {layouts} from "./layouts/index"
const toolsRoutes = tools.map(({name, component, path, ...config}) => ({
    path,
    name,
    component,
    meta: {name, isTool: true, layout: layouts.toollayout, ...config}
}))

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: HomeView,
        meta: {
            layout: layouts.toollayout
        }
    },
    ...toolsRoutes
]
console.log("🚀 ~ routes:", routes)

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router