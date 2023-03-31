import Vue from "vue"
import VueRouter from 'vue-router' // 引入VueRouter

Vue.use(VueRouter)
export const routes = [
    {
        path:"/",
        redirect:"home"
    },
    {
        path:"/home",
        name:"home",
        component:()=>import("../components/scroll.vue")
    },
    {
        path:"/test",
        name:"test",
        component:()=>import("../components/test.vue")
    }
]