import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VueRouter from 'vue-router' // 引入VueRouter
import {routes} from "./router"
import Tui from './package' // 二次封装组件
import vueSeamlessScroll from 'vue-seamless-scroll' // 循环滚动

const router = new VueRouter({
  mode:"history",
  routes
})


Vue.use(vueSeamlessScroll)
Vue.use(Element)
Vue.use(Antd)
Vue.use(Tui)

Vue.config.productionTip = false

let vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
console.log("vm",vm)
