import React, { useState, useEffect } from 'react';
import type { TypewriterTextProps } from '../../types';
import { TYPEWRITER_SPEED } from '../../constants';

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  isActive,
  speed = TYPEWRITER_SPEED,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    setDisplayText('');
    setCurrentIndex(0);
  }, [text, isActive]);

  useEffect(() => {
    if (!isActive || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, isActive, speed]);

  return (
    <span>
      {displayText}
      {isActive && currentIndex < text.length && (
        <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-0.5" />
      )}
    </span>
  );
};

export default TypewriterText;
