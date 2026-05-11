import { useState, useCallback, useEffect, useRef } from 'react';
import type { SubtitleEntry, AudioSettings, TranslationHistory } from '../types';
import { DEFAULT_AUDIO_SETTINGS, MOCK_SUBTITLES } from '../constants';
import { generateId } from '../utils';

// 模拟语音识别的句子库
const MOCK_RECOGNITION_SENTENCES = [
  { chinese: '今天天气真不错', english: 'The weather is really nice today' },
  { chinese: '我正在进行语音测试', english: 'I am conducting a voice test' },
  { chinese: '这个翻译系统工作得很好', english: 'This translation system works very well' },
  { chinese: '请稍等一下', english: 'Please wait a moment' },
  { chinese: '你能听到我说话吗', english: 'Can you hear me speaking' },
  { chinese: '让我们开始会议吧', english: 'Let us start the meeting' },
  { chinese: '非常感谢您的帮助', english: 'Thank you very much for your help' },
  { chinese: '这是一个演示示例', english: 'This is a demonstration example' },
  { chinese: '语音识别正在处理中', english: 'Voice recognition is processing' },
  { chinese: '翻译结果已经生成', english: 'Translation result has been generated' },
];

interface UseTranslationReturn {
  // 语言设置
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  swapLanguages: () => void;

  // 麦克风状态
  isMicOn: boolean;
  toggleMic: () => void;

  // 音频设置
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;

  // 字幕
  subtitles: SubtitleEntry[];
  addSubtitle: (chinese: string, english: string) => void;
  clearSubtitles: () => void;

  // 翻译历史
  translationHistory: TranslationHistory[];
  addToHistory: (source: string, translated: string) => void;
  clearHistory: () => void;

  // 识别中的文本
  recognizingText: string;
}

const useTranslation = (): UseTranslationReturn => {
  // 语言状态
  const [sourceLanguage, setSourceLanguage] = useState('zh-CN');
  const [targetLanguage, setTargetLanguage] = useState('en-US');

  // 麦克风状态
  const [isMicOn, setIsMicOn] = useState(false);

  // 音频设置
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);

  // 字幕列表
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>(MOCK_SUBTITLES);

  // 翻译历史
  const [translationHistory, setTranslationHistory] = useState<TranslationHistory[]>([]);

  // 当前识别中的文本（模拟逐字显示）
  const [recognizingText, setRecognizingText] = useState('');

  // 模拟识别定时器
  const recognitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sentenceIndexRef = useRef(0);

  // 模拟语音识别效果
  useEffect(() => {
    if (isMicOn) {
      // 开始模拟识别
      const simulateRecognition = () => {
        const currentSentence = MOCK_RECOGNITION_SENTENCES[sentenceIndexRef.current];
        const chineseText = currentSentence.chinese;
        let charIndex = 0;

        // 清空当前识别文本
        setRecognizingText('');

        // 逐字显示效果
        const charTimer = setInterval(() => {
          if (charIndex < chineseText.length) {
            setRecognizingText(chineseText.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(charTimer);
            // 完成一句后，添加到字幕列表
            setTimeout(() => {
              const newSubtitle: SubtitleEntry = {
                id: generateId(),
                chinese: currentSentence.chinese,
                english: currentSentence.english,
                timestamp: new Date(),
                isActive: true,
              };
              setSubtitles((prev) =>
                prev.map((s) => ({ ...s, isActive: false })).concat(newSubtitle)
              );
              setRecognizingText('');
              // 移动到下一句
              sentenceIndexRef.current = (sentenceIndexRef.current + 1) % MOCK_RECOGNITION_SENTENCES.length;
            }, 500);
          }
        }, 100); // 每100ms显示一个字符

        return charTimer;
      };

      // 每3-5秒识别一句话
      const startRecognition = () => {
        const charTimer = simulateRecognition();
        recognitionTimerRef.current = setTimeout(() => {
          clearInterval(charTimer);
          if (isMicOn) {
            startRecognition();
          }
        }, 4000); // 4秒后识别下一句
      };

      startRecognition();

      return () => {
        if (recognitionTimerRef.current) {
          clearTimeout(recognitionTimerRef.current);
        }
        setRecognizingText('');
      };
    } else {
      // 停止识别
      if (recognitionTimerRef.current) {
        clearTimeout(recognitionTimerRef.current);
      }
      setRecognizingText('');
    }
  }, [isMicOn]);

  // 交换语言
  const swapLanguages = useCallback(() => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  }, [sourceLanguage, targetLanguage]);

  // 切换麦克风
  const toggleMic = useCallback(() => {
    setIsMicOn((prev) => !prev);
  }, []);

  // 添加字幕
  const addSubtitle = useCallback((chinese: string, english: string) => {
    const newSubtitle: SubtitleEntry = {
      id: generateId(),
      chinese,
      english,
      timestamp: new Date(),
      isActive: true,
    };

    setSubtitles((prev) =>
      prev.map((s) => ({ ...s, isActive: false })).concat(newSubtitle)
    );
  }, []);

  // 清空字幕
  const clearSubtitles = useCallback(() => {
    setSubtitles([]);
  }, []);

  // 添加到历史记录
  const addToHistory = useCallback(
    (source: string, translated: string) => {
      const historyEntry: TranslationHistory = {
        id: generateId(),
        sourceText: source,
        translatedText: translated,
        sourceLanguage,
        targetLanguage,
        timestamp: new Date(),
      };

      setTranslationHistory((prev) => [historyEntry, ...prev].slice(0, 50));
    },
    [sourceLanguage, targetLanguage]
  );

  // 清空历史记录
  const clearHistory = useCallback(() => {
    setTranslationHistory([]);
  }, []);

  return {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
    isMicOn,
    toggleMic,
    audioSettings,
    setAudioSettings,
    subtitles,
    addSubtitle,
    clearSubtitles,
    translationHistory,
    addToHistory,
    clearHistory,
    recognizingText,
  };
};

export default useTranslation;
