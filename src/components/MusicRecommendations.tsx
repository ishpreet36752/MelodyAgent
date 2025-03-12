// src/components/MusicRecommendations.tsx
import React from 'react';
import { Playlist, MoodType } from '../types/chat';

interface MusicRecommendationsProps {
  playlists: Playlist[];
  currentMood: MoodType | null;
}

export const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ 
  playlists, 
  currentMood 
}) => {
  return (
    <div className="flex-1">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">
          {currentMood 
            ? `${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Playlists` 
            : 'Your Personalized Playlists'}
        </h2>
        <p className="text-sm text-foreground/70">
          {playlists.length > 0 
            ? 'Curated based on your current mood' 
            : 'Share your mood to discover new music'}
        </p>
      </div>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glassmorphism p-4 rounded-xl hover:bg-primary/10 transition-colors flex gap-4 items-start"
          >
            <img 
              src={playlist.image} 
              alt={playlist.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{playlist.name}</h3>
              <p className="text-sm text-foreground/70 mb-2">{playlist.owner}</p>
              <p className="text-sm line-clamp-2 text-foreground/80">
                {playlist.description || 'No description available'}
              </p>
              <div className="mt-2 text-xs text-primary">
                {playlist.tracks} tracks
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};