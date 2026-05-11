import { useState, useCallback } from 'react';
import type { TranslationHistory } from '../types';
import { generateId } from '../utils';

interface UseTranslationHistoryReturn {
  translationHistory: TranslationHistory[];
  addToHistory: (source: string, translated: string, sourceLanguage: string, targetLanguage: string) => void;
  clearHistory: () => void;
}

const useTranslationHistory = (): UseTranslationHistoryReturn => {
  const [translationHistory, setTranslationHistory] = useState<TranslationHistory[]>([]);

  const addToHistory = useCallback(
    (source: string, translated: string, sourceLanguage: string, targetLanguage: string) => {
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
    []
  );

  const clearHistory = useCallback(() => {
    setTranslationHistory([]);
  }, []);

  return {
    translationHistory,
    addToHistory,
    clearHistory,
  };
};

export default useTranslationHistory;
