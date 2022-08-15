import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyNotes from "../views/MyNotes.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: "/notes",
        name: "myNotes",
        component: MyNotes,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("../views/NotFound.vue") },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
