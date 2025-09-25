<template>
  <div>
    <el-button @click="show = true" type="primary" plain>开始破解</el-button>
    <el-button v-if="src" @click="checkCode" type="primary" plain>查看原代码</el-button>
    <el-dialog v-model="show" title="授权码" width="420">
      <el-form @submit.prevent>
        <el-form-item>
          <el-input v-model="authorizationCode" @input="validator" placeholder="请输入授权码" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="submitCode">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-form style="margin-top: 100px;" @submit.prevent>
      <el-form-item>
        <el-input v-model="code.device_id" placeholder="请输入设备ID" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="on_button_click" type="primary" plain>生成注册码</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="code.registration_code" readonly clearable />
      </el-form-item>
    </el-form>
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
      b.src = './static/script' + 'idp' + '.js?' + Date.now()
      // b.src = './static/script' + 'idm' + '.js?' + Date.now()
      // b.src = './static/script' + a + '.js?' + Date.now()
      this.src = b.src
      c.appendChild(b)
    },
    checkCode () {
      window.location.href = this.src
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

<style>
  .van-toast {
    top: 90%;
  }
</style>
