<template>
  <div class="autohack">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>AutoHack（vue3 vite7 element-plus 版本）</span>
          <el-button type="primary" @click="startHack" plain>开始破解</el-button>
        </div>
      </template>
      <p>将旧的普通 HTML 流程重构为 Vue 3 视图，入口脚本仍复用 exploit 脚本。</p>
      <p>调试日志请查看 vConsole 与浏览器控制台。</p>
      <p>
        <el-link type="primary" @click="goToLegacyVersion" :underline="false">
          📱 切换到旧版本界面
        </el-link>
      </p>
    </el-card>
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

<style>
.autohack {
  padding: 16px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


