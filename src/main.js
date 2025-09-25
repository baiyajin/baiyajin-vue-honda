// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VConsole from 'vconsole'
import ElementPlus from 'element-plus'
import { ElNotification } from 'element-plus'
import 'element-plus/dist/index.css'

const vconsole = new VConsole()

// 将 ElNotification 挂载到全局，供 exploit 脚本使用
window.ElNotification = ElNotification

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
