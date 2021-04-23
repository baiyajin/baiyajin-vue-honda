// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// npm i vant -S
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'
// 手机端调试神器
import Vconsole from 'vconsole'
// eslint-disable-next-line no-unused-vars
let vConsole = new Vconsole()
Vue.use(Vant)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
