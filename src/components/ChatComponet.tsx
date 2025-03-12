
import { useState } from 'react';
import { generatePlaylist } from '../services/api';

const ChatComponent = () => {
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    try {
      // Get Spotify access token from your auth system
      const accessToken = localStorage.getItem('spotify_access_token');
      
      // Generate playlist
      const response = await generatePlaylist(input, accessToken);
      
      // Add system response
      setMessages(prev => [
        ...prev,
        { 
          text: `Here's your playlist: ${response.playlist.url}`,
          isUser: false
        }
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Error generating playlist', isUser: false }]);
    }
    
    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="chat-container">
      
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;