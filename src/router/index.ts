import { createWebHistory, createRouter } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    name: "settings",
    path: "/settings",
    component: () => import("@/views/SettingsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
