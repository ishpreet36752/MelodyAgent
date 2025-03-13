import { MoodType, Playlist } from '../types/chat';
import axios from 'axios';

const getAuthData = () => ({
  access_token: localStorage.getItem('spotify_access_token'),
  refresh_token: localStorage.getItem('spotify_refresh_token'),
  timestamp: parseInt(localStorage.getItem('spotify_token_timestamp') || '0')
});

export const checkTokenExpiration = () => {
  const authData = getAuthData();
  return Date.now() - authData.timestamp > 3540 * 1000;
};

export const refreshToken = async () => {
  try {
    const response = await axios.get('http://localhost:8888/refresh_token', {
      params: { refresh_token: getAuthData().refresh_token }
    });

    localStorage.setItem('spotify_access_token', response.data.access_token);
    localStorage.setItem('spotify_token_timestamp', Date.now().toString());
    return response.data.access_token;
  } catch (error) {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_timestamp');
    window.location.href = '/';
    throw error;
  }
};

export const fetchPlaylists = async (mood: MoodType): Promise<Playlist[]> => {
  try {
    let accessToken = localStorage.getItem('spotify_access_token');
    
    if (checkTokenExpiration()) {
      accessToken = await refreshToken();
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        params: {
          q: `${mood} mood`,
          type: 'playlist',
          limit: 10,
          market: 'US'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data.playlists.items.map((item: any) => ({
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
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_timestamp');
    window.location.href = '/';
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