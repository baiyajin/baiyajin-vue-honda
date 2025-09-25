import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
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
            const payload = stage1Toggle ? 'idA' : 'idB'
            const xsl = '<?xml version="1.0" encoding="utf-8"?>\n'
              + '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">\n'
              + '  <xsl:output method="xml" omit-xml-declaration="yes" />\n'
              + '  <xsl:template match="/*">\n'
              + `    <data>${payload}</data>\n`
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
  plugins: [vue(), customDevEndpoints()],
  root: '.',
  publicDir: 'static',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  server: {
    host: true
  }
})


