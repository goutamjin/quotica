import React, { useState, useEffect } from 'react';

const CardWithLabels = ({ quote , model}) => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const data = await model.predictTop3Categories(quote, false);
       
        
        const formattedLabels = data.map(label => label.charAt(0).toUpperCase() + label.slice(1));
        setLabels(formattedLabels);
      } catch (error) {
        console.error('Error predicting categories:', error);
        setLabels([]);
      }
      setLoading(false);
    };

    fetchCategories();
  }, [quote, model]);


  return (
    <div className="w-11/12 mx-auto bg-white overflow-hidden flex p-1">
      <div className="flex flex-wrap p-1 gap-1 justify-start max-w-xs">
        {loading ? (
        <div className='flex space-x-1 bg-white h-4 dark:invert'>
        
         <div className='h-1.5 w-1.5 bg-green-800 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
       <div className='h-1.5 w-1.5  bg-green-800 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
       <div className='h-1.5 w-1.5  bg-green-800 rounded-full animate-bounce'></div>
       <span className='sr-only'>Loading...</span>
     </div>
      ) : (
          labels.map((label, index) => (
            <span
              key={index}
              className="m-1.5 shadow-sm mt-0 mx-1 inline-block bg-gray-100 text-cyan-600 hover:underline cursor-pointer px-2 py-0.5 rounded-full text-xs font-roboto"
            >
              {label}
            </span>
          ))
        )}
      </div>
      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: .675rem;
          height: .675rem;
        }
        .dot-flashing::before, .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
          width: .675rem;
          height: .675rem;
          border-radius: 50%;
          background-color: #00bcd4;
          animation: dot-flashing 1s infinite linear alternate;
        }
        .dot-flashing::before {
          left: -1.5rem;
          animation-delay: 0.2s;
        }
        .dot-flashing::after {
          left: 1.5rem;
          animation-delay: 0.4s;
        }
        @keyframes dot-flashing {
          0% { background-color: #00bcd4; }
          50%, 100% { background-color: rgba(0, 188, 212, 0.2); }
        }
      `}</style>
    </div>
  );
};

export default CardWithLabels;
