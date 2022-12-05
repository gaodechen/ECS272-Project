import { createRouter, createWebHistory } from "vue-router";
import GlobalView from "../views/GlobalView.vue";
import LocalView from "../views/LocalView.vue";
import TrackView from "../mir/views/Track.vue";
import LoginView from "../mir/views/Login.vue";
import CallbackView from "../mir/views/Callback.vue";
import * as auth from "../mir/app/authentication";

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
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/track/:trackId",
      component: TrackView,
      beforeEnter(to, from, next) {
        console.log(
          "Prev stored trackid: ",
          window.localStorage.getItem("trackId")
        );
        if (to.params.trackId !== -1) {
          window.localStorage.setItem("trackId", to.params.trackId);
        }
        console.log(
          "New stored trackid: ",
          window.localStorage.getItem("trackId")
        );

        if (auth.isAuthorized()) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      path: "/callback",
      name: "Callback",
      component: CallbackView,
      beforeEnter(to, from, next) {
        console.log(
          "After callback trackid: ",
          window.localStorage.getItem("trackId")
        );
        next();
      },
    },
  ],
});

export default router;
