
import React from 'react';
import { MusicCard } from './MusicCard';
import { Track } from '../types/chat';
import { MoodType } from './MoodBubble';

interface MusicRecommendationsProps {
  tracks: Track[];
  currentMood: MoodType | null;
}

export const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ 
  tracks, 
  currentMood 
}) => {
  return (
    <div className="flex-1">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">
          {currentMood 
            ? `Your ${currentMood} playlist` 
            : 'Your personalized recommendations'}
        </h2>
        <p className="text-sm text-foreground/70">
          {tracks.length > 0 
            ? 'Based on your current mood' 
            : 'Share how you feel to get music recommendations'}
        </p>
      </div>
      
      {tracks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tracks.map((track, index) => (
            <MusicCard 
              key={track.id} 
              track={track} 
              mood={currentMood || undefined}
              isCurrent={index === 0} 
            />
          ))}
        </div>
      ) : (
        <div className="glassmorphism rounded-xl p-6 flex flex-col items-center justify-center text-center h-64">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Waiting for your mood</h3>
          <p className="text-sm text-foreground/70">
            Share how you're feeling or select a mood to get personalized music recommendations
          </p>
        </div>
      )}
    </div>
  );
};
