// components/AdBlockDetection.js
'use client'
import React, { useEffect, useState } from 'react';

const AdBlockDetection = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [btnText, setBtnText] = useState("Maybe Later");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Detect ad blocker after page load
    const detectAdBlock = async () => {
      await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        { method: "HEAD", mode: "no-cors", cache: "no-store" })
        .then(res => setAdBlockDetected(false))
        .catch(res => setAdBlockDetected(true));
    };

    window.document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        detectAdBlock();
      }
    }

  }, []);

  const handleMouseOver = () => {
    if (!isHovered) {
      setBtnText('NO....😭');
      setIsHovered(true);
    }
  };

  const handleMouseOut = () => {
    if (isHovered) {
      setBtnText('Maybe Later');
      setIsHovered(false);
    }
  };

const support=(isSupport)=>{
  if (isSupport) {
    window.location.reload();
  } else {
    setAdBlockDetected(false);
  }

};


  return (
    <>
      {adBlockDetected && (
        <>
          <div
            className="mx-auto fixed ml-3 bottom-4 right-4 z-50 p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg text-white animate-slide-up"
            style={{ animationDuration: "300ms" }}
          >
            <div className="text-base font-sens">
            🍪 Hi there! We noticed you&apos;re using an ad blocker. Cookies help us bring you an even better experience. Would you consider turning it off? 💖
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-400 transition-all"
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut}
                onClick={()=>support(false)}
              >
                {btnText}
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:to-green-500 hover:from-rose-500 hover:bg-gradient-to-r hover: transition-all transform transition-transform hover:scale-110 active:scale-95" 
                 onClick={()=>support(true)}>
                I&apos;ll Support!
              </button>
            </div>
          </div>

          <style jsx>
            {`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      
        .animate-slide-up {
          animation: slide-up 300ms ease-out;
        }
      `}
          </style>
        </>
      )}
    </>
  );
};

export default AdBlockDetection;





