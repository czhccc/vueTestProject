import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import toast from 'components/common/toast'
Vue.use(toast) // 安装 toast 插件

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // new 一个 Vue 实例，作为事件总线

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
