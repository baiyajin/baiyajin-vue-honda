<template>
  <div class="autohack">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>AutoHack（vue3 vite7 版）</span>
          <el-button type="primary" @click="startHack" plain>开始破解</el-button>
        </div>
      </template>
      <p>将旧的普通 HTML 流程重构为 Vue 3 视图，入口脚本仍复用 exploit 脚本。</p>
      <p>调试日志请查看 vConsole 与浏览器控制台。</p>
    </el-card>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'

export default {
  name: 'AutoHack',
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


