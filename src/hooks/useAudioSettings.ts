import { useState, useCallback } from 'react';
import type { AudioSettings } from '../types';
import { DEFAULT_AUDIO_SETTINGS } from '../constants';
import useLocalStorage from './useLocalStorage';

interface UseAudioSettingsOptions {
  persistKey?: string;
  defaultSettings?: AudioSettings;
}

interface UseAudioSettingsReturn {
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;
  updateVolume: (volume: number) => void;
  updateSensitivity: (sensitivity: number) => void;
  updateNoiseReduction: (noiseReduction: number) => void;
  resetAudioSettings: () => void;
}

const useAudioSettings = (
  options: UseAudioSettingsOptions = {}
): UseAudioSettingsReturn => {
  const { persistKey, defaultSettings = DEFAULT_AUDIO_SETTINGS } = options;

  const createState = (): [AudioSettings, (value: AudioSettings | ((prev: AudioSettings) => AudioSettings)) => void] => {
    if (persistKey) {
      return useLocalStorage<AudioSettings>(persistKey, defaultSettings);
    }
    return useState<AudioSettings>(defaultSettings);
  };

  const [audioSettings, setAudioSettingsState] = createState();

  const setAudioSettings = useCallback(
    (settings: AudioSettings) => {
      setAudioSettingsState(settings);
    },
    [setAudioSettingsState]
  );

  const updateVolume = useCallback(
    (volume: number) => {
      setAudioSettingsState((prev) => ({ ...prev, volume }));
    },
    [setAudioSettingsState]
  );

  const updateSensitivity = useCallback(
    (sensitivity: number) => {
      setAudioSettingsState((prev) => ({ ...prev, sensitivity }));
    },
    [setAudioSettingsState]
  );

  const updateNoiseReduction = useCallback(
    (noiseReduction: number) => {
      setAudioSettingsState((prev) => ({ ...prev, noiseReduction }));
    },
    [setAudioSettingsState]
  );

  const resetAudioSettings = useCallback(() => {
    setAudioSettingsState(defaultSettings);
  }, [defaultSettings, setAudioSettingsState]);

  return {
    audioSettings,
    setAudioSettings,
    updateVolume,
    updateSensitivity,
    updateNoiseReduction,
    resetAudioSettings,
  };
};

export default useAudioSettings;
