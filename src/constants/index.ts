import type { LanguageOption, SubtitleEntry } from '../types';

// 支持的语言列表
export const LANGUAGES: LanguageOption[] = [
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'en-US', name: 'English (US)', nativeName: 'English' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português' },
];

// 模拟字幕数据
export const MOCK_SUBTITLES: SubtitleEntry[] = [
  {
    id: '1',
    chinese: '欢迎使用实时翻译系统',
    english: 'Welcome to the real-time translation system',
    timestamp: new Date(Date.now() - 60000),
    isActive: false,
  },
  {
    id: '2',
    chinese: '请选择您的源语言和目标语言',
    english: 'Please select your source and target language',
    timestamp: new Date(Date.now() - 45000),
    isActive: false,
  },
  {
    id: '3',
    chinese: '点击麦克风按钮开始语音识别',
    english: 'Click the microphone button to start voice recognition',
    timestamp: new Date(Date.now() - 30000),
    isActive: false,
  },
  {
    id: '4',
    chinese: '系统将自动检测并翻译您的语音',
    english: 'The system will automatically detect and translate your voice',
    timestamp: new Date(Date.now() - 15000),
    isActive: true,
  },
];

// 快捷短语
export const QUICK_PHRASES = [
  { chinese: '你好', english: 'Hello' },
  { chinese: '谢谢', english: 'Thank you' },
  { chinese: '请问', english: 'Excuse me' },
  { chinese: '再见', english: 'Goodbye' },
  { chinese: '对不起', english: 'Sorry' },
  { chinese: '没关系', english: "It's okay" },
];

// 默认音频设置
export const DEFAULT_AUDIO_SETTINGS = {
  volume: 80,
  sensitivity: 50,
  noiseReduction: 30,
};

// 最大字符数
export const MAX_INPUT_CHARS = 500;

// 打字机动画速度（毫秒）
export const TYPEWRITER_SPEED = 50;

// 应用信息
export const APP_INFO = {
  name: '翻译助手',
  nameEn: 'Translation Assistant',
  version: '1.0.0',
  copyright: '© 2024 Translation Assistant',
};
