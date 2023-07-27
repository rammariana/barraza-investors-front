import { createRouter, createWebHistory } from "vue-router";
import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import adminView from "@/views/adminView";
import useLoginStore from "@/store/auth";

const routes = [
  {
    path: "/",
    redirect: () => {
      return { name: "home" };
    },
  },
  {
    path: "/home",
    name: "home",
    component: homeView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: loginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: adminView,
    meta: {
      requiresAuth: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(), //quite esto process.env.BASE_URL
  routes,
});
router.beforeEach((to, from, next) => {
  const store = useLoginStore();
  const token = store.token;
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
