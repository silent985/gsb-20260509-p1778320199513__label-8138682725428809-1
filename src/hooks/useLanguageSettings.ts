import { useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

interface UseLanguageSettingsOptions {
  persistKey?: string;
  defaultSource?: string;
  defaultTarget?: string;
}

interface UseLanguageSettingsReturn {
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  swapLanguages: () => void;
}

const useLanguageSettings = (
  options: UseLanguageSettingsOptions = {}
): UseLanguageSettingsReturn => {
  const {
    persistKey,
    defaultSource = 'zh-CN',
    defaultTarget = 'en-US',
  } = options;

  const createState = () => {
    if (persistKey) {
      return useLocalStorage<string>(`${persistKey}_source`, defaultSource);
    }
    return useState<string>(defaultSource);
  };

  const createTargetState = () => {
    if (persistKey) {
      return useLocalStorage<string>(`${persistKey}_target`, defaultTarget);
    }
    return useState<string>(defaultTarget);
  };

  const [sourceLanguage, setSourceLanguageState] = createState();
  const [targetLanguage, setTargetLanguageState] = createTargetState();

  const setSourceLanguage = useCallback(
    (lang: string) => {
      setSourceLanguageState(lang);
    },
    [setSourceLanguageState]
  );

  const setTargetLanguage = useCallback(
    (lang: string) => {
      setTargetLanguageState(lang);
    },
    [setTargetLanguageState]
  );

  const swapLanguages = useCallback(() => {
    const temp = sourceLanguage;
    setSourceLanguageState(targetLanguage);
    setTargetLanguageState(temp);
  }, [sourceLanguage, targetLanguage, setSourceLanguageState, setTargetLanguageState]);

  return {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
  };
};

export default useLanguageSettings;
