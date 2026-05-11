# 优化翻译功能状态管理

> **Workspace:** d:\code\trae\gsb\20260509\B-145-代码重构-1\TestM_4

---

## User
翻译功能的状态管理散落在多个地方，每次加新功能都要改动好几处。把语言切换、字幕、音频设置这些逻辑拆开管理，新增功能时只需改动对应模块，不影响现有功能。

## Assistant
让我先探索代码库，了解当前翻译功能的状态管理结构。

让我查看核心的翻译状态管理逻辑和相关组件：


让我继续查看组件和其他相关文件，了解完整的上下文：



现在我对代码库有了全面的了解。当前 `useTranslation.ts` 包含了所有状态管理逻辑（语言、麦克风、音频、字幕、历史记录），导致难以维护和扩展。我将按模块化方式重构，将各功能拆分为独立的 hooks。



开始创建各个独立的 hooks。首先创建 useLanguageSettings：




继续创建 useAudioSettings hook：





继续创建 useSubtitles hook：







继续创建 useMicrophone hook：








继续创建 useTranslationHistory hook：










现在重构主 useTranslation hook，将各个子模块组合起来：












现在更新 hooks/index.ts 导出所有新创建的 hooks：
















现在验证项目可以正常编译运行：


















需要先安装依赖：


让我使用 GetDiagnostics 检查类型错误：



没有类型错误，重构成功。现在完成任务：




重构完成！我将翻译功能的状态管理从原来的单一 `useTranslation` hook 拆分为 5 个独立的模块化 hooks：

## 重构内容

### 1. `useLanguageSettings.ts` (`src/hooks/useLanguageSettings.ts:18`)
- 管理源语言和目标语言
- 支持语言交换功能
- 可选本地存储持久化

### 2. `useAudioSettings.ts` (`src/hooks/useAudioSettings.ts:20`)
- 管理音量、灵敏度、降噪设置
- 支持单独更新每个配置项
- 支持一键重置到默认值

### 3. `useSubtitles.ts` (`src/hooks/useSubtitles.ts:20`)
- 管理字幕列表的增删改查
- 支持设置激活字幕
- 可配置最大字幕数量限制

### 4. `useMicrophone.ts` (`src/hooks/useMicrophone.ts:28`)
- 管理麦克风开关状态
- 语音识别模拟逻辑
- 通过 `onSentenceComplete` 回调与其他模块解耦

### 5. `useTranslationHistory.ts` (`src/hooks/useTranslationHistory.ts:21`)
- 管理翻译历史记录
- 支持历史记录的增删

### 6. 主 Hook (`useTranslation.ts:33`)
- 只负责组合各个子模块
- 通过回调处理模块间交互
- API 完全向后兼容

## 优势

1. **单一职责**：每个模块只负责一个功能领域
2. **易于扩展**：新增功能只需修改对应模块
3. **独立测试**：每个模块可以单独测试
4. **复用性强**：子模块可以在其他场景独立使用
5. **向后兼容**：现有组件代码无需任何修改

项目已通过 TypeScript 类型检查，无任何错误。

