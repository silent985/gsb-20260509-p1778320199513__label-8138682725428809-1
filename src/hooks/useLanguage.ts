import { useState, useCallback } from 'react';

export const DEFAULT_SOURCE_LANGUAGE = 'zh-CN';
export const DEFAULT_TARGET_LANGUAGE = 'en-US';

interface UseLanguageReturn {
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  swapLanguages: () => void;
}

const useLanguage = (): UseLanguageReturn => {
  const [sourceLanguage, setSourceLanguage] = useState(DEFAULT_SOURCE_LANGUAGE);
  const [targetLanguage, setTargetLanguage] = useState(DEFAULT_TARGET_LANGUAGE);

  const swapLanguages = useCallback(() => {
    setSourceLanguage((prevSource) => {
      const newSource = targetLanguage;
      setTargetLanguage(prevSource);
      return newSource;
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
