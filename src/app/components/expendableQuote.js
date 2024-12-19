import React, { useState } from 'react';

const ExpendableQuote = ({ quote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 200; // Define the maximum length of the quote to display initially

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <blockquote className="text-lg font-semibold text-gray-800 ">
        &quot;
        {isExpanded ? quote : `${quote.substring(0, MAX_LENGTH)}${quote.length > MAX_LENGTH ? '...' : ''}`}
        &quot;
      {quote.length > MAX_LENGTH && (
        <button
          onClick={toggleExpansion}
          className="text-blue-500 ml-2 text-xs inline-block hover:text-blue-700 hover:underline active:text-blue-900"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      </blockquote>
  
    </div>
  );
};

export default ExpendableQuote;
