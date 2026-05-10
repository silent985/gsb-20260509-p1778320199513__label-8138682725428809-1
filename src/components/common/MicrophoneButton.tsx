import React from 'react';
import type { MicrophoneButtonProps } from '../../types';

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isOn, onToggle }) => {

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full py-4 rounded-xl flex items-center justify-center gap-3
                    transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                    ${isOn
            ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25'
          }`}
      >
        <div className={`relative ${isOn ? 'animate-pulse' : ''}`}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOn ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            )}
          </svg>
          {isOn && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
          )}
        </div>
        <span className="text-white font-medium">
          {isOn ? '停止录音' : '开始录音'}
        </span>
      </button>


    </div>
  );
};

export default MicrophoneButton;
