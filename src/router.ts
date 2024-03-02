import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("@/views/Home.vue") },
        { path: "/profile", component: () => import("@/views/Profile.vue") },
    ],
});

export default router;
