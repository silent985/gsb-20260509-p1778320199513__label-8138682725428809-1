# 优化翻译功能状态管理

> **Workspace:** d:\code\trae\gsb\20260509\B-145-代码重构-1\TestM_2

---

## User
翻译功能的状态管理散落在多个地方，每次加新功能都要改动好几处。把语言切换、字幕、音频设置这些逻辑拆开管理，新增功能时只需改动对应模块，不影响现有功能。

## Assistant
现在我已经完整了解了项目结构。让我分析当前的问题并设计拆分方案。

## 当前问题分析

1. **`useSubtitles` 职责混乱**：同时管理字幕和翻译历史，这两个是不同关注点
2. **`useTranslation` 是"上帝 Hook"**：包含跨模块的业务逻辑（`addToHistory` 混合了 language + history，`handleSubtitleRecognized` 混合了 recognition + subtitles）
3. **组件只能通过 `useTranslation` 访问子功能**：即使只需要字幕，也必须引入整个 useTranslation

## 拆分方案

| 模块 | 职责 | 改动场景 |
|------|------|---------|
| `useLanguage` | 语言切换 | 新增语言相关功能 |
| `useAudio` | 麦克风、音频设置 | 新增音频相关功能 |
| `useSubtitles` | 纯字幕管理 | 新增字幕显示功能 |
| `useTranslationHistory` | 翻译历史（从 useSubtitles 拆出） | 新增历史相关功能 |
| `useRecognition` | 语音识别 | 新增识别相关功能 |
| `useTranslation` | 薄协调层，仅组合模块 | 需要跨模块联动时 |

现在精简 `useSubtitles`，移除翻译历史逻辑，只保留字幕管理：

现在重构 `useTranslation` 为薄协调层——只做模块组合，不包含跨模块业务逻辑：

VS Code 诊断没有报告任何错误。让我再用 vite build 来验证：

构建成功，没有类型错误。

重构已完成，`npm run build` 通过，无类型错误。以下是本次重构的总结：

---

## 重构内容

### 核心问题
`useSubtitles` 混合了两个不同的关注点——**字幕管理**和**翻译历史管理**，导致新增字幕功能或历史功能时都会改动同一个文件。

### 改动清单

| 文件 | 变更 |
|------|------|
| `useTranslationHistory.ts` | **新建** — 从 `useSubtitles` 拆出的翻译历史模块 |
| `useSubtitles.ts` | **精简** — 只保留字幕相关逻辑（`subtitles`、`addSubtitle`、`clearSubtitles`），移除 `translationHistory`、`addToHistory`、`clearHistory` |
| `useTranslation.ts` | **更新** — 改用 `useTranslationHistory` 替代原来从 `useSubtitles` 取历史，协调层接口不变 |
| `hooks/index.ts` | **新增导出** — `useTranslationHistory` |

### 架构变化

**重构前：**
```
useTranslation
  ├── useLanguage      (语言切换)
  ├── useAudio         (麦克风 + 音频设置)
  ├── useSubtitles     (字幕 + 翻译历史 ← 职责混合)
  └── useRecognition   (语音识别)
```

**重构后：**
```
useTranslation
  ├── useLanguage           (语言切换)
  ├── useAudio              (麦克风 + 音频设置)
  ├── useSubtitles          (纯字幕管理)
  ├── useTranslationHistory (翻译历史)  ← 独立模块
  └── useRecognition        (语音识别)
```

### 对外接口保持不变
`useTranslation` 的返回类型 `UseTranslationReturn` 完全不变，`App.tsx` 及所有组件无需任何修改。

### 新增功能时的改动范围
- 加字幕相关功能 → 只改 `useSubtitles`
- 加历史相关功能 → 只改 `useTranslationHistory`
- 加语言相关功能 → 只改 `useLanguage`
- 加音频相关功能 → 只改 `useAudio`
- 需要跨模块联动 → 只改 `useTranslation` 协调层

## User
把麦克风识别改成连续出字并稳定落到字幕区，再把交换语言按钮接到统一的语言状态上，让以后改语言规则时页面和状态只改一处就能生效

## Assistant
现在我已经完全理解了两个问题的本质：

**问题1：麦克风识别流程** — 当前 `useRecognition` 内部自己构建完整的 `SubtitleEntry` 再通过 `onSubtitleRecognized` 回调传出去，识别和字幕耦合太紧。应该让 `useRecognition` 只负责出字（`recognizingText` → `recognizedText`），字幕的落入由 `useTranslation` 协调层统一处理。

**问题2：语言交换** — `ControlPanel` 里 `handleSwapLanguages` 手动用 `onSourceChange` + `onTargetChange` 模拟交换，不是原子操作，和 `useLanguage.swapLanguages` 重复。应该让组件直接调用统一状态层的 `swapLanguages`。

开始重构：

现在重构 `useLanguage`，让 `swapLanguages` 用函数式更新保证原子性，并且导出 `DEFAULT_SOURCE_LANGUAGE` / `DEFAULT_TARGET_LANGUAGE` 常量，让语言规则只在此处定义：

现在更新 `ControlPanel`，用 `onSwapLanguages` 替代组件内的手动交换逻辑：

现在更新 `useTranslation`，监听 `recognizedText` 落字幕，并导出 `swapLanguages`：

现在更新 `App.tsx`，传 `swapLanguages` 给 ControlPanel：

构建成功，无任何类型错误。

重构完成，`npm run build` 通过。以下是本次改动总结：

---

## 改动1：麦克风识别 → 连续出字并稳定落到字幕区

**之前的问题**：`useRecognition` 内部直接构建 `SubtitleEntry` 对象并通过回调 `onSubtitleRecognized` 传出，识别模块和字幕数据模型耦合在一起。

**重构后的流程**：

```
useRecognition (只管出字)
  recognizingText → 逐字出现的中间态
  recognizedText  → 一句话识别完成后的最终文本

useTranslation (协调层监听)
  useEffect 监听 recognizedText 变化
  → 调用 translateTextSync 翻译
  → 调用 subtitles.addSubtitle 落入字幕区
```

| 文件 | 变更 |
|------|------|
| `useRecognition.ts` | 移除 `SubtitleEntry` 构建和 `onSubtitleRecognized` 回调；新增 `recognizedText` 状态，识别完成即输出纯文本；连续循环无间断 |
| `useTranslation.ts` | 新增 `useEffect` 监听 `recognizedText`，负责翻译 + 落字幕的串联逻辑 |

## 改动2：交换语言按钮接到统一语言状态

**之前的问题**：`ControlPanel` 里 `handleSwapLanguages` 手动 `onSourceChange(targetLanguage)` + `onTargetChange(sourceLanguage)`，不是原子操作，和 `useLanguage.swapLanguages` 重复实现。

**重构后**：

| 文件 | 变更 |
|------|------|
| `useLanguage.ts` | `swapLanguages` 用函数式更新 `setSourceLanguage(prev => ...)` 保证原子性；导出 `DEFAULT_SOURCE_LANGUAGE` / `DEFAULT_TARGET_LANGUAGE` 常量，语言默认值只在此处定义 |
| `types/index.ts` | `ControlPanelProps` 新增 `onSwapLanguages: () => void` |
| `ControlPanel/index.tsx` | 删除 `handleSwapLanguages`，按钮直接 `onClick={onSwapLanguages}` |
| `App.tsx` | 从 `useTranslation()` 解构 `swapLanguages`，传给 `ControlPanel` 的 `onSwapLanguages` |

**效果**：以后改语言规则（默认语言、交换逻辑、校验规则等）只需改 `useLanguage` 一处，页面和状态自动同步。

