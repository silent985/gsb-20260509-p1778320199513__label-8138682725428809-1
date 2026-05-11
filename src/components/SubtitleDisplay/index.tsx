import React, { useRef, useEffect } from 'react';
import type { SubtitleDisplayProps } from '../../types';
import { TypewriterText } from '../common';
import { formatTimestamp, exportSubtitlesToText, downloadTextFile } from '../../utils';

const SubtitleDisplay: React.FC<SubtitleDisplayProps> = ({
  subtitles,
  onExport,
  recognizingText = '',
  isMicOn = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新字幕
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [subtitles, recognizingText]);

  // 导出字幕
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      const content = exportSubtitlesToText(subtitles);
      const filename = `subtitles_${new Date().toISOString().slice(0, 10)}.txt`;
      downloadTextFile(content, filename);
    }
  };

  return (
    <div className="main-content flex-1 h-auto bg-gray-950 flex flex-col overflow-hidden md:h-full">
      {/* 头部 */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-lg">实时字幕</h2>
            <p className="text-gray-500 text-sm">Real-time Subtitles</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">在线</span>
          </div>
        </div>
      </div>

      {/* 字幕列表 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth custom-scrollbar"
      >
        {/* 正在识别的文本 */}
        {isMicOn && recognizingText && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 animate-pulse">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
              <span className="text-green-400 text-xs">正在识别 / Recognizing...</span>
            </div>
            <p className="text-lg text-white leading-relaxed">
              {recognizingText}
              <span className="inline-block w-0.5 h-5 bg-green-400 ml-1 animate-pulse" />
            </p>
          </div>
        )}

        {subtitles.length > 0 && subtitles.map((subtitle, index) => (
          <div
            key={subtitle.id}
            className={`p-4 rounded-xl transition-all duration-500 transform animate-slide-up
              ${subtitle.isActive
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 scale-[1.02] shadow-lg shadow-blue-500/10'
                : 'bg-gray-900/50 border border-gray-800 hover:bg-gray-900/70'
              }`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* 时间戳 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-500 text-xs font-mono">
                {formatTimestamp(subtitle.timestamp)}
              </span>
              {subtitle.isActive && (
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full animate-pulse">
                  当前
                </span>
              )}
            </div>

            {/* 中文文本 */}
            <div className="mb-2">
              <p
                className={`text-lg leading-relaxed ${subtitle.isActive ? 'text-white' : 'text-gray-300'
                  }`}
              >
                <TypewriterText text={subtitle.chinese} isActive={subtitle.isActive} />
              </p>
            </div>

            {/* 英文翻译 */}
            <div className="pt-2 border-t border-gray-700/50">
              <p
                className={`text-sm leading-relaxed ${subtitle.isActive ? 'text-blue-300' : 'text-gray-500'
                  }`}
              >
                <TypewriterText text={subtitle.english} isActive={subtitle.isActive} />
              </p>
            </div>
          </div>
        ))}

        {/* 录音中但还没有识别到文本且没有字幕时显示聆听状态 */}
        {isMicOn && !recognizingText && subtitles.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-20">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-400 animate-pulse"
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
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
            </div>
            <p className="text-lg text-green-400">正在聆听...</p>
            <p className="text-sm mt-1 text-gray-500">Listening for speech...</p>
          </div>
        )}

        {/* 默认空状态 - 麦克风关闭且没有字幕 */}
        {!isMicOn && subtitles.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-20">
            <svg
              className="w-16 h-16 mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <p className="text-lg">开始录音以显示字幕</p>
            <p className="text-sm mt-1">Start recording to display subtitles</p>
          </div>
        )}
      </div>

      {/* 底部统计和导出 */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span>共 {subtitles.length} 条记录</span>
          <button
            onClick={handleExport}
            disabled={subtitles.length === 0}
            className="flex items-center gap-1 hover:text-white transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            导出记录
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubtitleDisplay;
