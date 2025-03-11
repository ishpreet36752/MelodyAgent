
import { MoodType } from '../components/MoodBubble';

export const detectMood = async (text: string): Promise<MoodType> => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('happy') || 
      lowerText.includes('joy') || 
      lowerText.includes('great') ||
      lowerText.includes('excited')) {
    return 'happy';
  }
  
  if (lowerText.includes('sad') || 
      lowerText.includes('upset') || 
      lowerText.includes('depressed') ||
      lowerText.includes('down')) {
    return 'sad';
  }
  
  if (lowerText.includes('energetic') || 
      lowerText.includes('hyper') || 
      lowerText.includes('pumped') ||
      lowerText.includes('workout')) {
    return 'energetic';
  }
  
  if (lowerText.includes('calm') || 
      lowerText.includes('relax') || 
      lowerText.includes('peaceful') ||
      lowerText.includes('chill')) {
    return 'calm';
  }
  
  if (lowerText.includes('focus') || 
      lowerText.includes('concentrate') || 
      lowerText.includes('study') ||
      lowerText.includes('work')) {
    return 'focus';
  }
  const moods: MoodType[] = ['happy', 'sad', 'energetic', 'calm', 'focus'];
  return moods[Math.floor(Math.random() * moods.length)];
};
