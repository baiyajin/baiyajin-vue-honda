// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'
import VConsole from 'vconsole'

const vconsole = new VConsole()

const app = createApp(App)
app.use(router)
app.use(Vant)
app.mount('#app')
