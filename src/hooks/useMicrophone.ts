import { useState, useCallback, useEffect, useRef } from 'react';

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

interface UseMicrophoneOptions {
  onSentenceComplete?: (chinese: string, english: string) => void;
}

interface UseMicrophoneReturn {
  isMicOn: boolean;
  toggleMic: () => void;
  startMic: () => void;
  stopMic: () => void;
  recognizingText: string;
}

const useMicrophone = (
  options: UseMicrophoneOptions = {}
): UseMicrophoneReturn => {
  const { onSentenceComplete } = options;

  const [isMicOn, setIsMicOn] = useState(false);
  const [recognizingText, setRecognizingText] = useState('');

  const recognitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sentenceIndexRef = useRef(0);

  const startMic = useCallback(() => {
    setIsMicOn(true);
  }, []);

  const stopMic = useCallback(() => {
    setIsMicOn(false);
  }, []);

  const toggleMic = useCallback(() => {
    setIsMicOn((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isMicOn) {
      const simulateRecognition = () => {
        const currentSentence = MOCK_RECOGNITION_SENTENCES[sentenceIndexRef.current];
        const chineseText = currentSentence.chinese;
        let charIndex = 0;

        setRecognizingText('');

        const charTimer = setInterval(() => {
          if (charIndex < chineseText.length) {
            setRecognizingText(chineseText.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(charTimer);
            setTimeout(() => {
              onSentenceComplete?.(currentSentence.chinese, currentSentence.english);
              setRecognizingText('');
              sentenceIndexRef.current = (sentenceIndexRef.current + 1) % MOCK_RECOGNITION_SENTENCES.length;
            }, 500);
          }
        }, 100);

        return charTimer;
      };

      const startRecognition = () => {
        const charTimer = simulateRecognition();
        recognitionTimerRef.current = setTimeout(() => {
          clearInterval(charTimer);
          if (isMicOn) {
            startRecognition();
          }
        }, 4000);
      };

      startRecognition();

      return () => {
        if (recognitionTimerRef.current) {
          clearTimeout(recognitionTimerRef.current);
        }
        setRecognizingText('');
      };
    } else {
      if (recognitionTimerRef.current) {
        clearTimeout(recognitionTimerRef.current);
      }
      setRecognizingText('');
    }
  }, [isMicOn, onSentenceComplete]);

  return {
    isMicOn,
    toggleMic,
    startMic,
    stopMic,
    recognizingText,
  };
};

export default useMicrophone;
