import React, { useState } from 'react';
import { Message, Track } from '../types/chat';
import { MoodType } from './MoodBubble';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { MoodSelector } from './MoodSelector';
import { MusicRecommendations } from './MusicRecommendations';
import { moods, processUserMessage, getRecommendedTracks } from '../services/musicService';
import { Header } from './Header';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your music mood assistant. How are you feeling today?",
      isUser: false
      // timestamp: new Date(Date.now() - 60000),
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  
  const handleSendMessage = async (inputValue: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true
      // timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    setTimeout(async () => {
      const { detectedMood, recommendedTracks } = await processUserMessage(inputValue);
      
      setCurrentMood(detectedMood);
      setRecommendedTracks(recommendedTracks);
      
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: `I sense you're feeling ${detectedMood}. Here are some tracks that match your mood!`,
        isUser: false,
        // timestamp: new Date(),
        detectedMood,
      };
      
      setMessages(prev => [...prev, botReply]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleMoodSelection = (mood: MoodType) => {
    setCurrentMood(mood);
    
    const moodMessage: Message = {
      id: Date.now().toString(),
      text: `I'm feeling ${mood} today.`,
      isUser: true,
      // timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, moodMessage]);
    
    // Simulate processing time
    setIsLoading(true);
    setTimeout(() => {
      
      const tracks = getRecommendedTracks();
      setRecommendedTracks(tracks);
      
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great! Here are some ${mood} tracks I think you'll enjoy.`,
        isUser: false,
        // timestamp: new Date(),
        detectedMood: mood,
      };
      
      setMessages(prev => [...prev, botReply]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-r bg-black">
    <Header/>
    <div className="app-container min-h-screen rounded-3xl bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 h-full relative">
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gradient">
              Moody Agent
              <span className="ml-2 inline-flex items-center text-sm font-normal text-muted-foreground">
                Your AI Music Companion
              </span>
            </h2>
            <button 
              className="px-4 py-2 rounded-full text-sm font-medium text-primary/80 hover:text-primary 
                         hover:bg-primary/10 transition-all duration-300"
              onClick={() => setMessages([{
                id: '1',
                text: "Hello! I'm your music mood assistant. How are you feeling today?",
                isUser: false,
                // timestamp: new Date(),
              }])}
            >
              Clear Chat
            </button>
          </div>
          
          <div className="flex-1 inset-card mb-6 overflow-hidden">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
          
          <div className="mb-6">
            <MoodSelector 
              moods={moods} 
              currentMood={currentMood} 
              onMoodSelect={handleMoodSelection} 
            />
          </div>
          
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
        
        <div className="md:w-[380px] lg:w-[420px]">
          <MusicRecommendations 
            tracks={recommendedTracks} 
            currentMood={currentMood} 
          />
        </div>
      </div>
    </div>
  </div>
  );
};
