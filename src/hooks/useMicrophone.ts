import { useState, useEffect, useRef } from 'react';

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

export interface RecognizedSentence {
  chinese: string;
  english: string;
}

interface UseMicrophoneReturn {
  isMicOn: boolean;
  toggleMic: () => void;
  recognizingText: string;
}

interface UseMicrophoneOptions {
  onSentenceRecognized?: (sentence: RecognizedSentence) => void;
}

const useMicrophone = (options?: UseMicrophoneOptions): UseMicrophoneReturn => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [recognizingText, setRecognizingText] = useState('');

  const charTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sentenceIndexRef = useRef(0);
  const isMicOnRef = useRef(false);
  const onSentenceRecognizedRef = useRef<((sentence: RecognizedSentence) => void) | undefined>(options?.onSentenceRecognized);

  useEffect(() => {
    onSentenceRecognizedRef.current = options?.onSentenceRecognized;
  }, [options?.onSentenceRecognized]);

  useEffect(() => {
    isMicOnRef.current = isMicOn;
  }, [isMicOn]);

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
            charTimerRef.current = null;
            setTimeout(() => {
              if (onSentenceRecognizedRef.current) {
                onSentenceRecognizedRef.current(currentSentence);
              }
              setRecognizingText('');
              sentenceIndexRef.current = (sentenceIndexRef.current + 1) % MOCK_RECOGNITION_SENTENCES.length;
            }, 500);
          }
        }, 100);

        charTimerRef.current = charTimer;
      };

      const startRecognition = () => {
        simulateRecognition();
        recognitionTimerRef.current = setTimeout(() => {
          if (charTimerRef.current) {
            clearInterval(charTimerRef.current);
          }
          if (isMicOnRef.current) {
            startRecognition();
          }
        }, 4000);
      };

      startRecognition();

      return () => {
        if (recognitionTimerRef.current) {
          clearTimeout(recognitionTimerRef.current);
          recognitionTimerRef.current = null;
        }
        if (charTimerRef.current) {
          clearInterval(charTimerRef.current);
          charTimerRef.current = null;
        }
        setRecognizingText('');
      };
    } else {
      if (recognitionTimerRef.current) {
        clearTimeout(recognitionTimerRef.current);
        recognitionTimerRef.current = null;
      }
      if (charTimerRef.current) {
        clearInterval(charTimerRef.current);
        charTimerRef.current = null;
      }
      setRecognizingText('');
    }
  }, [isMicOn]);

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  return {
    isMicOn,
    toggleMic,
    recognizingText,
  };
};

export default useMicrophone;
