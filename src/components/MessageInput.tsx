
import React, { useState } from 'react';
import { Send } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="relative flex justify-center">
      <div className="w-[60%] relative flex items-center bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl hover:border-gray-600 transition-colors focus-within:border-gray-500">
        <textarea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Tell me how you're feeling..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-6 py-4 pr-16 resize-none outline-none min-h-[56px] max-h-32 overflow-y-auto"
          disabled={isLoading}
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#374151 transparent'
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="absolute right-3 p-2 rounded-xl bg-white text-black hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 shadow-lg"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};
