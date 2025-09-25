import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let stage1Toggle = false

function customDevEndpoints() {
  return {
    name: 'custom-dev-endpoints',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          const url = req.url || ''
          // Back-compat rewrites for legacy paths
          if (url === '/stage4.js') { req.url = '/exploit/stage4.js' }
          if (url === '/scriptidp.js') { req.url = '/exploit/scriptidp.js' }
          if (url === '/scriptidm.js') { req.url = '/exploit/scriptidm.js' }
          if (url === '/script.js') { req.url = '/exploit/script.js' }
          if (url.startsWith('/stage1_xml.py')) {
            stage1Toggle = !stage1Toggle
            // 模拟页面修改，通过添加不同的注释来让 generate-id() 返回不同的值
            const comment = stage1Toggle ? '<!-- modified -->' : '<!-- original -->'
            const xsl = '<?xml version="1.0" encoding="utf-8"?>\n'
              + '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">\n'
              + '  <xsl:output method="xml" omit-xml-declaration="yes" />\n'
              + '  <xsl:template match="/*">\n'
              + `    ${comment}\n`
              + '    <data><xsl:value-of select="generate-id()"/></data>\n'
              + '  </xsl:template>\n'
              + '</xsl:stylesheet>'
            res.setHeader('Content-Type', 'application/xml; charset=utf-8')
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
            res.setHeader('Pragma', 'no-cache')
            res.setHeader('Expires', '0')
            res.end(xsl)
            return
          }
          if (req.method === 'POST' && url.startsWith('/log/error')) {
            res.statusCode = 204
            res.end()
            return
          }
        } catch (e) {
          // fallthrough
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          const url = req.url || ''
          if (url === '/stage4.js') { req.url = '/exploit/stage4.js' }
          if (url === '/scriptidp.js') { req.url = '/exploit/scriptidp.js' }
          if (url === '/scriptidm.js') { req.url = '/exploit/scriptidm.js' }
          if (url === '/script.js') { req.url = '/exploit/script.js' }
          if (url.startsWith('/stage1_xml.py')) {
            const xsl = '<?xml version="1.0" encoding="utf-8"?>\n'
              + '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">\n'
              + '  <xsl:output method="xml" omit-xml-declaration="yes" />\n'
              + '  <xsl:template match="/*">\n'
              + '    <data><xsl:value-of select="generate-id()"/></data>\n'
              + '  </xsl:template>\n'
              + '</xsl:stylesheet>'
            res.setHeader('Content-Type', 'application/xml; charset=utf-8')
            res.end(xsl)
            return
          }
          if (req.method === 'POST' && url.startsWith('/log/error')) {
            res.statusCode = 204
            res.end()
            return
          }
        } catch (e) {
          // fallthrough
        }
        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: [
        'Android >= 4.0',
        'Chrome >= 30',
        'Safari >= 6',
        'iOS >= 6',
        'Firefox >= 30',
        'Samsung >= 4',
        'and_chr >= 30',
        'and_ff >= 30',
        'and_uc >= 9.9'
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
    customDevEndpoints()
  ],
  root: '.',
  publicDir: 'static',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  server: {
    host: true
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  }
})


