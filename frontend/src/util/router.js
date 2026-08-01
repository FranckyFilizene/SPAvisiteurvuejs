import { createRouter, createWebHistory } from "vue-router";
import Login from "../forms/Login.vue";
import Inscription from "../forms/Inscription.vue"

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: Inscription,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;