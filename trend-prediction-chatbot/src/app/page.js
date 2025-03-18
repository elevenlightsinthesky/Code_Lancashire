'use client';

import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import SuggestedQuestions from '../components/SuggestedQuestions';

export default function Home() {
  const [companyContext, setCompanyContext] = useState({
    industry: 'Technology',
    location: 'London',
    size: 'Medium'
  });
  
  const suggestedQuestions = [
    "How will population trends affect technology recruitment in London by 2027?",
    "What skills will be in highest demand in the tech sector over the next 5 years?",
    "Which UK regions should we consider for expansion based on workforce availability?",
    "What age demographic changes will impact our hiring pool by 2028?"
  ];

  const handleQuestionClick = (question) => {
    // This will be passed to the ChatInterface component
    console.log("Question clicked:", question);
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
              <label htmlFor="industry" className="block mb-2 font-medium">Industry:</label>
              <select 
                id="industry" 
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
              <label htmlFor="location" className="block mb-2 font-medium">Location:</label>
              <select 
                id="location" 
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
              <label htmlFor="size" className="block mb-2 font-medium">Company Size:</label>
              <select 
                id="size" 
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
              companyContext={companyContext}
              suggestedQuestions={suggestedQuestions}
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