'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const BoxCardGrid = () => {
  const data = [
    { img: '/images/morning.png', text: 'Morning' },
    { img: '/images/love.png', text: 'Love' },
    { img: '/images/motivational.png', text: 'Motivational' },
    { img: '/images/life.png', text: 'Life' },
    { img: '/images/sad.png', text: 'Sad' },
    { img: '/images/happiness.png', text: 'Happiness' },
    // Add more items
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {loading ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4 animate-pulse">
          {Array(12) // Temporary skeleton boxes
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 w-full h-32 rounded-lg shadow-md"
              ></div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer relative group bg-white w-full h-32 sm:h-32 md:h-40 lg:h-48 xl:h-56 shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
              {/* Image with Dark Overlay */}
              <div className="relative w-full h-full">
                <Image
                  src={item.img}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         25vw"
                  className="transition duration-300 group-hover:brightness-50"
                />
              </div>
              {/* Hidden Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center text-sm py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* this is show more button */}
   
        <div className="relative w-full  mx-auto ">
            <style jsx>{`
                .fog-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
                    pointer-events: none;
                    box-shadow: 0 0 30px 40px rgba(255, 255, 255, 0.9);
                    opacity: .9;
                }

                .fog-effect::after {
                    content: '';
                    position: absolute;
                    top: -10px;
                    left: -20px;
                    right: -20px;
                    bottom: -20px;
                    background: url('path-to-fog-texture.png') repeat center center / cover;
                    opacity: .5;
                    animation: moveFog 30s linear infinite;
                }

                @keyframes moveFog {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(200px);
                    }
                }
            `}</style>
            <div className="fog-effect">
        </div>

        <div className="z-20 relative bg-transparent flex justify-center items-center w-full max-w-2xl mx-auto" style={{ top: "-10px" }}>
          <button className="font-semibold text-slate-900 mx-2 px-3 py-1 border border-green-500 text-xs rounded-full text-green-500 hover:bg-green-100 transform transition-transform hover:scale-110 active:scale-95">
            Show More
          </button>
        </div>

      </div>



    </div>
  );
};

export default BoxCardGrid;
