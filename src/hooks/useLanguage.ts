import { useState, useCallback } from 'react';

interface UseLanguageReturn {
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  swapLanguages: () => void;
}

const useLanguage = (): UseLanguageReturn => {
  const [sourceLanguage, setSourceLanguage] = useState('zh-CN');
  const [targetLanguage, setTargetLanguage] = useState('en-US');

  const swapLanguages = useCallback(() => {
    setSourceLanguage((prev) => {
      const currentTarget = targetLanguage;
      setTargetLanguage(prev);
      return currentTarget;
    });
  }, [targetLanguage]);

  return {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
  };
};

export default useLanguage;
