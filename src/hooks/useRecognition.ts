import { useState, useEffect, useRef, useCallback } from 'react';

const MOCK_RECOGNITION_SENTENCES = [
  '今天天气真不错',
  '我正在进行语音测试',
  '这个翻译系统工作得很好',
  '请稍等一下',
  '你能听到我说话吗',
  '让我们开始会议吧',
  '非常感谢您的帮助',
  '这是一个演示示例',
  '语音识别正在处理中',
  '翻译结果已经生成',
];

interface UseRecognitionOptions {
  isMicOn: boolean;
}

interface UseRecognitionReturn {
  recognizingText: string;
  recognizedText: string;
  startRecognition: () => void;
}

const useRecognition = ({ isMicOn }: UseRecognitionOptions): UseRecognitionReturn => {
  const [recognizingText, setRecognizingText] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const sentenceIndexRef = useRef(0);
  const charTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (charTimerRef.current) {
      clearInterval(charTimerRef.current);
      charTimerRef.current = null;
    }
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  }, []);

  const startRecognition = useCallback(() => {
    if (!isMicOn) return;

    const currentSentence = MOCK_RECOGNITION_SENTENCES[sentenceIndexRef.current];
    let charIndex = 0;

    setRecognizingText('');
    setRecognizedText('');

    charTimerRef.current = setInterval(() => {
      if (charIndex < currentSentence.length) {
        setRecognizingText(currentSentence.slice(0, charIndex + 1));
        charIndex++;
      } else {
        if (charTimerRef.current) {
          clearInterval(charTimerRef.current);
          charTimerRef.current = null;
        }
        setRecognizedText(currentSentence);
        setRecognizingText('');

        sentenceIndexRef.current = (sentenceIndexRef.current + 1) % MOCK_RECOGNITION_SENTENCES.length;

        cycleTimerRef.current = setTimeout(() => {
          startRecognition();
        }, 1200);
      }
    }, 100);
  }, [isMicOn]);

  useEffect(() => {
    if (isMicOn) {
      startRecognition();
    } else {
      clearTimers();
      setRecognizingText('');
      setRecognizedText('');
      sentenceIndexRef.current = 0;
    }

    return () => {
      clearTimers();
    };
  }, [isMicOn, startRecognition, clearTimers]);

  return { recognizingText, recognizedText, startRecognition };
};

export default useRecognition;
