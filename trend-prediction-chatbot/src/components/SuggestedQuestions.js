'use client';

const SuggestedQuestions = ({ questions, onQuestionClick }) => {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Suggested Questions</h3>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li 
            key={index} 
            className="p-3 mb-2 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-md transition-colors"
            onClick={() => onQuestionClick(question)}
          >
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedQuestions;