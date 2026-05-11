// 字幕条目类型
export interface SubtitleEntry {
  id: string;
  chinese: string;
  english: string;
  timestamp: Date;
  isActive: boolean;
}

// 音频设置类型
export interface AudioSettings {
  volume: number;
  sensitivity: number;
  noiseReduction: number;
}

// 语言选项类型
export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

// 翻译历史记录类型
export interface TranslationHistory {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: Date;
}

// 控制面板属性类型
export interface ControlPanelProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceChange: (lang: string) => void;
  onTargetChange: (lang: string) => void;
  isMicOn: boolean;
  onMicToggle: () => void;
  audioSettings: AudioSettings;
  onAudioSettingsChange: (settings: AudioSettings) => void;
  recognizingText?: string;
}

// 字幕显示属性类型
export interface SubtitleDisplayProps {
  subtitles: SubtitleEntry[];
  onExport?: () => void;
  recognizingText?: string;
  isMicOn?: boolean;
}

// 输入翻译属性类型
export interface InputTranslationProps {
  onTranslate: (text: string) => void;
  sourceLanguage: string;
  targetLanguage: string;
}

// 打字机文本属性类型
export interface TypewriterTextProps {
  text: string;
  isActive: boolean;
  speed?: number;
}

// 滑块属性类型
export interface SliderProps {
  label: string;
  labelEn: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

// 语言选择器属性类型
export interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  labelEn: string;
}

// 麦克风按钮属性类型
export interface MicrophoneButtonProps {
  isOn: boolean;
  onToggle: () => void;
  recognizingText?: string;
}

// 应用状态类型
export interface AppState {
  sourceLanguage: string;
  targetLanguage: string;
  isMicOn: boolean;
  audioSettings: AudioSettings;
  subtitles: SubtitleEntry[];
  translationHistory: TranslationHistory[];
}
