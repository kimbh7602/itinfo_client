import Vue from "vue";
import Router from "vue-router";
import MainPage from "./components/MainPage.vue";
import NaverNews from "./components/NaverNews.vue";
import Inews from "./components/Inews.vue";
import Iwnews from "./components/Itword.vue";
import BoardList from "./components/BoardList.vue";
import BoardView from "./components/BoardView.vue";
import BoardInsert from "./components/BoardInsert.vue";
import BoardModify from "./components/BoardModify.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import store from "./store";

Vue.use(Router);

export const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "main",
            alias: "/MainPage",
            component: MainPage,
            props: true,
        },
        {
            path: "/navernews",
            name: "navernews",
            alias: "/navernews",
            component: NaverNews,
            props : true,
        },
        {
            path: "/inews",
            name: "inews",
            alias: "/inews",
            component: Inews,
            props : true,
        },
        {
            path: "/iwnews",
            name: "iwnews",
            alias: "/iwnews",
            component: Iwnews,
            props : true,
        },
        {
            path: "/boardlist",
            name: "boardlist",
            alias: "/boardlist",
            component: BoardList
        },
        {
            path : "/boardview/:id",
            name : "boardview",
            alias : "boardview",
            component : BoardView,
            props : true
        },
        {
            path : "/boardinsert",
            name : "boardinsert",
            alias : "boardinsert",
            component : BoardInsert
        },
        {
            path : "/boardmodify/:id",
            name : "boardmodify",
            alias : "boardmodify",
            component : BoardModify,
            props : true
        },
        {
            path : "/signup",
            name : "signup",
            alias : "signup",
            component : SignUp
        },
        {
            path : "/login",
            name : "login",
            alias : "login",
            component : Login
        },

    ]
});

router.beforeEach(function (to, from, next){
    store.commit('getChatId');
    store.commit("getId");
    store.commit("getToken");
    store.commit("getIinfo");
    store.commit("getNinfo");
    store.commit("getIwinfo");

    next();
});