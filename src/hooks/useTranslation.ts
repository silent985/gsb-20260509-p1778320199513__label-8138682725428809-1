import { useCallback } from 'react';
import type { AudioSettings, SubtitleEntry, TranslationHistory } from '../types';
import useLanguageSettings from './useLanguageSettings';
import useAudioSettings from './useAudioSettings';
import useSubtitles from './useSubtitles';
import useMicrophone from './useMicrophone';
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
  const languageSettings = useLanguageSettings();
  const audioSettings = useAudioSettings();
  const subtitles = useSubtitles();
  const history = useTranslationHistory();

  const microphone = useMicrophone({
    onSentenceComplete: useCallback(
      (chinese: string, english: string) => {
        subtitles.addSubtitle(chinese, english);
      },
      [subtitles]
    ),
  });

  const addToHistory = useCallback(
    (source: string, translated: string) => {
      history.addToHistory(
        source,
        translated,
        languageSettings.sourceLanguage,
        languageSettings.targetLanguage
      );
    },
    [history, languageSettings.sourceLanguage, languageSettings.targetLanguage]
  );

  return {
    sourceLanguage: languageSettings.sourceLanguage,
    targetLanguage: languageSettings.targetLanguage,
    setSourceLanguage: languageSettings.setSourceLanguage,
    setTargetLanguage: languageSettings.setTargetLanguage,
    swapLanguages: languageSettings.swapLanguages,

    isMicOn: microphone.isMicOn,
    toggleMic: microphone.toggleMic,

    audioSettings: audioSettings.audioSettings,
    setAudioSettings: audioSettings.setAudioSettings,

    subtitles: subtitles.subtitles,
    addSubtitle: subtitles.addSubtitle,
    clearSubtitles: subtitles.clearSubtitles,

    translationHistory: history.translationHistory,
    addToHistory,
    clearHistory: history.clearHistory,

    recognizingText: microphone.recognizingText,
  };
};

export default useTranslation;
