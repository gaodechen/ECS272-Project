import { createRouter, createWebHistory } from "vue-router";
import GlobalView from "../views/GlobalView.vue";
import LocalView from "../views/LocalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: GlobalView,
    },
    {
      path: "/artist/:id",
      name: "artist",
      component: LocalView,
    },
  ],
});

export default router;
