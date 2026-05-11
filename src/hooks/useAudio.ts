import { useState, useCallback } from 'react';
import type { AudioSettings } from '../types';
import { DEFAULT_AUDIO_SETTINGS } from '../constants';

interface UseAudioReturn {
  isMicOn: boolean;
  toggleMic: () => void;
  audioSettings: AudioSettings;
  setAudioSettings: (settings: AudioSettings) => void;
}

const useAudio = (): UseAudioReturn => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(DEFAULT_AUDIO_SETTINGS);

  const toggleMic = useCallback(() => {
    setIsMicOn((prev) => !prev);
  }, []);

  return {
    isMicOn,
    toggleMic,
    audioSettings,
    setAudioSettings,
  };
};

export default useAudio;
