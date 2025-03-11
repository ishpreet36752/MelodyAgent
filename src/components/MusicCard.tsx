
import React from 'react';
import { MoodType } from './MoodBubble';

export interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
}

interface MusicCardProps {
  track: Track;
  mood?: MoodType;
  isCurrent?: boolean;
}

export const MusicCard: React.FC<MusicCardProps> = ({ 
  track, 
  mood,
  isCurrent = false
}) => {
  return (
    <div 
      className={`
        relative rounded-xl overflow-hidden pulse-on-hover 
        ${isCurrent ? 'border-2 border-primary shadow-lg' : 'border border-border'}
      `}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={track.albumArt} 
          alt={`${track.name} by ${track.artist}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{track.name}</h3>
        <p className="text-xs text-foreground/70 truncate">{track.artist}</p>
        
        {mood && (
          <div className="absolute top-2 right-2">
            <div className={`
              inline-block px-2 py-1 rounded-full text-xs font-medium
              bg-mood-${mood} text-white
            `}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </div>
          </div>
        )}
        
        {isCurrent && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-white bg-black/50 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm">
              <div className="music-wave scale-75">
                <div className="music-wave-bar bg-white"></div>
                <div className="music-wave-bar bg-white"></div>
                <div className="music-wave-bar bg-white"></div>
                <div className="music-wave-bar bg-white"></div>
                <div className="music-wave-bar bg-white"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
