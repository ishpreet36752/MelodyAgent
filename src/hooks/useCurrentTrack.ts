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
    } catch (error) {
      console.error("Error fetching current track:", error);
    }
  }, []);

  return { currentTrack, pollCurrentTrack, setCurrentTrack };
}