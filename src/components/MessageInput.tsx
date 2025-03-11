
import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Tell me how you're feeling..."
        className="input-field w-full pr-12"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-primary transition-colors disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
    </form>
  );
};
