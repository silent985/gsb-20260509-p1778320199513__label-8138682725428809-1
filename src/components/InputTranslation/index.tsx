import React, { useState } from "react";
import type { InputTranslationProps } from "../../types";
import { MAX_INPUT_CHARS, QUICK_PHRASES } from "../../constants";
import { translateText, copyToClipboard } from "../../utils";

const InputTranslation: React.FC<InputTranslationProps> = ({
  onTranslate,
  sourceLanguage,
  targetLanguage,
}) => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_INPUT_CHARS) {
      setInputText(text);
      setCharCount(text.length);
    }
  };

  // 处理翻译
  const handleTranslate = async () => {
    if (!inputText.trim() || isTranslating) return;

    setIsTranslating(true);

    try {
      const result = await translateText(
        inputText,
        sourceLanguage,
        targetLanguage,
      );
      setTranslatedText(result);
      onTranslate(inputText);
    } catch (error) {
      console.error("翻译失败:", error);
      setTranslatedText("翻译失败，请重试");
    } finally {
      setIsTranslating(false);
    }
  };

  // 清空输入
  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setCharCount(0);
  };

  // 复制翻译结果
  const handleCopy = async () => {
    const success = await copyToClipboard(translatedText);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // 使用快捷短语
  const handleQuickPhrase = (phrase: string) => {
    setInputText(phrase);
    setCharCount(phrase.length);
  };

  // 键盘快捷键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="sidebar-right w-80 h-auto bg-gray-900/80 backdrop-blur-xl border-l border-gray-700/50 flex flex-col md:h-full">
      {/* 头部 */}
      <div className="p-6 border-b border-gray-700/50">
        <h2 className="text-white font-semibold text-lg"></h2>
        <p className="text-gray-500 text-sm">Text Translation</p>
      </div>

      {/* 输入区域 */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        {/* 文本输入 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-400 text-sm">输入文本</label>
            <span
              className={`text-xs transition-colors ${charCount > MAX_INPUT_CHARS * 0.9
                ? "text-red-400"
                : "text-gray-500"
                }`}
            >
              {charCount}/{MAX_INPUT_CHARS}
            </span>
          </div>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="在此输入要翻译的文本... (Ctrl+Enter 发送)"
              className="w-full h-40 bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3
                         text-white text-sm resize-none focus:outline-none focus:ring-2
                         focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200
                         placeholder:text-gray-600"
            />
            {/* 字符计数进度条 */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-xl overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${charCount > MAX_INPUT_CHARS * 0.9
                  ? "bg-red-500"
                  : "bg-blue-500"
                  }`}
                style={{ width: `${(charCount / MAX_INPUT_CHARS) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isTranslating}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300
                        flex items-center justify-center gap-2
                        ${inputText.trim() && !isTranslating
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isTranslating ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                翻译中...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
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
                翻译
              </>
            )}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white
                       hover:bg-gray-700 transition-all duration-200"
            title="清空"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        {/* 翻译结果 */}
        {translatedText && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex justify-between items-center">
              <label className="text-gray-400 text-sm">翻译结果</label>
              <button
                onClick={handleCopy}
                className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 text-xs"
              >
                {copySuccess ? (
                  <>
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-green-400">已复制</span>
                  </>
                ) : (
                  <>
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    复制
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4">
              <p className="text-white text-sm leading-relaxed">
                {translatedText}
              </p>
            </div>
          </div>
        )}

        {/* 快捷短语 */}
        <div className="mt-auto space-y-3">
          <p className="text-gray-500 text-xs">快捷短语</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_PHRASES.map((phrase) => (
              <button
                key={phrase.chinese}
                onClick={() => handleQuickPhrase(phrase.chinese)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg
                           text-gray-400 text-sm hover:bg-gray-800 hover:text-white
                           hover:border-gray-600 transition-all duration-200 text-left"
              >
                <span className="block">{phrase.chinese}</span>
                <span className="block text-xs text-gray-600">
                  {phrase.english}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTranslation;
