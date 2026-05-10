import React from "react";
import { ControlPanel, SubtitleDisplay, InputTranslation } from "./components";
import { useTranslation } from "./hooks";
import { translateTextSync } from "./utils";

const App: React.FC = () => {
  const {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    isMicOn,
    toggleMic,
    audioSettings,
    setAudioSettings,
    subtitles,
    addSubtitle,
    recognizingText,
  } = useTranslation();

  // 处理翻译提交
  const handleTranslate = (text: string) => {
    // 使用翻译函数获取翻译结果
    const translatedText = translateTextSync(text);
    addSubtitle(text, translatedText);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden md:h-screen md:overflow-hidden">
      {/* 三栏布局 */}
      <div className="grid grid-cols-[auto_1fr_auto] min-h-screen md:h-full">
        {/* 左侧 - 控制面板 */}
        <ControlPanel
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onSourceChange={setSourceLanguage}
          onTargetChange={setTargetLanguage}
          isMicOn={isMicOn}
          onMicToggle={toggleMic}
          audioSettings={audioSettings}
          onAudioSettingsChange={setAudioSettings}
          recognizingText={recognizingText}
        />

        {/* 中央 - 字幕显示 */}
        <SubtitleDisplay
          subtitles={subtitles}
          recognizingText={recognizingText}
          isMicOn={isMicOn}
        />

        {/* 右侧 - 文本翻译 */}
        <InputTranslation
          onTranslate={handleTranslate}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
        />
      </div>
    </div>
  );
};

export default App;
