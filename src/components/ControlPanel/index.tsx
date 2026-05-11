import React, { useState } from 'react';
import type { ControlPanelProps } from '../../types';
import { APP_INFO } from '../../constants';
import { LanguageSelector, MicrophoneButton, Slider } from '../common';

const ControlPanel: React.FC<ControlPanelProps> = ({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
  isMicOn,
  onMicToggle,
  audioSettings,
  onAudioSettingsChange,
  recognizingText,
}) => {
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);

  // 交换语言
  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    onSourceChange(targetLanguage);
    onTargetChange(temp);
  };

  return (
    <div className="sidebar-left w-72 h-auto bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 flex flex-col md:h-full">
      {/* 头部 Logo */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">{APP_INFO.name}</h1>
            <p className="text-gray-400 text-xs">{APP_INFO.nameEn}</p>
          </div>
        </div>
      </div>

      {/* 语言选择区域 */}
      <div className="p-6 space-y-4 border-b border-gray-700/50">
        <h2 className="text-gray-300 text-sm font-medium flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          语言设置
        </h2>

        {/* 源语言 */}
        <LanguageSelector
          value={sourceLanguage}
          onChange={onSourceChange}
          label="源语言"
          labelEn="Source"
        />

        {/* 交换按钮 */}
        <button
          onClick={handleSwapLanguages}
          className="w-full py-2 flex items-center justify-center gap-2 text-gray-400
                     hover:text-white transition-colors duration-200 group"
        >
          <svg
            className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="text-xs">交换语言</span>
        </button>

        {/* 目标语言 */}
        <LanguageSelector
          value={targetLanguage}
          onChange={onTargetChange}
          label="目标语言"
          labelEn="Target"
        />
      </div>

      {/* 麦克风控制 */}
      <div className="p-6 border-b border-gray-700/50">
        <h2 className="text-gray-300 text-sm font-medium mb-4 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          麦克风控制
        </h2>

        <MicrophoneButton isOn={isMicOn} onToggle={onMicToggle} recognizingText={recognizingText} />
      </div>

      {/* 音频设置 */}
      <div className="p-6 flex-1">
        <button
          onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
          className="w-full flex items-center justify-between text-gray-300 text-sm font-medium mb-4"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            音频设置
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isSettingsExpanded ? 'rotate-180' : ''
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`space-y-5 overflow-hidden transition-all duration-300 ${isSettingsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          {/* 音量滑块 */}
          <Slider
            label="音量"
            labelEn="Volume"
            value={audioSettings.volume}
            onChange={(value) =>
              onAudioSettingsChange({ ...audioSettings, volume: value })
            }
          />

          {/* 灵敏度滑块 */}
          <Slider
            label="灵敏度"
            labelEn="Sensitivity"
            value={audioSettings.sensitivity}
            onChange={(value) =>
              onAudioSettingsChange({ ...audioSettings, sensitivity: value })
            }
          />

          {/* 降噪滑块 */}
          <Slider
            label="降噪"
            labelEn="Noise Reduction"
            value={audioSettings.noiseReduction}
            onChange={(value) =>
              onAudioSettingsChange({ ...audioSettings, noiseReduction: value })
            }
          />
        </div>
      </div>

      {/* 底部版本信息 */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <span>v{APP_INFO.version}</span>
          <span>{APP_INFO.copyright}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
