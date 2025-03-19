'use client';

import { useRef, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import TrendChart from './TrendChart';

const ChatInterface = ({ suggestedQuestions, chatHistory, onSendMessage, isLoading, input, setInput }) => {
  const messagesEndRef = useRef()

  // Scroll to the bottom of the chat area
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll whenever chatHistory changes
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-[600px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4">
      {chatHistory.map((message, index) => (
        <div key={index} className="mb-4">
          <MessageBubble message={message} />
          {message.chartData && <TrendChart data={message.chartData} />}
        </div>
      ))}

      </div>

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

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form's default behavior
          onSendMessage(); // Call the send message function explicitly
        }}
        className="flex border-t border-gray-200 p-4"
      >
        <input
          type="text"
          value={input} // Controlled input value
          onChange={(e) => setInput(e.target.value)} // Only update local state
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

      {/* Suggested Questions */}
      <div className="p-2 border-t border-gray-200 flex flex-wrap gap-2">
        {suggestedQuestions?.map((q, i) => (
          <button
            key={i}
            onClick={() => setInput(q)} // Update input without sending immediately
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