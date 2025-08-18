// src/hooks/useCurrentTrack.ts
import { useState, useCallback } from "react";
import axios from "axios";
import { CurrentTrack } from "../types/chat";

export function useCurrentTrack() {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);

  const pollCurrentTrack = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("spotify_access_token");
      if (!accessToken) return;

      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data?.item) {
        setCurrentTrack({
          id: response.data.item.id,
          name: response.data.item.name,
          artist: response.data.item.artists[0]?.name || "Unknown Artist",
          image:
            response.data.item.album?.images?.[0]?.url ||
            "/default-track.png",
          isPlaying: response.data.is_playing,
        });
      }
    } catch (error: any) {
      // Handle different types of errors gracefully
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Token expired or invalid - redirect to login
          localStorage.removeItem('spotify_access_token');
          localStorage.removeItem('spotify_refresh_token');
          localStorage.removeItem('spotify_token_timestamp');
          window.location.href = '/';
        } else if (error.response?.status === 403) {
          // User doesn't have permission or premium account
          console.warn('User may not have premium account or sufficient permissions for playback state');
          // Don't redirect, just log the warning
        } else if (error.response?.status === 429) {
          // Rate limited - just log and continue
          console.warn('Spotify API rate limit exceeded');
        } else {
          console.error("Error fetching current track:", error.message);
        }
      } else {
        console.error("Error fetching current track:", error);
      }
    }
  }, []);

  return { currentTrack, pollCurrentTrack, setCurrentTrack };
}