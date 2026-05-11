// 生成唯一 ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 格式化时间戳
export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// 复制文本到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
};

// 中英文翻译词典
const TRANSLATION_DICT: Record<string, string> = {
  // 中文 -> 英文
  '你好': 'Hello',
  '谢谢': 'Thank you',
  '再见': 'Goodbye',
  '请问': 'Excuse me',
  '对不起': 'Sorry',
  '没关系': "It's okay",
  '早上好': 'Good morning',
  '晚上好': 'Good evening',
  '晚安': 'Good night',
  '欢迎': 'Welcome',
  '欢迎使用实时翻译系统': 'Welcome to the real-time translation system',
  '请选择您的源语言和目标语言': 'Please select your source and target language',
  '点击麦克风按钮开始语音识别': 'Click the microphone button to start voice recognition',
  '系统将自动检测并翻译您的语音': 'The system will automatically detect and translate your voice',
  '我爱你': 'I love you',
  '今天天气很好': 'The weather is nice today',
  '你叫什么名字': 'What is your name',
  '很高兴认识你': 'Nice to meet you',
  '我不明白': "I don't understand",
  '请再说一遍': 'Please say it again',
  '多少钱': 'How much',
  '在哪里': 'Where is it',
  '什么时候': 'When',
  '为什么': 'Why',
  '怎么样': 'How about it',
  '好的': 'Okay',
  '不好': 'Not good',
  '是的': 'Yes',
  '不是': 'No',
  // 英文 -> 中文
  'Hello': '你好',
  'Thank you': '谢谢',
  'Goodbye': '再见',
  'Excuse me': '请问',
  'Sorry': '对不起',
  "It's okay": '没关系',
  'Good morning': '早上好',
  'Good evening': '晚上好',
  'Good night': '晚安',
  'Welcome': '欢迎',
  'I love you': '我爱你',
  'Nice to meet you': '很高兴认识你',
  'Yes': '是的',
  'No': '不是',
  'Okay': '好的',
};

// 模拟翻译 API（实际项目中替换为真实 API）
export const translateText = async (
  text: string,
  _sourceLanguage: string,
  _targetLanguage: string
): Promise<string> => {
  // 模拟 API 延迟
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

  // 查找精确匹配
  if (TRANSLATION_DICT[text]) {
    return TRANSLATION_DICT[text];
  }

  // 查找部分匹配（对于较长的句子）
  for (const [key, value] of Object.entries(TRANSLATION_DICT)) {
    if (text.includes(key)) {
      return text.replace(key, value);
    }
  }

  // 简单的中英文检测和模拟翻译
  const isChinese = /[\u4e00-\u9fa5]/.test(text);
  if (isChinese) {
    return `[EN] ${text}`;
  } else {
    return `[中文] ${text}`;
  }
};

// 同步版本的翻译函数（用于字幕显示）
export const translateTextSync = (text: string): string => {
  if (TRANSLATION_DICT[text]) {
    return TRANSLATION_DICT[text];
  }

  for (const [key, value] of Object.entries(TRANSLATION_DICT)) {
    if (text.includes(key)) {
      return text.replace(key, value);
    }
  }

  const isChinese = /[\u4e00-\u9fa5]/.test(text);
  if (isChinese) {
    return `[EN] ${text}`;
  } else {
    return `[中文] ${text}`;
  }
};

// 防抖函数
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// 节流函数
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// 导出字幕为文本
export const exportSubtitlesToText = (
  subtitles: Array<{ chinese: string; english: string; timestamp: Date }>
): string => {
  return subtitles
    .map(
      (s) =>
        `[${formatTimestamp(s.timestamp)}]\n中文: ${s.chinese}\nEnglish: ${s.english}\n`
    )
    .join('\n');
};

// 下载文本文件
export const downloadTextFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 获取语言名称
export const getLanguageName = (
  code: string,
  languages: Array<{ code: string; nativeName: string }>
): string => {
  const lang = languages.find((l) => l.code === code);
  return lang ? lang.nativeName : code;
};
