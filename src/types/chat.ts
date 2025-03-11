
import { MoodType } from '../components/MoodBubble';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  detectedMood?: MoodType;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
}
