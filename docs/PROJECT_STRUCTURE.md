# dtool 项目结构与功能说明

## 项目概述

**dtool** 是一个基于 **Vue 3 + Vite + TypeScript** 的在线工具箱应用，提供了丰富的开发辅助工具，涵盖加密、转换、文本处理、媒体处理等多个领域。

---

## 技术栈

| 类别         | 技术                                                |
| ------------ | --------------------------------------------------- |
| 框架         | Vue 3.5 + TypeScript 5.9                            |
| 构建         | Vite 6                                              |
| UI库         | Naive UI                                            |
| 状态管理     | Pinia                                               |
| 路由         | Vue Router 4                                        |
| 样式         | TailwindCSS + SCSS                                  |
| 国际化       | Vue I18n (中英双语)                                 |
| 图标         | @vicons/carbon, fluent, tabler, material, ionicons5 |
| 富文本编辑器 | md-editor-v3, @vavt/v3-extension                    |
| 代码高亮     | highlight.js                                        |
| 视频处理     | @ffmpeg/ffmpeg (WASM)                               |
| 部署         | Vercel                                              |

---

## 目录结构

```
dtool/
├── src/
│   ├── assets/          # 静态资源（Logo等）
│   ├── components/      # 通用组件
│   │   ├── BaseHead.vue       # 基础头部组件
│   │   ├── CopyText.vue       # 文本复制组件
│   │   ├── FavoriteButton.vue # 收藏按钮
│   │   ├── InputCopy.vue      # 输入复制组件
│   │   ├── MenuIconItem.vue   # 菜单图标项
│   │   ├── SearchResult.vue   # 搜索结果
│   │   └── ToolCards.vue      # 工具卡片列表
│   ├── composable/      # 组合式函数
│   │   ├── computedRefreshable.ts
│   │   ├── copy.ts             # 复制功能
│   │   ├── downloadBase64.ts   # Base64下载
│   │   └── downloadFile.ts     # 文件下载
│   ├── layouts/         # 布局组件
│   │   ├── header.vue
│   │   ├── sidler.vue          # 侧边栏
│   │   ├── toollayout.vue      # 主布局
│   │   └── index.ts            # 布局导出
│   ├── locales/         # 国际化资源
│   │   ├── zh.json             # 中文
│   │   └── en.json             # 英文
│   ├── pages/           # 页面（各工具模块）
│   │   ├── home.vue            # 首页
│   │   ├── tool.ts             # 工具定义函数
│   │   ├── tool.types.ts       # 工具类型定义
│   │   ├── tool.store.ts       # 工具状态管理
│   │   └── index.ts            # 工具索引与分类
│   ├── plugins/         # 插件
│   │   └── i18n.plugins.ts
│   ├── stores/          # 全局状态
│   │   └── style.store.ts
│   ├── types/           # 类型声明
│   ├── utils/           # 工具函数
│   │   ├── base64.ts
│   │   ├── boolean.ts
│   │   ├── convert.ts
│   │   ├── defaults.ts
│   │   └── random.ts
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   ├── router.ts        # 路由配置
│   └── style.css        # 全局样式
├── public/              # 公共资源
│   ├── js/               # FFmpeg JS文件
│   └── wasm/             # FFmpeg WASM文件
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

---

## 功能模块（工具分类）

### 1. Crypto（加密类）

- UUID 生成器 - 生成通用唯一标识符
- ULID 生成器 - 生成有序唯一标识符
- Token 生成器 - 生成随机字符串
- Hash 文本 - MD5/SHA1/SHA256 等哈希
- Bcrypt 加密 - 密码哈希与验证
- 密码强度分析器 - 评估密码强度
- 加密/解密 - AES/TripleDES/Rabbit/RC4
- BIP39 助记词生成器 - 生成 BIP39 助记词
- HMAC 生成器 - 生成 HMAC 签名
- RSA 密钥对生成器 - 生成 RSA 公钥/私钥
- 雪花ID生成器 - 分布式唯一ID
- PDF 签名检查器 - 验证 PDF 签名

### 2. Converter（转换器）

- 图片转换器 - 格式转换（PNG/JPG/WebP/SVG）
- 图片尺寸调整 - 缩放图片
- 表格转换 - Markdown/CSV/JSON 互转
- 大小写转换 - 字符串格式转换
- 简繁转换 - 中文简体↔繁体
- GB2312 编码转换 - 汉字编码转换
- 罗马数字转换 - 数字↔罗马数字
- 颜色选择器 - HEX/RGB/HSL 互转
- 日期时间转换 - 日期格式转换
- 字符串分割器 - 字符串拆分
- 整数转换器 - 进制转换
- Base64 转换 - 字符串/文件 Base64
- 文本转 Unicode - Unicode 编码转换
- 文本转二进制 - 二进制转换
- 格式互转 - JSON/YAML/TOML/XML/Markdown 互转（共10+种组合）
- MP4 转 AVI - 视频格式转换

### 3. Web（Web 工具）

- Keycode 信息 - 键盘按键码查询
- MIME 类型 - MIME↔扩展名转换
- 设备信息 - 浏览器/设备信息
- URL 解析器 - URL 各部分解析
- HTML 编辑器 - 所见即所得编辑器
- HTML 实体 - 转义/反转义
- JSON 差异比对 - 比较 JSON 对象
- Mock 数据 - 生成模拟数据

### 4. PhotoAndVideo（图片视频）

- 二维码生成器 - 生成 QR Code
- SVG 占位符生成器 - 生成 SVG 占位图
- 摄像头录制器 - 录制摄像头视频
- 图片占位符 - 前端调试占位图

### 5. Text（文本工具）

- 文本统计 - 字符数/字数统计
- 文本差异 - 文本 Diff 比较
- 表情符号选择器 - Emoji 复制与查询

### 6. NetWork（网络工具）

- IPv4 子网计算器 - CIDR 块解析

### 7. ThumbUp（实用工具）

- 贷款计算器 - 等额本息/等额本金计算
- 人民币转换器 - 大小写金额转换

---

## 架构设计特点

1. **模块化设计**：每个工具都是独立的 Vue 组件 + 配置文件，结构统一
2. **工具定义模式**：通过 `defineTool()` 函数统一声明工具元信息
3. **状态管理**：使用 Pinia 管理工具列表、收藏、搜索等状态
4. **动态路由**：工具自动生成路由配置
5. **国际化**：支持中英文切换
6. **代码分割**：Monaco Editor 等重型库单独打包
7. **PWA 友好**：支持服务端 Worker（FFmpeg WASM）
8. **收藏功能**：基于 localStorage 的本地收藏

---

## 开发命令

| 命令              | 说明            |
| ----------------- | --------------- |
| `npm run dev`     | 启动开发服务器  |
| `npm run build`   | 类型检查 + 构建 |
| `npm run preview` | 预览生产构建    |

---

## 新增工具指南

每个工具目录结构统一为：

```
tools-name/
├── index.ts          # 工具配置（导出 defineTool 定义）
├── tool-name.vue     # 工具主组件
├── utils.ts          # 工具相关工具函数（可选）
└── tool-name.types.ts # 类型定义（可选）
```

### 新增工具步骤

1. 在 `src/pages/` 下创建新目录
2. 创建 `index.ts` 文件，使用 `defineTool()` 定义工具
3. 创建工具组件 `.vue` 文件
4. 在 `src/pages/index.ts` 中注册工具并添加到对应分类
5. 在 `src/locales/zh.json` 和 `en.json` 中添加国际化文案

---

## 关键文件说明

| 文件                      | 说明                                      |
| ------------------------- | ----------------------------------------- |
| `src/main.ts`             | 应用入口，初始化 Vue、Pinia、Router、I18n |
| `src/router.ts`           | 路由配置，工具路由自动生成                |
| `src/App.vue`             | 根组件，配置主题、国际化、消息组件        |
| `src/pages/index.ts`      | 工具注册中心，定义所有工具及分类          |
| `src/pages/tool.store.ts` | Pinia Store，管理工具列表、收藏等         |
| `src/pages/tool.types.ts` | 工具接口类型定义                          |
| `src/pages/tool.ts`       | `defineTool()` 工厂函数                   |
| `src/locales/zh.json`     | 中文国际化资源                            |
| `src/locales/en.json`     | 英文国际化资源                            |
