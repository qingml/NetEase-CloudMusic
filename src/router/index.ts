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
      component: () => import("../views/artist/index.vue"),
    },
    {
      path: "/playlist-detail/:id",
      name: "playlist-detail",
      component: () => import("../views/playlist-detail/index.vue"),
    },
    {
      path: "/toplist",
      name: "toplist",
      component: () => import("../views/toplist/index.vue"),
    },
    {
      path: "/singerlist-detail/:id",
      name: "singerlist-detail",
      component: () => import("../views/singerlist-detail/index.vue"),
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () => import("../views/play-list/index.vue"),
    },
  ],
});

export default router;
