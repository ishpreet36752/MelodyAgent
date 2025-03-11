
import React from 'react';

export type MoodType = 'happy' | 'sad' | 'energetic' | 'calm' | 'focus';

interface MoodBubbleProps {
  mood: MoodType;
  isActive?: boolean;
  onClick?: () => void;
}

export const MoodBubble: React.FC<MoodBubbleProps> = ({ 
  mood, 
  isActive = false,
  onClick
}) => {
  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    energetic: '⚡',
    calm: '😌',
    focus: '🧠'
  };
  
  const moodLabels = {
    happy: 'Happy',
    sad: 'Sad',
    energetic: 'Energetic',
    calm: 'Calm',
    focus: 'Focused'
  };
  
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1
        px-4 py-3 rounded-full transition-all duration-300
        ${isActive 
          ? `bg-mood-${mood} text-white shadow-lg scale-105` 
          : 'glassmorphism hover:bg-white/30 dark:hover:bg-black/30'}
        ${isActive ? '' : 'pulse-on-hover'}
      `}
    >
      <span className="text-xl">{moodEmojis[mood]}</span>
      <span className="text-xs font-medium">{moodLabels[mood]}</span>
    </button>
  );
};
