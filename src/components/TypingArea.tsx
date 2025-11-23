import { useEffect, useRef } from 'react';

interface TypingAreaProps {
  targetText: string;
  typedText: string;
  currentIndex: number;
  onType: (text: string) => void;
  isPlaying: boolean;
  isFinished: boolean;
}

export default function TypingArea({
  targetText,
  typedText,
  currentIndex,
  onType,
  isPlaying,
  isFinished
}: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isPlaying && !isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlaying, isFinished]);

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'text-2xl transition-all duration-100 ';

      if (index < currentIndex) {
        const typedChar = typedText[index];
        if (typedChar === char) {
          className += 'text-green-500 font-semibold';
        } else {
          className += 'text-red-500 font-semibold bg-red-100 rounded';
        }
      } else if (index === currentIndex) {
        className += 'text-gray-900 font-bold bg-yellow-200 px-1 rounded animate-pulse';
      } else {
        className += 'text-gray-400';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-black rounded-2xl p-8 shadow-lg border-4 border-yellow-400 min-h-[150px]">
        <h3 className="text-yellow-400 text-sm font-bold mb-4 uppercase tracking-wider">Race Text</h3>
        <div className="leading-relaxed tracking-wide">
          {renderText()}
        </div>
      </div>

      <textarea
        ref={inputRef}
        value={typedText}
        onChange={(e) => onType(e.target.value)}
        disabled={!isPlaying || isFinished}
        className="w-full h-32 p-4 text-xl bg-black border-4 border-red-600 text-white rounded-xl focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition-all resize-none placeholder-gray-500"
        placeholder={isPlaying ? "Type here to race..." : "Get ready to race!"}
      />
    </div>
  );
}
