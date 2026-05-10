import { useCallback } from 'react';
import type { SubtitleEntry, AudioSettings, TranslationHistory } from '../types';
import useLanguage from './useLanguage';
import useMicrophone, { RecognizedSentence } from './useMicrophone';
import useAudioSettings from './useAudioSettings';
import useSubtitles from './useSubtitles';
import useTranslationHistory from './useTranslationHistory';

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
  const audioSettingsModule = useAudioSettings();
  const subtitles = useSubtitles();
  const history = useTranslationHistory();

  const handleSentenceRecognized = useCallback((sentence: RecognizedSentence) => {
    subtitles.addSubtitle(sentence.chinese, sentence.english);
  }, [subtitles.addSubtitle]);

  const microphone = useMicrophone({
    onSentenceRecognized: handleSentenceRecognized,
  });

  const addToHistory = useCallback(
    (source: string, translated: string) => {
      history.addToHistory(source, translated, language.sourceLanguage, language.targetLanguage);
    },
    [history, language.sourceLanguage, language.targetLanguage]
  );

  return {
    ...language,
    ...microphone,
    ...audioSettingsModule,
    ...subtitles,
    translationHistory: history.translationHistory,
    addToHistory,
    clearHistory: history.clearHistory,
  };
};

export default useTranslation;
