
import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-xl" style={{ maxHeight: '400px' }}>
      <div className="space-y-4">
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            text={message.text}
            isUser={message.isUser}
            detectedMood={message.detectedMood}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white/20 dark:bg-black/20 p-3 rounded-xl rounded-tl-none flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
              <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
              <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
