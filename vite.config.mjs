import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function customDevEndpoints() {
  return {
    name: 'custom-dev-endpoints',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          const url = req.url || ''
          if (url.startsWith('/stage1_xml.py')) {
            const xslPath = path.resolve(__dirname, 'static', 'baiyajin-honda', 'stylesheet.xsl')
            if (fs.existsSync(xslPath)) {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8')
              res.end(fs.readFileSync(xslPath, 'utf-8'))
              return
            }
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
          if (url.startsWith('/stage1_xml.py')) {
            const xslPath = path.resolve(__dirname, 'static', 'baiyajin-honda', 'stylesheet.xsl')
            if (fs.existsSync(xslPath)) {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8')
              res.end(fs.readFileSync(xslPath, 'utf-8'))
              return
            }
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


