import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyNotes from "../views/MyNotes.vue";

const routes = [
    {
        path: "/",
        name: "home",
        alias: "/home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        redirect: "/",
    },
    {
        path: "/notes",
        name: "myNotes",
        component: MyNotes,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("../views/NotFound.vue") },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
