<template>
  <div class="min-h-screen bg-gradient-primary p-4 animate-fade-in">
    <div class="container">
      <div class="card-hover ">
        <div class="p-6 border-b border-gray-200/50">
          <h1 class="text-3xl font-bold text-gradient flex items-center gap-3 mb-6 text-center justify-center">
            <span class="text-4xl animate-bounce-in">🚗</span>
            AutoHack（Vue 3 + Vite 7 + UnoCSS）
          </h1>
          <div class="flex gap-4 justify-center items-center">
            <el-button type="primary" @click="startHack" class="btn-primary">
              <span class="mr-2">🔧</span>
              开始破解
            </el-button>
            <el-button 
              type="primary" 
              @click="goToLegacyVersion" 
              class="btn-primary"
            >
              <span class="mr-2">📱</span>
              切换版本
            </el-button>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="glass-light border-l-4 border-blue-400 p-6 rounded-r-xl ">
            <p class="text-blue-800 text-lg">
              <span class="font-bold text-xl">✨ 现代化重构：</span>
              将旧的普通 HTML 流程重构为 Vue 3 视图，入口脚本仍复用 exploit 脚本。
            </p>
          </div>
          
          <div class="glass-light border-l-4 border-amber-400 p-6 rounded-r-xl ">
            <p class="text-amber-800 flex items-center gap-3 text-lg">
              <span class="text-2xl">🔍</span>
              调试日志请查看 vConsole 与浏览器控制台。
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'

export default {
  name: 'AutoHack',
  mounted () {
    // 设置全局错误处理器，供 exploit 脚本使用
    window.ERR = (msg) => {
      try {
        ElNotification({
          title: 'EXPLOIT ERROR',
          message: typeof msg === 'string' ? msg : (msg && msg.message) || 'Unknown error',
          type: 'error',
          position: 'bottom-right',
          duration: 0 // 保持显示直到手动关闭
        })
      } catch (e) {
        console.error('Error displaying notification:', e)
        // 降级到原生 alert
        alert('EXPLOIT ERROR: ' + (typeof msg === 'string' ? msg : (msg && msg.message) || 'Unknown error'))
      }
    }
  },
  methods: {
    startHack () {
      try {
        const head = document.getElementsByTagName('head')[0]
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.onload = () => {
          if (typeof window.start === 'function') {
            window.start()
          } else {
            ElNotification({ title: '提示', message: '未找到入口函数 window.start()', type: 'warning', position: 'bottom-right' })
          }
        }
        s.src = '/exploit/scriptidp.js?' + Date.now()
        head.appendChild(s)
      } catch (e) {
        ElNotification({ title: '错误', message: e && e.message ? e.message : String(e), type: 'error', position: 'bottom-right' })
      }
    },
    goToLegacyVersion () {
      // 跳转到旧版本界面（home 组件）
      this.$router.push('/home')
    }
  }
}
</script>