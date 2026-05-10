import { useCallback, useEffect, useRef } from 'react';
import type { SubtitleEntry, AudioSettings, TranslationHistory } from '../types';
import { translateTextSync } from '../utils';
import useLanguage from './useLanguage';
import useAudio from './useAudio';
import useSubtitles from './useSubtitles';
import useTranslationHistory from './useTranslationHistory';
import useRecognition from './useRecognition';

interface UseTranslationReturn {
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  swapLanguages: () => void;
  isMicOn: boolean;
  toggleMic: () => void;
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;
  subtitles: SubtitleEntry[];
  addSubtitle: (chinese: string, english: string) => void;
  clearSubtitles: () => void;
  translationHistory: TranslationHistory[];
  addToHistory: (source: string, translated: string) => void;
  clearHistory: () => void;
  recognizingText: string;
}

const useTranslation = (): UseTranslationReturn => {
  const language = useLanguage();
  const audio = useAudio();
  const subtitles = useSubtitles();
  const history = useTranslationHistory();

  const recognition = useRecognition({
    isMicOn: audio.isMicOn,
  });

  const prevRecognizedRef = useRef('');

  useEffect(() => {
    if (recognition.recognizedText && recognition.recognizedText !== prevRecognizedRef.current) {
      prevRecognizedRef.current = recognition.recognizedText;
      const sourceText = recognition.recognizedText;
      const translatedText = translateTextSync(sourceText);
      subtitles.addSubtitle(sourceText, translatedText);
    }
  }, [recognition.recognizedText, subtitles]);

  useEffect(() => {
    if (!audio.isMicOn) {
      prevRecognizedRef.current = '';
    }
  }, [audio.isMicOn]);

  const addToHistory = useCallback(
    (source: string, translated: string) => {
      history.addToHistory(source, translated, language.sourceLanguage, language.targetLanguage);
    },
    [history, language.sourceLanguage, language.targetLanguage]
  );

  return {
    sourceLanguage: language.sourceLanguage,
    targetLanguage: language.targetLanguage,
    setSourceLanguage: language.setSourceLanguage,
    setTargetLanguage: language.setTargetLanguage,
    swapLanguages: language.swapLanguages,
    isMicOn: audio.isMicOn,
    toggleMic: audio.toggleMic,
    audioSettings: audio.audioSettings,
    setAudioSettings: audio.setAudioSettings,
    subtitles: subtitles.subtitles,
    addSubtitle: subtitles.addSubtitle,
    clearSubtitles: subtitles.clearSubtitles,
    translationHistory: history.translationHistory,
    addToHistory,
    clearHistory: history.clearHistory,
    recognizingText: recognition.recognizingText,
  };
};

export default useTranslation;
