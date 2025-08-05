import React, { useState } from 'react';
import { Send, Mic, Settings2 } from 'lucide-react';
import StarBorder from '@/ui/StarBorder';

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
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center items-center py-2 "
    >
      <StarBorder
        as="div"
        className="w-full max-w-3xl"
        color="magenta"
        speed="6s"
        thickness={3}
      >
        <div className="flex items-center bg-transparent px-2 py-1">
          {/* Textarea */}
          <textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Tell me how you're feeling..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-5 resize-none outline-none min-h-[66px] max-h-32"
            disabled={isLoading}
            rows={1}
            onKeyDown={e => {
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
          {/* Tools */}
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-800 transition text-gray-400 text-sm font-medium"
            tabIndex={-1}
          >
            <Settings2 size={16} />
            Moods
          </button>
          {/* Microphone */}
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-800 transition text-gray-400"
            tabIndex={-1}
          >
            <Mic size={20} />
          </button>
          {/* Send */}
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-black hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-1"
          >
            <Send size={18} />
          </button>
        </div>
      </StarBorder>
    </form>
  );
};
