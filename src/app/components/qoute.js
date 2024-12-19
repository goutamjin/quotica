'use client';

import { useEffect, useRef, useState } from 'react';
import ShareLike from './sharelike';
import QuoteImage from './QuoteImage';
import CardWithLabels from './labels';
import LabelOrignal from './label_orignal';
import { fixed_author_name } from '../logics/other/fixedData';
import ExpendableQuote from './expendableQuote';
// Replace with your actual placeholder image path

const QuoteCard = ({ quote, author, userId, model , link}) => {
  const [inView, setInView] = useState(false);

  const cardRef = useRef(null);
  
  author=(author=="null"||!author)? fixed_author_name:author;


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);


  // to load image
  const quote_img = QuoteImage({ quote, author });






  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        maxWidth: '90%', // Ensures the card doesn't exceed 90% of screen width
        width: '600px', // Fixed width for desktop
        margin: '20px auto', // Centered vertically and horizontally
      }}
    >
      {/* Image Section */}
      <div className="w-full h-60 md:h-80 lg:h-80 sm:h-56 relative bg-gray-300 overflow-hidden">
        {quote_img.Image}
      </div>

      {/* Quote Content */}
      <div className="p-4 text-center">
        <ExpendableQuote quote={quote}/>
        <div className="mt-2 text-sm font-medium text-gray-600">— {author}</div>
      </div>

      {/* Categories */}
      <div className='w-full '>
        <CardWithLabels quote={quote} model={model} />
      </div>

      {/* Social Media Buttons */}
      <div className="flex justify-center items-center gap-4 my-4 relative bottom-0">
        <ShareLike quote={quote} author={author} userId={userId} canvasRef={quote_img.downloadCanvas} />
      </div>


      {/* Open orignal web link */}
      <LabelOrignal link={link}/>


    </div>

  );
};
export const getImageSize = () => {
  const width = window.innerWidth;

  if (width >= 1024) {
    return { width: 1600, height: 900 }; // Desktop size
  } else if (width >= 768) {
    return { width: 1200, height: 675 }; // Tablet size
  } else {
    return { width: 600, height: 337 }; // Mobile size
  }
};


export default QuoteCard;
