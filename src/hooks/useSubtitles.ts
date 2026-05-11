import { useState, useCallback } from 'react';
import type { SubtitleEntry } from '../types';
import { MOCK_SUBTITLES } from '../constants';
import { generateId } from '../utils';

interface UseSubtitlesOptions {
  initialSubtitles?: SubtitleEntry[];
  maxSubtitles?: number;
}

interface UseSubtitlesReturn {
  subtitles: SubtitleEntry[];
  addSubtitle: (chinese: string, english: string) => void;
  updateSubtitle: (id: string, updates: Partial<SubtitleEntry>) => void;
  removeSubtitle: (id: string) => void;
  clearSubtitles: () => void;
  setActiveSubtitle: (id: string) => void;
}

const useSubtitles = (
  options: UseSubtitlesOptions = {}
): UseSubtitlesReturn => {
  const { initialSubtitles = MOCK_SUBTITLES, maxSubtitles = 100 } = options;

  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>(initialSubtitles);

  const addSubtitle = useCallback(
    (chinese: string, english: string) => {
      const newSubtitle: SubtitleEntry = {
        id: generateId(),
        chinese,
        english,
        timestamp: new Date(),
        isActive: true,
      };

      setSubtitles((prev) =>
        prev
          .map((s) => ({ ...s, isActive: false }))
          .concat(newSubtitle)
          .slice(-maxSubtitles)
      );
    },
    [maxSubtitles]
  );

  const updateSubtitle = useCallback(
    (id: string, updates: Partial<SubtitleEntry>) => {
      setSubtitles((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const removeSubtitle = useCallback(
    (id: string) => {
      setSubtitles((prev) => prev.filter((s) => s.id !== id));
    },
    []
  );

  const clearSubtitles = useCallback(() => {
    setSubtitles([]);
  }, []);

  const setActiveSubtitle = useCallback(
    (id: string) => {
      setSubtitles((prev) =>
        prev.map((s) => ({ ...s, isActive: s.id === id }))
      );
    },
    []
  );

  return {
    subtitles,
    addSubtitle,
    updateSubtitle,
    removeSubtitle,
    clearSubtitles,
    setActiveSubtitle,
  };
};

export default useSubtitles;
