# 🚗 baiyajin-vue-honda (Vue 3 + Vite 7)

> 🔧 思域车机（HONDA Headunit）破解入口与工具前端。已完整重构为 Vue 3 + Vite 7，纯 JavaScript（无 TS），UI 采用 Element Plus。

## 💬 技术交流群
- 📱 QQ 群三，群一二已满：484751030

## ✨ 特性一览
- 🚀 Vue 3 组合式生态，构建与热更由 Vite 7 驱动
- 🎨 Element Plus 作为 UI 组件库（已移除 Vant）
- 📁 通过 Vite `publicDir` 直出静态破解脚本，路径与老版本保持一致
- 🔧 内置开发端点，模拟 `stage1_xml.py` 与错误上报，便于本地调试
- 📏 ESLint 9（Flat Config）规则，提供基础质量保障
- 📱 **Android 4.0+ 浏览器兼容**：使用 `@vitejs/plugin-legacy` 自动降级支持

---

## 🚀 快速开始
```bash
pnpm install
pnpm run dev      # http://localhost:5173

# 生产构建
pnpm run build    # 产物输出 dist/
pnpm run preview  # 本地预览生产包

# 代码检查
pnpm run lint
```

🎯 启动后，在首页点击"开始破解"。若为本地环境，将通过内置端点模拟第一阶段 XML/XSLT 响应，便于验证流程。

---

## 📁 目录结构
```text
.
├─ index.html                 # Vite HTML 入口
├─ vite.config.mjs            # Vite 配置（含本地模拟端点）
├─ eslint.config.js           # ESLint 9 Flat Config
├─ src/
│  ├─ main.js                 # 应用入口，注册路由与 Element Plus
│  ├─ App.vue                 # 根组件
│  ├─ router/
│  │  └─ index.js            # Vue Router 4（Hash 模式）
│  └─ components/
│     └─ home.vue            # 破解交互页面
└─ static/                    # 静态脚本（Vite public 目录）
   ├─ scriptidp.js
   ├─ stage4.js
   └─ baiyajin-honda/
      └─ stylesheet.xsl      # 历史样式表（原项目保留）
```

---

## 🔧 本地调试端点说明（Vite 中间件）
配置位置：`vite.config.mjs`

- 🌐 `GET /stage1_xml.py`
  - 用于模拟目标设备返回的 XSL 样式表。
  - 我们在本地以内存切换的方式（A/B 交替）返回不同 `<data>` 值，帮助脚本通过"页面已被修改"的校验阶段。

- 📝 `POST /log/error`
  - 直接返回 204（no content），吞掉调试时的报错上报，避免控制台 404 噪音。

⚠️ 注意：以上端点仅用于本地开发调试，真实设备环境中由车机返回相应数据与行为。

---

## 🔍 破解流程的前端配合（简述）
点击"开始破解"后，脚本会：
- 🧬 构造 XML/XSLT 文档，使用 `XSLTProcessor` 与 `generate-id()` 探针检查"页面可观测变化"
- 🖼️ 在页面底部批量创建 `iframe src=blob:` 的沙箱文档，进行并行加载、内存/DOM 喷射与二分映射
- 📊 根据阶段日志（Stage 1/2/…）推进，直到载入更高权限脚本或触达目标接口

常见日志含义：
- 🔍 `ready to process generate-id stylesheet`：开始用 XSLT 探针观察页面变化
- ❌ `Modified page not found :(`：未观察到预期变化（本地端点已做 A/B 交替辅助）

---

## ❓ 常见问题（FAQ）
- ❓ **问：控制台出现 `POST /log/error 404`？**
  - ✅ 答：已在 `vite.config.mjs` 中吞掉该请求为 204。若仍出现，检查是否未重启 dev 服务。

- ❓ **问：`Cannot process XML with generate-id stylesheet`？**
  - ✅ 答：本地端点会返回最小可用的 XSL，重启 dev 服务后再试；若仍失败，请贴 vConsole 全部日志。

- ❓ **问：为什么页面会生成大量 `blob:` iframe？**
  - ✅ 答：用于并行/隔离地加载特制文档，做内存与文档结构喷射，帮助稳定命中"可观测变化"。

- ❓ **问：项目能在 Android 4.0 浏览器上运行吗？**
  - ✅ 答：可以！已配置 `@vitejs/plugin-legacy` 插件，自动为旧浏览器生成兼容版本。现代浏览器使用 ES modules，旧浏览器自动降级到包含 polyfills 的 legacy 版本。

- ❓ **问：构建后的文件很大，正常吗？**
  - ✅ 答：正常。legacy 版本包含大量 polyfills 以支持旧浏览器，现代浏览器会使用更小的 ES modules 版本。可通过代码分割进一步优化。

---

## 🛠️ 技术栈与版本
- 🟢 Vue `^3.5.x`
- 🛣️ Vue Router `^4.4.x`（Hash 模式，适配车机环境）
- 🎨 Element Plus `^2.11.x`
- ⚡ Vite `^7.x`
- 📏 ESLint `9.36.0`（Flat Config）
- 📱 `@vitejs/plugin-legacy` `^5.0.0`（Android 4.0+ 兼容）

---

## 💡 开发提示
- 📁 静态脚本放在 `static/` 下，访问路径以 `/` 开头，例如：`/stage4.js`、`/scriptidp.js`
- 🎨 已移除 Vant，UI 统一使用 Element Plus
- 📊 如需上报/采集更详细日志，可在 `vite.config.mjs` 自定义中间件或在 `home.vue` 中扩展 `window.ERR`
- 📱 **Android 4.0 兼容**：构建时会自动生成 legacy 版本，旧浏览器自动降级使用

---

## ⚠️ 免责声明
本项目仅用于技术研究与学习，请勿用于任何非法用途。对因使用本项目造成的任何后果，作者与维护者不承担责任。

