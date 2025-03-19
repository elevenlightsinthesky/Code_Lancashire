'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import SuggestedQuestions from '../components/SuggestedQuestions';

export default function Home() {
  const [companyContext, setCompanyContext] = useState({
    industry: 'Technology',
    location: 'London',
    size: 'Medium',
  });

  const [chatHistory, setChatHistory] = useState([
    {
      role: 'bot',
      content: 'Hello! I can help predict business trends based on public data. What would you like to know?'
    }
  ]);  
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "How will population trends affect technology recruitment in London by 2027?",
    "What skills will be in highest demand in the tech sector over the next 5 years?",
    "Which UK regions should we consider for expansion based on workforce availability?",
    "What age demographic changes will impact our hiring pool by 2028?",
  ];

  const handleQuestionClick = async (question) => {
    console.log("handleQuestionClick triggered with question:", question); // Check if function is triggered
    setChatInput(question); // Populate the input field
    console.log("Updated chatInput to:", question); // Confirm chatInput is updated
    await handleSendMessage(question); // Call handleSendMessage
  };
  
  const handleSendMessage = async (input = chatInput) => {
    if (!input.trim()) return;
  
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: 'user', content: input }
    ]);
  
    setIsLoading(true); // Set loading to true
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          companyContext,
        }),
      });
  
      const data = await response.json();
  
      console.log("API Response:", data); // log entire backend response 
      console.log("Passing chartData to chatHistory:", data.chartData);

      if (response.ok) {
        // Check if the response already exists in chatHistory before appending
        setChatHistory((prevChatHistory) => {
          const isDuplicate = prevChatHistory.some(
            (message) => message.content === data.message && message.role === 'bot'
          );
          if (!isDuplicate) {
            return [
              ...prevChatHistory,
              { role: 'bot', content: data.message, chartData: data.chartData }
            ];
          }
          return prevChatHistory; // Don't append duplicate
        });
      } else {
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { role: 'bot', content: 'Sorry, I encountered an issue with your request.' }
        ]);
      }
    } catch (error) {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: 'bot', content: 'Sorry, I encountered a network error.' }
      ]);
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset loading to false
    }
  };  

  return (
    <div className="container mx-auto px-4">
      <main className="flex min-h-screen flex-col items-center py-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Business Trends Predictor
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-8">
          Ask questions about future business trends based on public data
        </p>

        <div className="w-full bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">Company Context</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label id="industryLabel" htmlFor="industry" className="block mb-2 font-medium">Industry:</label>
              <select 
                id="industry" 
                aria-labelledby="industryLabel" // accesibility for screen readers
                className="w-full p-2 border border-gray-300 rounded-md"
                value={companyContext.industry}
                onChange={(e) => setCompanyContext({...companyContext, industry: e.target.value})}
              >
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
            
            <div>
              <label id="locationLabel" htmlFor="location" className="block mb-2 font-medium">Location:</label>
              <select 
                id="location" 
                aria-labelledby="locationLabel"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={companyContext.location}
                onChange={(e) => setCompanyContext({...companyContext, location: e.target.value})}
              >
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Birmingham">Birmingham</option>
                <option value="Edinburgh">Edinburgh</option>
              </select>
            </div>
            
            <div>
              <label id="sizeLabel" htmlFor="size" className="block mb-2 font-medium">Company Size:</label>
              <select 
                id="size" 
                aria-labelledby="sizeLabel"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={companyContext.size}
                onChange={(e) => setCompanyContext({...companyContext, size: e.target.value})}
              >
                <option value="Small">Small (1-49)</option>
                <option value="Medium">Medium (50-249)</option>
                <option value="Large">Large (250+)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="md:col-span-1">
            <SuggestedQuestions 
              questions={suggestedQuestions} 
              onQuestionClick={handleQuestionClick}
            />
          </div>
          <div className="md:col-span-2">
          <ChatInterface
            suggestedQuestions={suggestedQuestions}
            chatHistory={chatHistory} // Pass chatHistory state
            onSendMessage={() => handleSendMessage()} // Trigger handleSendMessage explicitly
            input={chatInput} // Controlled input value
            setInput={setChatInput} // Update input
            isLoading={isLoading} // Pass loading state
          />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center border-t mt-12">
        <p className="text-gray-600">Powered by public data sources</p>
      </footer>
    </div>
  );
}