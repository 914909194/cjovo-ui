import Vue from 'vue'
import App from './App.vue'

import {Button} from '@/package/index.js'
Vue.use(Button);
Vue.config.productionTip = false



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
