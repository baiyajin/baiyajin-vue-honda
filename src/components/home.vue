<template>
  <div>
    <van-button @click="show = !show" plain hairline type="primary" style="border-color:#8098ff;color:#8098ff;">开始破解</van-button>
    <van-button v-if="src" @click="checkCode" plain hairline type="primary" style="border-color:#8098ff;color:#8098ff;">查看原代码</van-button>
    <van-dialog v-model="show" title="授权码" show-cancel-button @confirm="submitCode">
      <van-form>
        <van-field v-on:input="validator" clearable v-model="authorizationCode" input-align="center" placeholder="请输入授权码"/>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
