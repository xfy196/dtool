# DTOOL

面向开发者的在线工具箱：加密、格式转换、Web 调试、文本处理、图片与视频等能力集合于一处，在浏览器中即可完成大部分日常开发辅助操作。

**在线体验：** [https://tools.xxtime.top](https://tools.xxtime.top)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## 目录

- [DTOOL](#dtool)
  - [目录](#目录)
  - [项目简介](#项目简介)
  - [产品特性](#产品特性)
  - [功能清单](#功能清单)
    - [加密（Crypto）— 12 项](#加密crypto-12-项)
    - [转换器（Converter）— 24 项](#转换器converter-24-项)
    - [Web — 8 项](#web--8-项)
    - [图片与视频（Photo \& Video）— 4 项](#图片与视频photo--video-4-项)
    - [文本（Text）— 3 项](#文本text-3-项)
    - [网络（Network）— 1 项](#网络network-1-项)
  - [技术栈](#技术栈)
  - [快速开始](#快速开始)
    - [环境要求](#环境要求)
    - [安装与本地开发](#安装与本地开发)
    - [常用脚本](#常用脚本)
  - [构建与部署](#构建与部署)
  - [环境变量](#环境变量)
  - [项目结构](#项目结构)
  - [参与贡献](#参与贡献)
  - [许可证](#许可证)

---

## 项目简介

DTOOL 是一个基于 **Vue 3 + Vite** 的单页应用，将数十种常用开发工具按分类收纳在侧边栏中，支持中英文界面、明暗主题、全局搜索、工具收藏与「最新工具」展示。绝大多数计算在**浏览器本地**完成，适合日常调试、数据转换与安全相关操作，无需安装桌面软件。

当前版本：**v1.1.2**（见 `package.json`）。

---

## 产品特性

| 特性           | 说明                                            |
| -------------- | ----------------------------------------------- |
| **分类导航**   | 加密、转换器、Web、图片与视频、文本、网络六大类 |
| **全局搜索**   | 按名称与关键词快速定位工具                      |
| **收藏**       | 常用工具可加入「我的收藏」，数据保存在本地      |
| **国际化**     | 中文 / English（`vue-i18n`）                    |
| **明暗主题**   | 跟随系统或手动切换（Naive UI + `@vueuse/core`） |
| **响应式布局** | 适配桌面与移动端侧栏折叠                        |
| **本地优先**   | 哈希、编解码、格式转换等默认在客户端执行        |
| **开源免费**   | MIT 协议，可自托管部署                          |

---

## 功能清单

以下为仓库中**已实现并注册路由**的工具（`src/pages/index.ts`）。带 **✓** 的工具在侧边栏中展示（`show: true`）；其余说明见备注。

访问路径格式：`https://tools.xxtime.top<path>`，例如 UUID 生成器为 `/uuid-generator`。

### 加密（Crypto）— 12 项

| 工具                 | 路径                          | 说明                                       |
| -------------------- | ----------------------------- | ------------------------------------------ |
| Bcrypt 哈希与校验 ✓  | `/bcrypt`                     | 使用 bcrypt 对文本进行哈希与比对           |
| 密码强度分析器 ✓     | `/password-strength-analyser` | 评估密码强度与破解时间估算                 |
| 文本 Hash ✓          | `/hash-text`                  | MD5、SHA 系列、SHA3、RIPEMD160 等          |
| UUID 生成器 ✓        | `/uuid-generator`             | 生成通用唯一标识符                         |
| ULID 生成器 ✓        | `/ulid-generator`             | 可排序的 ULID                              |
| Token 生成器 ✓       | `/token-generator`            | 自定义字符集的随机字符串                   |
| 文本加密/解密 ✓      | `/encryption`                 | AES、TripleDES、Rabbit、RC4 等（CryptoJS） |
| BIP39 助记词生成器 ✓ | `/bip39-generator`            | 符合 BIP39 的助记词                        |
| HMAC 生成器 ✓        | `/hmac-generator`             | 基于密钥的 HMAC 计算                       |
| RSA 密钥对生成器 ✓   | `/rsa-key-pair-generator`     | 生成 RSA 公钥/私钥 PEM                     |
| 雪花 ID 生成器 ✓     | `/snowflake-id-generator`     | 分布式唯一 ID                              |
| PDF 签名检查器 ✓     | `/pdf-signature-checker`      | 校验 PDF 数字签名与完整性                  |

### 转换器（Converter）— 24 项

| 工具                       | 路径                                | 说明                                                 |
| -------------------------- | ----------------------------------- | ---------------------------------------------------- |
| 图片转换器 ✓               | `/image-converter`                  | 图片与 Base64、PNG、JPG、WebP、SVG 等互转            |
| 表格转换 ✓                 | `/table-converter`                  | Markdown 表格、CSV、JSON 互转                        |
| 大小写转换 ✓               | `/case-converter`                   | 多种命名风格（camelCase、snake_case 等）             |
| 简繁体转换 ✓               | `/simplified-and-complex-converter` | 简体 ↔ 繁体中文                                      |
| 汉字 GB2312/GBK 编码转换 ✓ | `/gb2312-converter`                 | 汉字与 GBK 十六进制字节互转                          |
| 罗马数字转换 ✓             | `/roman-numeral-converter`          | 罗马数字与阿拉伯数字互转                             |
| 颜色转换 ✓                 | `/color-converter`                  | HEX、RGB、HSL、CSS 颜色名                            |
| 日期时间转换 ✓             | `/date-time-converter`              | 多种日期时间格式互转                                 |
| 字符串分割器 ✓             | `/str-split`                        | 按规则拆分字符串                                     |
| 整数转换器 ✓               | `/integer-converter`                | 十进制、十六进制、二进制、八进制、Base64 等          |
| Base64 字符串编解码 ✓      | `/base64-string-converter`          | 文本 Base64 编码/解码                                |
| Base64 文件转换 ✓          | `/base64-file-converter`            | 文件/图片与 Base64 互转                              |
| 文本 ↔ Unicode ✓           | `/text-to-unicode`                  | 文本与 Unicode 表示互转                              |
| 文本 ↔ 二进制 ✓            | `/text-to-binary`                   | 文本与 8 位二进制串互转                              |
| JSON ↔ YAML ✓              | `/json-to-yaml`、`/yaml-to-json`    | JSON 与 YAML 互转                                    |
| JSON ↔ TOML ✓              | `/json-to-toml`、`/toml-to-json`    | JSON 与 TOML 互转                                    |
| JSON ↔ XML ✓               | `/json-to-xml`、`/xml-to-json`      | JSON 与 XML 互转                                     |
| TOML ↔ XML ✓               | `/toml-to-xml`                      | TOML 转 XML                                          |
| YAML ↔ TOML ✓              | `/yaml-to-toml`                     | YAML 与 TOML 互转                                    |
| Markdown → HTML ✓          | `/markdown-to-html`                 | Markdown 渲染为 HTML                                 |
| MP4 → AVI                  | `/mp4-to-avi`                       | 浏览器内 FFmpeg 转码（**侧边栏未展示**，路由仍可用） |

### Web — 8 项

| 工具                    | 路径                   | 说明                        |
| ----------------------- | ---------------------- | --------------------------- |
| Keycode 信息 ✓          | `/keycode-info`        | 按键的 key、code、修饰键等  |
| MIME 类型 ✓             | `/mime-types`          | MIME 与文件扩展名互查       |
| 设备信息 ✓              | `/device-information`  | 屏幕、UA、像素比等          |
| URL 解析器 ✓            | `/url-parser`          | 解析 URL 各组成部分         |
| HTML 所见即所得编辑器 ✓ | `/html-wysiwyg-editor` | 富文本编辑并导出 HTML       |
| HTML 实体转义 ✓         | `/html-entities`       | Escape / Unescape HTML 实体 |
| JSON 差异比对 ✓         | `/json-diff`           | Monaco 双栏 JSON Diff       |
| Mock 数据生成 ✓         | `/mock-data`           | 基于 Mock.js 生成测试数据   |

### 图片与视频（Photo & Video）— 4 项

| 工具             | 路径                         | 说明                                          |
| ---------------- | ---------------------------- | --------------------------------------------- |
| 二维码生成器 ✓   | `/qrcode-generator`          | 生成可自定义颜色的 QR 码并下载                |
| SVG 占位符生成 ✓ | `/svg-placeholder-generator` | 自定义文案与颜色的 SVG 占位图                 |
| 摄像头录制器 ✓   | `/camera-recorder`           | 调用摄像头录制并保存为文件                    |
| 图片占位符 ✓     | `/placeholder`               | 跳转外部占位图服务（见[环境变量](#环境变量)） |

### 文本（Text）— 3 项

| 工具           | 路径               | 说明                             |
| -------------- | ------------------ | -------------------------------- |
| 文本统计 ✓     | `/text-statistics` | 字符数、词数、字节大小等         |
| 文本差异 ✓     | `/text-diff`       | Monaco 双栏文本 Diff             |
| Emoji 选择器 ✓ | `/emoji-picker`    | 浏览、复制 Emoji 及 Unicode 信息 |

### 网络（Network）— 1 项

| 工具              | 路径                      | 说明                            |
| ----------------- | ------------------------- | ------------------------------- |
| IPv4 子网计算器 ✓ | `/ipv4-subnet-calculator` | 解析 CIDR、子网范围、广播地址等 |

---

**统计：** 共 **52** 个已注册工具路由；其中 **51** 个在侧边栏展示，`/mp4-to-avi` 为隐藏入口；`/placeholder` 为外部链接。

---

## 技术栈

| 类别        | 技术                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------- |
| 框架        | [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)                  |
| 构建        | [Vite 6](https://vitejs.dev/)                                                                |
| UI          | [Naive UI](https://www.naiveui.com/) + [Tailwind CSS](https://tailwindcss.com/)              |
| 路由 / 状态 | [Vue Router 4](https://router.vuejs.org/) + [Pinia](https://pinia.vuejs.org/)                |
| 国际化      | [vue-i18n](https://vue-i18n.intlify.dev/)                                                    |
| 编辑器      | [Monaco Editor](https://microsoft.github.io/monaco-editor/)（Diff、部分编辑场景）            |
| 工具库      | VueUse、crypto-js、bcryptjs、node-forge、iconv-lite、yaml、xml-js、mockjs、@ffmpeg/ffmpeg 等 |
| 部署        | [Vercel](https://vercel.com/)（`vercel.json` SPA 回退）                                      |

---

## 快速开始

### 环境要求

- **Node.js** ≥ 18（推荐 20+）
- **pnpm** ≥ 9（项目使用 pnpm 管理依赖）

### 安装与本地开发

```bash
git clone https://github.com/xfy196/dtool.git
cd dtool
pnpm install
pnpm dev
```

默认在 [http://localhost:5173](http://localhost:5173) 启动开发服务器。

> **说明：** 开发服务器为支持 FFmpeg（MP4 转 AVI）等功能，配置了 `Cross-Origin-Opener-Policy` 与 `Cross-Origin-Embedder-Policy` 响应头（见 `vite.config.ts`）。

### 常用脚本

| 命令                    | 作用                                |
| ----------------------- | ----------------------------------- |
| `pnpm dev`              | 启动开发服务器                      |
| `pnpm build`            | 类型检查 + 生产构建（输出 `dist/`） |
| `pnpm preview`          | 本地预览生产构建                    |
| `pnpm lint:lint-staged` | 对暂存文件执行 lint（配合 Husky）   |

---

## 构建与部署

```bash
pnpm build
```

将 `dist` 目录部署到任意静态托管即可。项目已包含 Vercel 配置：所有路径回退到 `index.html`，适配 Vue Router 的 History 模式。

```bash
# 本地预览构建结果
pnpm preview
```

---

## 环境变量

在 `.env.development` / `.env.production` 中配置：

| 变量                       | 说明                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `VITE_APP_PLACEHOLDER_URL` | 图片占位符外部服务根地址（如 `https://placehold.xxytime.top`），用于「图片占位符」菜单项与 SVG 占位符生成器的链接拼接 |

复制环境文件示例：

```bash
# 开发环境已提供 .env.development，按需修改占位图服务地址
```

---

## 项目结构

```
dtool/
├── public/                 # 静态资源（含 ffmpeg wasm 等）
├── src/
│   ├── pages/              # 各工具页面（每工具含 index.ts 注册 + *.vue）
│   ├── components/         # 公共组件（搜索、收藏、工具卡片等）
│   ├── layouts/            # 布局（侧栏、顶栏、工具页壳）
│   ├── composable/         # 组合式函数（复制、下载等）
│   ├── locales/            # 中英文文案 zh.json / en.json
│   ├── stores/             # Pinia（主题、侧栏等）
│   ├── router.ts           # 由 tools 列表自动生成路由
│   └── main.ts
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

新增工具的一般步骤：

1. 在 `src/pages/<tool-name>/` 下实现页面并添加 `index.ts`（`defineTool`）。
2. 在 `src/pages/index.ts` 中 import 并加入对应 `toolsCategory`。
3. 在 `src/locales/zh.json` 与 `en.json` 中补充 `tools.<tool-key>.title` / `description`。

---

## 参与贡献

欢迎提交 Issue 与 Pull Request。

- **问题反馈：** [GitHub Issues](https://github.com/xfy196/dtool/issues/new/choose)
- 提交前请确保通过 `pnpm build`；提交信息建议遵循仓库内的 Commitizen / commitlint 规范。

---

## 许可证

本项目采用 [MIT](./LICENSE) 许可证，可免费使用与自托管部署。

---

<p align="center">
  <a href="https://tools.xxtime.top">dtool.tech</a> ·
  <a href="https://github.com/xfy196/dtool">GitHub</a>
</p>
