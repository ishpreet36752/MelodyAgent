
import React from 'react';
import { MoodBubble, MoodType } from './MoodBubble';

interface MoodSelectorProps {
  moods: MoodType[];
  currentMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  moods, 
  currentMood, 
  onMoodSelect 
}) => {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto p-2 justify-center">
      {moods.map(mood => (
        <MoodBubble 
          key={mood} 
          mood={mood} 
          isActive={currentMood === mood}
          onClick={() => onMoodSelect(mood)}
        />
      ))}
    </div>
  );
};
