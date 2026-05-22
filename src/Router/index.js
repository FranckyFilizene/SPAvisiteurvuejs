import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Add from "../views/Add.vue";
import Dashboard from "../views/Dashboard.vue";
import List from "../views/List.vue";
import MainLayout from "../Layouts/MainLayout.vue";
import Inscription from "../views/Inscription.vue";
import Explorer from "../views/explorer.vue";
import Parametre from "../views/parametre.vue";
import Forgot from "../views/forgot.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription,
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
  },

  {
    path: "/",
    component: MainLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "add",
        name: "Add",
        component: Add,
      },
      {
        path: "list",
        name: "List",
        component: List,
      },
      {
        path: "parametre",
        name: "Parametre",
        component: Parametre,
      },
      {
        path: "explorer",
        name: "Explorer",
        component: Explorer,
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("token");
  const publicPages = ["/login", "/inscription"];

  if (!publicPages.includes(to.path) && !isAuth) {
    next("/login");
  } else if (publicPages.includes(to.path) && isAuth) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
