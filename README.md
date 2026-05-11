# 翻译助手 (Translation Assistant)

一个基于 React + TypeScript + Tailwind CSS 的实时翻译应用，采用三栏式响应式布局设计。

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8.svg)

## 功能特性

### 🎛️ 左侧控制面板
- **毛玻璃效果**：采用 `backdrop-blur-xl` 实现深色背景毛玻璃效果
- **语言选择**：支持10种语言（中文简/繁体、英语、日语、韩语、西班牙语、法语、德语、俄语、葡萄牙语）
- **语言交换**：一键交换源语言和目标语言，带旋转动画
- **麦克风控制**：开关按钮带脉冲动画，录音时显示音频波形指示器
- **音频设置**：可折叠的设置面板，包含音量、灵敏度、降噪三个滑块

### 📺 中央字幕显示区
- **双语对照**：中英文字幕同步显示
- **打字机效果**：当前识别内容带打字机动画和光标闪烁
- **高亮显示**：当前活跃字幕带渐变边框和缩放效果
- **自动滚动**：新字幕自动滚动到可视区域
- **导出功能**：支持导出字幕记录为文本文件

### ✏️ 右侧翻译输入区
- **文本输入**：支持多行文本输入，最大500字符
- **字符计数**：实时显示字符数，接近上限时变红警告
- **进度条**：底部进度条可视化字符使用量
- **快捷短语**：预设常用短语一键输入
- **键盘快捷键**：支持 `Ctrl+Enter` 快速发送
- **复制功能**：一键复制翻译结果

## 技术架构

### 布局实现
- **CSS Grid**：主布局采用 `grid-cols-[auto_1fr_auto]` 实现三栏布局
- **Flexbox**：组件内部布局使用 Flexbox
- **响应式**：支持响应式断点调整

### 技术栈
- **构建工具**：Vite 6.x
- **前端框架**：React 18.x
- **类型系统**：TypeScript 5.x（严格模式）
- **样式方案**：Tailwind CSS 3.x
- **状态管理**：React Hooks（自定义 Hook）

## 项目结构

```
translation-app/
├── public/
│   └── vite.svg                      # 网站图标
├── src/
│   ├── components/                   # 组件目录
│   │   ├── common/                   # 通用组件
│   │   │   ├── LanguageSelector.tsx  # 语言选择器
│   │   │   ├── MicrophoneButton.tsx  # 麦克风按钮
│   │   │   ├── Slider.tsx            # 滑块组件
│   │   │   ├── TypewriterText.tsx    # 打字机效果组件
│   │   │   └── index.ts              # 导出文件
│   │   ├── ControlPanel/             # 左侧控制面板
│   │   │   └── index.tsx
│   │   ├── SubtitleDisplay/          # 中央字幕显示
│   │   │   └── index.tsx
│   │   ├── InputTranslation/         # 右侧翻译输入
│   │   │   └── index.tsx
│   │   └── index.ts                  # 组件统一导出
│   ├── constants/                    # 常量定义
│   │   └── index.ts                  # 语言列表、默认设置等
│   ├── hooks/                        # 自定义 Hooks
│   │   ├── useTranslation.ts         # 翻译状态管理 Hook
│   │   ├── useLocalStorage.ts        # 本地存储 Hook
│   │   └── index.ts
│   ├── types/                        # TypeScript 类型定义
│   │   └── index.ts                  # 接口和类型
│   ├── utils/                        # 工具函数
│   │   └── index.ts                  # 辅助函数
│   ├── App.tsx                       # 主应用组件
│   ├── main.tsx                      # 入口文件
│   ├── index.css                     # 全局样式
│   └── vite-env.d.ts                 # Vite 类型声明
├── index.html                        # HTML 模板
├── package.json                      # 项目配置
├── tailwind.config.js                # Tailwind 配置
├── postcss.config.js                 # PostCSS 配置
├── tsconfig.json                     # TypeScript 配置
├── tsconfig.node.json                # Node TypeScript 配置
└── vite.config.ts                    # Vite 配置
```

## 快速开始

### 环境要求
- Node.js >= 18.x
- npm >= 9.x

### 安装依赖
```bash
cd translation-app
npm install
```

### 开发模式
```bash
npm run dev
```
应用将在 `http://localhost:3000` 启动

### 生产构建
```bash
npm run build
```

### 预览构建
```bash
npm run preview
```

## 类型定义

### 主要接口

```typescript
// 字幕条目
interface SubtitleEntry {
  id: string;
  chinese: string;
  english: string;
  timestamp: Date;
  isActive: boolean;
}

// 音频设置
interface AudioSettings {
  volume: number;
  sensitivity: number;
  noiseReduction: number;
}

// 语言选项
interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}
```

## 自定义配置

### 添加新语言
在 `src/constants/index.ts` 中的 `LANGUAGES` 数组添加：
```typescript
{ code: 'it-IT', name: 'Italian', nativeName: 'Italiano' }
```

### 修改默认音频设置
在 `src/constants/index.ts` 中修改 `DEFAULT_AUDIO_SETTINGS`：
```typescript
export const DEFAULT_AUDIO_SETTINGS = {
  volume: 80,
  sensitivity: 50,
  noiseReduction: 30,
};
```

### 自定义主题色
在 `tailwind.config.js` 中扩展颜色配置。

## 扩展功能建议

- [ ] 集成真实语音识别 API（如 Web Speech API）
- [ ] 集成翻译 API（如 Google Translate、DeepL）
- [ ] 添加语音合成功能（TTS）
- [ ] 实现字幕历史记录持久化
- [ ] 添加多主题支持
- [ ] 实现响应式移动端布局

## 许可证

MIT License

## 作者

Translation Assistant Team
