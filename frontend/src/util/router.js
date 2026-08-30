import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "./auth.js";

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../forms/Login.vue"),
        meta: { guestOnly: true, title: "Connexion" },
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: () => import("../forms/Inscription.vue"),
        meta: { guestOnly: true, title: "Inscription" },
    },
    {
        path: "/mot-de-passe-oublie",
        name: "ForgotPassword",
        component: () => import("../forms/forgot.vue"),
        meta: { guestOnly: true, title: "Mot de passe oublié" },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        meta: { requiresAuth: true, title: "Tableau de bord" },
    },
    {
        // 404 pour toute route inconnue
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: { title: "Page introuvable" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Garde de navigation :
// - les routes privées (requiresAuth) exigent une session active ;
// - les pages d'authentification (guestOnly) renvoient vers le
//   tableau de bord si l'utilisateur est déjà connecté.
router.beforeEach((to) => {
    const isLoggedIn = isAuthenticated();

    if (to.meta.requiresAuth && !isLoggedIn) {
        return { name: "Login", query: { redirect: to.fullPath } };
    }
    if (to.meta.guestOnly && isLoggedIn) {
        return { name: "Dashboard" };
    }
});

// Met à jour le titre de l'onglet à chaque navigation.
router.afterEach((to) => {
    document.title = to.meta.title
        ? `${to.meta.title} — Visiteur.com`
        : "Visiteur.com";
});

export default router;
