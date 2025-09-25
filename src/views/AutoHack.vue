<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-2xl mx-auto">
      <div class="card shadow-xl">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span class="text-3xl">🚗</span>
            AutoHack（Vue 3 + Vite 7 + UnoCSS）
          </h1>
          <el-button type="primary" @click="startHack" class="btn-primary">
            <span class="mr-2">🔧</span>
            开始破解
          </el-button>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p class="text-blue-800">
              <span class="font-semibold">✨ 现代化重构：</span>
              将旧的普通 HTML 流程重构为 Vue 3 视图，入口脚本仍复用 exploit 脚本。
            </p>
          </div>
          
          <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <p class="text-amber-800 flex items-center gap-2">
              <span class="text-lg">🔍</span>
              调试日志请查看 vConsole 与浏览器控制台。
            </p>
          </div>
          
          <div class="flex justify-center pt-4">
            <el-link 
              type="primary" 
              @click="goToLegacyVersion" 
              :underline="false"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <span class="text-xl">📱</span>
              切换到旧版本界面
            </el-link>
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