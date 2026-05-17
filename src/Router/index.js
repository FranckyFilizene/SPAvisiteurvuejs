import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Add from "../views/Add.vue";
import Dashboard from "../views/Dashboard.vue";
import List from "../views/List.vue";
import MainLayout from "../Layouts/MainLayout.vue";
import Inscription from "../views/Inscription.vue";
import Explorer from "../views/explorer.vue";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/inscription",
    component: Inscription,
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "add",
        component: Add,
      },
      {
        path: "list",
        component: List,
      },
      {
        path:"explorer" ,
        component : Explorer ,
      }
    ],
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
  } else {
    next();
  }
});
export default router;
