import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/artist",
      name: "artist",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/artist/index.vue"),
    },
    {
      path: "/playlist-detail/:id",
      name: 'playlist-detail',
      component: () => import('../views/playlist-detail/index.vue')
    },
  ],
});

export default router;
