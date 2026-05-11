import { useState, useCallback } from 'react';
import type { TranslationHistory } from '../types';
import { generateId } from '../utils';

interface UseTranslationHistoryOptions {
  maxHistory?: number;
}

interface UseTranslationHistoryReturn {
  translationHistory: TranslationHistory[];
  addToHistory: (
    sourceText: string,
    translatedText: string,
    sourceLanguage: string,
    targetLanguage: string
  ) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const useTranslationHistory = (
  options: UseTranslationHistoryOptions = {}
): UseTranslationHistoryReturn => {
  const { maxHistory = 50 } = options;

  const [translationHistory, setTranslationHistory] = useState<TranslationHistory[]>([]);

  const addToHistory = useCallback(
    (
      sourceText: string,
      translatedText: string,
      sourceLanguage: string,
      targetLanguage: string
    ) => {
      const historyEntry: TranslationHistory = {
        id: generateId(),
        sourceText,
        translatedText,
        sourceLanguage,
        targetLanguage,
        timestamp: new Date(),
      };

      setTranslationHistory((prev) => [historyEntry, ...prev].slice(0, maxHistory));
    },
    [maxHistory]
  );

  const removeFromHistory = useCallback(
    (id: string) => {
      setTranslationHistory((prev) => prev.filter((item) => item.id !== id));
    },
    []
  );

  const clearHistory = useCallback(() => {
    setTranslationHistory([]);
  }, []);

  return {
    translationHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};

export default useTranslationHistory;
