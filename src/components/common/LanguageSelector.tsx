import React from 'react';
import type { LanguageSelectorProps } from '../../types';
import { LANGUAGES } from '../../constants';

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  label,
  labelEn,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-xs">
        {label} / {labelEn}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2.5
                   text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50
                   focus:border-blue-500/50 transition-all duration-200 cursor-pointer
                   hover:bg-gray-800/70 appearance-none"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gray-800">
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
