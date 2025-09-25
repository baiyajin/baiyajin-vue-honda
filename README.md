## baiyajin-vue-honda (Vue 3 + Vite)

破解思域车机系统，安装自定义 app。项目已重构为 Vue 3 + Vite 7（不使用 TS）。

### 技术QQ群：484751030

### 使用
```bash
npm install
npm run dev       # 本地开发
npm run build     # 生产构建
npm run preview   # 预览生产构建
```

### 说明
- 静态破解脚本放在 `static/`，通过 Vite `publicDir` 直接按根路径访问，例如 `/stage4.js`、`/scriptidp.js`。
- 入口文件为 `index.html` 与 `src/main.js`（ESM）。
- 路由升级到 Vue Router 4。
