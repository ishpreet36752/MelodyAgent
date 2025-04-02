import React, { useState, useEffect } from 'react';
import { Playlist, MoodType } from '../types/chat';
import { getCurrentTrackRecommendations } from '../services/musicService';

interface MusicRecommendationsProps {
  playlists: Playlist[];
  currentMood: MoodType | null;
}

export const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ 
  playlists, 
  currentMood 
}) => {
  const [showSongs, setShowSongs] = useState(false);
  const [recommendedTracks, setRecommendedTracks] = useState<Playlist[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);

  useEffect(() => {
    if (showSongs) {
      const fetchTrackRecommendations = async () => {
        try {
          setIsLoadingTracks(true);
          const tracks = await getCurrentTrackRecommendations();
          setRecommendedTracks(tracks);
        } catch (error) {
          console.error('Error fetching track recommendations:', error);
          setRecommendedTracks([]);
        } finally {
          setIsLoadingTracks(false);
        }
      };
      fetchTrackRecommendations();
    }
  }, [showSongs]);

  return (
    <div className="flex-1 h-full">
      <div className="flex justify-between mb-4 sticky top-0 bg-background/95 backdrop-blur z-10 pt-2 pb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            {showSongs 
              ? 'Recommended Songs' 
              : currentMood 
                ? `${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Playlists` 
                : 'Your Personalized Playlists'}
          </h2>
          <p className="text-sm text-foreground/70">
            {showSongs 
              ? 'Based on your current track'
              : currentMood 
                ? 'Curated based on your current mood' 
                : 'Share your mood to discover new music'}
          </p>
        </div>
        <div className='flex shadow-xl backdrop-blur rounded-full p-2'>
          <button 
            className='text-md font-semibold hover:text-primary transition-colors'
            onClick={() => setShowSongs(!showSongs)}
          >
            {showSongs ? 'Playlists' : 'Songs'}
          </button> 
        </div>
      </div>

      <div className="space-y-4 h-[calc(100%-80px)] overflow-y-auto pb-4">
        {showSongs ? (
          isLoadingTracks ? (
            <div className="text-center text-foreground/70">Loading song recommendations...</div>
          ) : recommendedTracks.length > 0 ? (
            recommendedTracks.map((track) => (
              <a
                key={track.id}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glassmorphism p-4 rounded-xl hover:bg-primary/10 transition-colors flex gap-4 items-start"
              >
                <img 
                  src={track.image} 
                  alt={track.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{track.name}</h3>
                  <p className="text-sm text-foreground/70 mb-2">{track.owner}</p>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center text-foreground/70 p-4">
              {isLoadingTracks ? '' : 'No song recommendations available'}
            </div>
          )
        ) : (
          playlists.map((playlist) => (
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
          ))
        )}
      </div>
    </div>
  );
};