'use client'
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollDuration = 500; // Adjust duration (in ms)
    const scrollStep = window.scrollY / (scrollDuration / 16); // Calculate step for 60 FPS

    const smoothScroll = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, -scrollStep); // Scroll by step
        requestAnimationFrame(smoothScroll); // Keep animating
      }
    };

    requestAnimationFrame(smoothScroll);
  };

  return (
    <div
      className={`z-30 fixed bottom-5 right-5 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-transform duration-200 hover:scale-110 focus:outline-none"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
