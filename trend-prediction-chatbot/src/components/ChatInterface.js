'use client';

import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TrendChart from './TrendChart';

const ChatInterface = ({ companyContext, suggestedQuestions }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: 'Hello! I can help predict business trends based on public data. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          companyContext
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.message,
        chartData: data.chartData
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <MessageBubble message={message} />
            {message.chartData && <TrendChart data={message.chartData} />}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center p-4">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex border-t border-gray-200 p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about future business trends..."
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors" 
          disabled={isLoading}
        >
          Send
        </button>
      </form>
      
      <div className="p-2 border-t border-gray-200 flex flex-wrap gap-2">
        {suggestedQuestions?.slice(0, 2).map((q, i) => (
          <button 
            key={i}
            onClick={() => handleSubmit({ preventDefault: () => {}, target: {} })}
            className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1"
          >
            {q.split(' ').slice(0, 4).join(' ')}...
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;