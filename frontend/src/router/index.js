import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/home/Home.vue";
import Login from "../components/login/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
