
import { Track } from '../types/chat';
import { MoodType } from '../components/MoodBubble';
import { detectMood } from '../lib/moodDetection';

// Sample tracks data
export const sampleTracks: Track[] = [
  {
    id: '1',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273a6e7a25c6b3d5294c0f356bd',
  },
  {
    id: '2',
    name: 'good 4 u',
    artist: 'Olivia Rodrigo',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273e472a5f4f4eaf20985d3b45a',
  },
  {
    id: '3',
    name: 'Levitating',
    artist: 'Dua Lipa',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946',
  },
  {
    id: '4',
    name: 'As It Was',
    artist: 'Harry Styles',
    albumArt: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14',
  },
];

export const getRecommendedTracks = (count: number = 3): Track[] => {
  // Get random tracks for demonstration
  const shuffledTracks = [...sampleTracks].sort(() => 0.5 - Math.random());
  return shuffledTracks.slice(0, count);
};

export const moods: MoodType[] = ['happy', 'sad', 'energetic', 'calm', 'focus'];

export const processUserMessage = async (message: string): Promise<{
  detectedMood: MoodType;
  recommendedTracks: Track[];
}> => {
  // Detect mood from message
  const detectedMood = await detectMood(message);
  
  // Get recommended tracks
  const recommendedTracks = getRecommendedTracks();
  
  return { detectedMood, recommendedTracks };
};
