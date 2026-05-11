import { useState, useCallback } from 'react';
import type { TranslationHistory } from '../types';
import { generateId } from '../utils';

interface UseTranslationHistoryReturn {
  translationHistory: TranslationHistory[];
  addToHistory: (source: string, translated: string, sourceLanguage: string, targetLanguage: string) => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
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

  const removeHistoryItem = useCallback((id: string) => {
    setTranslationHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    translationHistory,
    addToHistory,
    clearHistory,
    removeHistoryItem,
  };
};

export default useTranslationHistory;
