import React from 'react';
import { MoodType } from './MoodBubble';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  detectedMood?: MoodType;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isUser,
  detectedMood
}) => {
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}>
      <div className="flex flex-col max-w-[80%] md:max-w-[70%]">
        <div 
          className={`
            p-3 rounded-xl ${isUser 
              ? 'bg-primary text-white rounded-tr-none' 
              : 'glassmorphism rounded-tl-none'}
          `}
        >
          <p className="text-sm md:text-base">{text}</p>
          
          {!isUser && detectedMood && (
            <div className="mt-2 flex items-center gap-2">
              <div className={`
                inline-block px-2 py-1 rounded-full text-xs font-medium
                bg-mood-${detectedMood}/20 text-mood-${detectedMood}
              `}>
                {detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
