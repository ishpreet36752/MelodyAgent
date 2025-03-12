import { MoodType, Playlist } from '../types/chat';
import axios from 'axios';

export const checkTokenExpiration = () => {
  const authData = JSON.parse(localStorage.getItem('spotify_auth') || '{}');
  if (!authData.timestamp) return true;
  return Date.now() - authData.timestamp > 10 * 60 * 1000; // 5 minutes
};

export const fetchPlaylists = async (mood: MoodType): Promise<Playlist[]> => {
  if (checkTokenExpiration()) {
    localStorage.removeItem('spotify_auth');
    window.location.href = '/';
    return [];
  }

  try {
    const authData = JSON.parse(localStorage.getItem('spotify_auth') || '{}');
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${mood}%20mood&type=playlist&limit=10`, {
      headers: {
        Authorization: `Bearer ${authData.access_token}`
      }
    });

    const data = await response.data;
    return data.playlists.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.images[0]?.url || '/default-playlist.png',
      url: item.external_urls.spotify,
      tracks: item.tracks.total,
      owner: item.owner.display_name
    }));
  } catch (error) {
    console.error('Playlist fetch error:', error);
    throw error;
  }
};

export const detectMood = (text: string): MoodType => {
  const lowerText = text.toLowerCase();
  const moodMap: Record<MoodType, RegExp[]> = {
    happy: [/happy/, /joy/, /great/, /excited/],
    sad: [/sad/, /upset/, /depressed/, /down/],
    energetic: [/energetic/, /hyper/, /pumped/, /workout/],
    calm: [/calm/, /relax/, /peaceful/, /chill/],
    focus: [/focus/, /concentrate/, /study/, /work/]
  };

  for (const [mood, patterns] of Object.entries(moodMap)) {
    if (patterns.some(pattern => pattern.test(lowerText))) {
      return mood as MoodType;
    }
  }

  const moods: MoodType[] = ['happy', 'sad', 'energetic', 'calm', 'focus'];
  return moods[Math.floor(Math.random() * moods.length)];
};

export const processUserMessage = async (text: string) => {
  const detectedMood = detectMood(text);
  const playlists = await fetchPlaylists(detectedMood);
  return { detectedMood, playlists };
};