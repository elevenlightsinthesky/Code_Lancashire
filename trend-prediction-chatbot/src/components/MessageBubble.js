'use client';

const MessageBubble = ({ message }) => {
  const { role, content } = message;
  
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {role === 'bot' && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 mr-2">
          🤖
        </div>
      )}
      
      <div className={role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
        {content}
      </div>
      
      {role === 'user' && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 ml-2">
          👤
        </div>
      )}
    </div>
  );
};

export default MessageBubble;