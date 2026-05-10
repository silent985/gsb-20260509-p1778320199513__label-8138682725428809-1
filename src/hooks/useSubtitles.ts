import { useState, useCallback } from 'react';
import type { SubtitleEntry } from '../types';
import { MOCK_SUBTITLES } from '../constants';
import { generateId } from '../utils';

interface UseSubtitlesReturn {
  subtitles: SubtitleEntry[];
  addSubtitle: (chinese: string, english: string) => void;
  clearSubtitles: () => void;
  removeSubtitle: (id: string) => void;
}

const useSubtitles = (): UseSubtitlesReturn => {
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>(MOCK_SUBTITLES);

  const addSubtitle = useCallback((chinese: string, english: string) => {
    const newSubtitle: SubtitleEntry = {
      id: generateId(),
      chinese,
      english,
      timestamp: new Date(),
      isActive: true,
    };

    setSubtitles((prev) =>
      prev.map((s) => ({ ...s, isActive: false })).concat(newSubtitle)
    );
  }, []);

  const clearSubtitles = useCallback(() => {
    setSubtitles([]);
  }, []);

  const removeSubtitle = useCallback((id: string) => {
    setSubtitles((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return {
    subtitles,
    addSubtitle,
    clearSubtitles,
    removeSubtitle,
  };
};

export default useSubtitles;
