import React from 'react';
import type { SliderProps } from '../../types';

const Slider: React.FC<SliderProps> = ({
  label,
  labelEn,
  value,
  onChange,
  min = 0,
  max = 100,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-gray-400 text-xs">
          {label} / {labelEn}
        </label>
        <span className="text-blue-400 text-xs font-mono">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="slider-custom w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default Slider;
