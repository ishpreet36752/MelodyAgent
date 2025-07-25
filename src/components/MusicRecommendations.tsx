import React, { useState, useEffect } from 'react';
import { Playlist, MoodType } from '../types/chat';
import { getCurrentTrackRecommendations } from '../services/musicService';
import StarBorder from '@/ui/StarBorder';

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
          console.log(tracks)
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
    <div className="flex-auto max-h-full  overflow-auto ">
      <div className="flex justify-between mb-4 sticky top-0 bg-background/95 backdrop-blur z-10 pt-2 pb-4 rounded-2xl">
        
        <div className='pl-2'>
          <h2 className="text-sm  font-bold ">
            {showSongs
              ? 'Recommended Songs'
              : currentMood
                ? `${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Playlists`
                : 'Your Personalized Playlists'}
          </h2>
          <p className="text-sm text-foreground/80">
            {showSongs
              ? 'Based on your current track'
              : currentMood
                ? 'Curated based on your current mood'
                : 'Share your mood to discover new music'}
          </p>
        </div> 
        <div className='flex shadow-xl backdrop-blur rounded-full p-2 mr-2'>
       
          <button
            className='text-sm font-bold hover:text-primary transition-colors'
            onClick={() => setShowSongs(!showSongs)}
          >
            {showSongs ? 'Playlists' : 'Songs'}
          </button>
        </div>
      </div>

      <div className="space-y-2 h-full overflow-y-auto pb-2 ">
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
              className="flex items-center gap-3  p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{playlist.name}</div>
                <div className="text-xs text-foreground/70 truncate">{playlist.description || playlist.owner}</div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};