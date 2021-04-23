<template>
  <div>
    <van-button @click="show = !show" plain hairline type="primary" style="border-color:#8098ff;color:#8098ff;">开始破解</van-button>
    <van-button v-if="src" @click="checkCode" plain hairline type="primary" style="border-color:#8098ff;color:#8098ff;">查看原代码</van-button>
    <van-dialog v-model="show" title="授权码" show-cancel-button @confirm="submitCode">
      <van-form>
        <van-field v-on:input="validator" clearable v-model="authorizationCode" input-align="center" placeholder="请输入授权码"/>
      </van-form>
    </van-dialog>

    <van-form style="margin-top: 100px;">
      <van-field clearable v-model="code.device_id" input-align="center" placeholder="请输入设备ID"/>
      <van-button @click="on_button_click" plain hairline type="primary" style="border-color:#8098ff;color:#8098ff;">生成注册码</van-button>
      <van-field clearable v-model="code.registration_code" input-align="center"/>
    </van-form>
  </div>
</template>

<script>
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
        this.$toast(this.toast)
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
        return this.$toast({
          message: '请输入8位设备ID',
          icon: 'fail'
        })
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
      return this.$toast({
        message: '生成注册码成功',
        icon: 'fail'
      })
    },
    validator (val) {
      if (!val) {
        this.toast = {
          message: '请填写授权码',
          icon: 'fail'
        }
        return false
      }
      if (val.toString().length !== 10) {
        this.toast = {
          message: '授权码格式不正确',
          icon: 'cross'
        }
        return false
      }
      this.toast = {
        message: '授权码正确',
        icon: 'success'
      }
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
      this.$toast(a)
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
  }
}
</script>

<style>
  .van-toast {
    top: 90%;
  }
</style>
