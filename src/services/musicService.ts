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

/** @deprecated Fallback method */
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

    // Clean up the response
    let generated = response.generated_text
      .replace(prompt, '')
      .replace(/<\/?s>/g, '')
      .replace(/<\/?INST>/g, '')
      .trim();

    // Fallback if empty
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