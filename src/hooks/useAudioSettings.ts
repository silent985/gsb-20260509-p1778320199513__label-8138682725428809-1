import { useState, useCallback } from 'react';
import type { AudioSettings } from '../types';
import { DEFAULT_AUDIO_SETTINGS } from '../constants';

interface UseAudioSettingsReturn {
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;
  updateAudioSetting: (key: keyof AudioSettings, value: number) => void;
  resetAudioSettings: () => void;
}

const useAudioSettings = (): UseAudioSettingsReturn => {
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);

  const updateAudioSetting = useCallback((key: keyof AudioSettings, value: number) => {
    setAudioSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetAudioSettings = useCallback(() => {
    setAudioSettings(DEFAULT_AUDIO_SETTINGS);
  }, []);

  return {
    audioSettings,
    setAudioSettings,
    updateAudioSetting,
    resetAudioSettings,
  };
};

export default useAudioSettings;
