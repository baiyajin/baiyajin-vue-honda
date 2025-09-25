<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- 头部按钮区域 -->
      <div class="flex-col-center space-y-4 mb-8">
        <div class="flex gap-4 flex-wrap justify-center">
          <el-button @click="show = true" type="primary" class="btn-primary">
            <span class="mr-2">🔓</span>
            开始破解
          </el-button>
          <el-button v-if="src" @click="checkCode" type="primary" class="btn-secondary">
            <span class="mr-2">👁️</span>
            查看原代码
          </el-button>
        </div>
        
        <el-link 
          type="success" 
          @click="goToNewVersion" 
          :underline="false"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
        >
          <span class="text-xl">🚀</span>
          切换到新版本界面
        </el-link>
      </div>
      <!-- 授权码对话框 -->
      <el-dialog v-model="show" title="🔐 授权码" width="420" class="rounded-lg">
        <div class="space-y-4">
          <el-form @submit.prevent>
            <el-form-item>
              <el-input 
                v-model="authorizationCode" 
                @input="validator" 
                placeholder="请输入授权码" 
                clearable 
                class="input"
              />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <el-button @click="show = false" class="btn-secondary">取 消</el-button>
            <el-button type="primary" @click="submitCode" class="btn-primary">确 定</el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 设备ID和注册码区域 -->
      <div class="card bg-white/80 backdrop-blur-sm">
        <h2 class="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <span class="text-2xl">🛠️</span>
          设备管理
        </h2>
        
        <el-form @submit.prevent class="space-y-6">
          <el-form-item>
            <label class="block text-sm font-medium text-gray-700 mb-2">设备ID</label>
            <el-input 
              v-model="code.device_id" 
              placeholder="请输入设备ID" 
              clearable 
              class="input"
            />
          </el-form-item>
          
          <div class="flex justify-center">
            <el-button 
              @click="on_button_click" 
              type="primary" 
              class="btn-primary px-8 py-3"
            >
              <span class="mr-2">⚙️</span>
              生成注册码
            </el-button>
          </div>
          
          <el-form-item>
            <label class="block text-sm font-medium text-gray-700 mb-2">注册码</label>
            <el-input 
              v-model="code.registration_code" 
              placeholder="生成的注册码将显示在这里" 
              clearable 
              readonly
              class="input bg-gray-50"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  data () {
    return {
      code: {
        device_id: '',
        registration_code: ''
      },
      show: false,
      src: '',
      authorizationCode: '0946993636',
      toast: {
        message: '',
        icon: ''
      }
    }
  },
  watch: {
    'authorizationCode': {
      handler (n, o) {
        ElNotification({
          title: '提示',
          message: this.toast && this.toast.message ? this.toast.message : '输入已更新',
          type: 'info',
          position: 'bottom-right',
          duration: 1500
        })
      }
    }
  },
  methods: {
    on_button_click () {
      let isValidCode = (code) => {
        return typeof code === 'string' && code.length === 8 && !isNaN(Number('0x' + code))
      }
      let hashCode = (str) => {
        // eslint-disable-next-line one-var
        let hash = 0, i, chr
        for (i = 0; i < str.length; i++) {
          chr = str.charCodeAt(i)
          hash = ((hash << 5) - hash) + chr
          hash |= 0 // Convert to 32bit integer
        }
        return hash
      }
      let round = (v) => {
        return (v >= 0 || -1) * Math.floor(Math.abs(v))
      }
      let deviceId = this.code.device_id.toUpperCase()
      if (!isValidCode(deviceId)) {
        ElNotification({ title: '提示', message: '请输入8位设备ID', type: 'warning', position: 'bottom-right' })
        return
      }
      let str = 'google.com' + deviceId
      let code = hashCode(str)
      let c = Math.imul(code, code)
      let d = round(53 / code)
      let e = round(code / 4)
      let f = Math.imul(e, 113)
      let i = c + d + f
      let j = 65535 & ((i & 65535) + ((i & -65536) >>> 16))
      let hexStr = j.toString(16)
      this.code.registration_code = hexStr.toUpperCase() + '-XXXX'
      ElNotification({ title: '成功', message: '生成注册码成功', type: 'success', position: 'bottom-right' })
      return
    },
    validator (val) {
      if (!val) {
        this.toast = { message: '请填写授权码', icon: 'fail' }
        return false
      }
      if (val.toString().length !== 10) {
        this.toast = { message: '授权码格式不正确', icon: 'cross' }
        return false
      }
      this.toast = { message: '授权码正确', icon: 'success' }
      return true
    },
    submitCode () {
      // http://autohack.cn/root/index.php?action=root&key=0946993636
      let a = (new DOMParser()).parseFromString('<root/>', 'text/xml')
      let c = (new DOMParser()).parseFromString('<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" ><xsl:template match="/*"><data><xsl:value-of select="generate-id()" /></data></xsl:template></xsl:stylesheet>', 'text/xml')
      let b = new XSLTProcessor()
      b.importStylesheet(c)
      a = b.transformToDocument(a)
      a = a.getElementsByTagName('data')[0].childNodes[0].nodeValue
      a = a.replace(/[0-9]/g, '')
      ElNotification({ title: '信息', message: a, type: 'info', position: 'bottom-right' })
      c = document.getElementsByTagName('head')[0]
      b = document.createElement('script')
      b.type = 'text/javascript'
      b.onload = (e) => {
        // eslint-disable-next-line no-undef
        key = this.authorizationCode
        window.start()
      }
      b.src = './static/exploit/script' + 'idp' + '.js?' + Date.now()
      // b.src = './static/exploit/script' + 'idm' + '.js?' + Date.now()
      // b.src = './static/exploit/script' + a + '.js?' + Date.now()
      this.src = b.src
      c.appendChild(b)
    },
    checkCode () {
      window.location.href = this.src
    },
    goToNewVersion () {
      // 跳转到新版本界面（AutoHack 组件）
      this.$router.push('/')
    }
  },
  mounted () {
    window.ERR = (msg) => {
      try {
        ElNotification({
          title: 'EXPLOIT ERROR',
          message: typeof msg === 'string' ? msg : (msg && msg.message) || 'Unknown error',
          type: 'error',
          position: 'bottom-right',
          duration: 5000
        })
      } catch (e) {
        console.error('EXPLOIT ERROR:', msg)
      }
    }
  }
}
</script>