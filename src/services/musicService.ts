// musicService.ts
import { MoodType, Playlist } from '../types/chat';
import axios from 'axios';
import { HfInference } from '@huggingface/inference';

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
if (!HF_TOKEN) {
  throw new Error('Hugging Face token not configured');
}

const hf = new HfInference(HF_TOKEN);

const emotionToMoodMapping: Record<string, MoodType> = {
  'joy': 'happy',
  'sadness': 'sad',
  'anger': 'energetic',
  'surprise': 'energetic',
  'disgust': 'sad',
  'fear': 'sad',
  'neutral': 'calm',
  'excitement': 'energetic',
  'calmness': 'calm',
  'confusion': 'focus',
  'contentment': 'happy'
};

// Spotify token management
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
          q: `${mood}`,
          type: 'playlist',
          limit: 10,
          market: 'US'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const items = response.data.playlists?.items || [];
    
    return items
      .filter(item => item?.id)
      .map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.images?.[0]?.url || '/default-playlist.png',
        url: item.external_urls?.spotify || '#',
        tracks: item.tracks?.total || 0,
        owner: item.owner?.display_name || 'Unknown Artist'
      }));

  } catch (error) {
    console.error('Playlist fetch error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_token_timestamp');
        window.location.href = '/';
      }
      if (error.response?.status === 429) {
        console.warn('Spotify API rate limit exceeded');
      }
    }
    
    throw error;
  }
};

async function detectEmotion(text: string): Promise<MoodType> {
  try {
    const response = await hf.textClassification({
      model: 'j-hartmann/emotion-english-distilroberta-base',
      inputs: text
    });

    const topEmotion = response[0].label.toLowerCase();
    return emotionToMoodMapping[topEmotion] || 'calm';
  } catch (error) {
    console.error('Emotion detection failed, using fallback:', error);
    return detectMoodFallback(text);
  }
}


function detectMoodFallback(text: string): MoodType {
  const lowerText = text.toLowerCase();
  const moodMap: Record<MoodType, RegExp[]> = {
    happy: [/happy/, /joy/, /great/, /excited/, /good/, /awesome/],
    sad: [/sad/, /upset/, /depressed/, /down/, /lonely/, /bad/],
    energetic: [/energetic/, /hyper/, /pumped/, /workout/, /party/, /dance/],
    calm: [/calm/, /relax/, /peaceful/, /chill/, /mellow/, /quiet/],
    focus: [/focus/, /concentrate/, /study/, /work/, /read/, /code/]
  };

  for (const [mood, patterns] of Object.entries(moodMap)) {
    if (patterns.some(pattern => pattern.test(lowerText))) {
      return mood as MoodType;
    }
  }
  return 'happy';
}

async function generateConversationalResponse(mood: MoodType): Promise<string> {
  try {
    const prompt = `<s>[INST] <<SYS>>
You are a compassionate music assistant. Acknowledge the user's ${mood} mood with empathy, 
then naturally transition to music suggestions. Keep responses under 2 sentences. Be warm and encouraging.
<</SYS>>

User is feeling ${mood}. Generate an appropriate response that:
1. Validates their emotion
2. Shows understanding
3. Introduces music recommendations smoothly[/INST]</s>`;

    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 80,
        temperature: 0.85,
        repetition_penalty: 1.15,
        top_p: 0.95,
        do_sample: true
      }
    });

    let generated = response.generated_text
      .replace(prompt, '')
      .replace(/<\/?s>/g, '')
      .replace(/<\/?INST>/g, '')
      .trim();

    return generated || `I understand feeling ${mood}. Let's find the perfect music to match your mood.`;
  } catch (error) {
    console.error('Conversation generation failed:', error);
    return `I want to find the best ${mood} music for you. Let's explore some playlists!`;
  }
}

export async function processUserMessage(text: string) {
  try {
    const detectedMood = await detectEmotion(text);
    const [playlists, botResponse] = await Promise.all([
      fetchPlaylists(detectedMood),
      generateConversationalResponse(detectedMood)
    ]);
    
    if (playlists.length === 0) {
      throw new Error('No playlists found');
    }

    return { 
      detectedMood, 
      playlists,
      botResponse
    };
  } catch (error) {
    console.error('Processing failed:', error);
    throw new Error('Failed to process message. Please try again.');
  }
}


export const getCurrentlyPlayingTrackId = async (): Promise<string | null> => {
  try {
    let accessToken = localStorage.getItem('spotify_access_token');
    if (checkTokenExpiration()) accessToken = await refreshToken();

    const response = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    const isPlaying = response.data.item;
  console.log('Current track ', isPlaying);
    return response.data?.item?.id || null;
    
  } catch (error) {
    console.error('Error fetching current track:', error);
    return null;
  }
};


export const getTrackRecommendations = async (trackId: string): Promise<Playlist[]> => {
  try {
   
    const reccoResponse = await axios.get(
      'https://api.reccobeats.com/v1/track/recommendation',
      {
        params: { seeds: trackId, size: 10 },
        headers: { Accept: `application/json` }
      }
    );

    console.log('ReccoBeats raw response:', reccoResponse.data);

  
    const recommendations = reccoResponse.data.content.map((item: any) => {
      try {
        const url = new URL(item.href);
        const pathParts = url.pathname.split('/');
        const spotifyId = pathParts[pathParts.indexOf('track') + 1];
        
        // Validate ID format
        if (!spotifyId || !/^[a-zA-Z0-9]{22}$/.test(spotifyId)) {
          console.warn('Invalid Spotify ID:', spotifyId, 'in item:', item);
          return null;
        }
        
        return { ...item, spotifyId };
      } catch (error) {
        console.warn('Error processing href:', item.href, error);
        return null;
      }
    }).filter(Boolean);

    if (recommendations.length === 0) {
      throw new Error('No valid Spotify track IDs found in recommendations');
    }

    const spotifyIds = recommendations.map((item: any) => item.spotifyId);
    const spotifyResponse = await axios.get(
      'https://api.spotify.com/v1/tracks',
      {
        params: { ids: spotifyIds.join(','), market: 'US' },
        headers: { Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}` }
      }
    );

    console.log('Spotify response:', spotifyResponse.data);

    const spotifyTracksMap = new Map(
      spotifyResponse.data.tracks.map((track: any) => [track.id, track])
    );

   
    return recommendations.map((reccoTrack: any) => {
      const spotifyTrack = spotifyTracksMap.get(reccoTrack.spotifyId) || {};
      
      return {
        id: reccoTrack.spotifyId,
        name: spotifyTrack.name || reccoTrack.trackTitle,
        description: spotifyTrack.artists?.[0]?.name || reccoTrack.artists?.[0]?.name || 'Various Artists',
        image: spotifyTrack.album?.images?.[0]?.url || '/default-track.png',
        url: spotifyTrack.external_urls?.spotify || reccoTrack.href,
        // owner: spotifyTrack.artists?.[0]?.name || reccoTrack.artists?.[0]?.name || 'Unknown Artist',
        // duration: spotifyTrack.duration_ms || 0,
        // popularity: spotifyTrack.popularity || 0
      };
    });

  } catch (error) {
    console.error('Recommendation error:', error);
    throw new Error(`Failed to get recommendations: ${
      axios.isAxiosError(error) 
        ? error.response?.data?.error?.message || error.message 
        : error instanceof Error ? error.message : 'Unknown error'
    }`);
  }
};

export const getCurrentTrackRecommendations = async () => {
  const trackId = await getCurrentlyPlayingTrackId();
  if (!trackId) throw new Error('No track currently playing');
  return getTrackRecommendations(trackId);
};



// const fetchAudioFeatures = async (trackId: string) => {
//   const response = await axios.post(
//     'https://api.reccobeats.com/v1/analyze',
//     { track_id: trackId },
//     { headers: { Accept: `application/json` } }
//   );
//   return response.data.features; // { energy: 0.75, tempo: 115, ... }
// };



// fetchAudioFeatures()