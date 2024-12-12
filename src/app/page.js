'use client';
import React, { useState, useEffect } from "react";
import QuoteCard from "./components/qoute";
import mainHandler from "./logics/MainHandler";
import { useAuth } from "./logics/firebase/auth_manage";
import { generateShortHash } from "./logics/quote_id_gene";
import { fetchLikedData } from "./logics/firebase/like/fetchLikes_local";

export default function Page() {
  const [quoteCards, setQuoteCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedQuoteHashes, setLoadedQuoteHashes] = useState(new Set()); // To track already loaded quotes
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserID(localStorage.getItem("firebase_uid"));
    }
  }, []);

  useAuth((islogin, uid) => {
    if (islogin) {
      fetchLikedData(uid);
    }
  });
  
  // Function to fetch quotes
  const fetchQuotes = async (isNewFetch = true) => {
    setLoading(true);
    setError(null);

    try {
      const preferences = {}; // Example preferences
      const fetch_count = window.innerWidth <= 768 ? 5 : window.innerWidth <= 1024 ? 8 : 12;
      const quotes = await mainHandler(fetch_count, preferences); // Request more quotes

      // Filter out any quotes that have already been loaded
      const newQuotes = quotes.filter((quote) => {
        const quoteHash = generateShortHash(quote.text); // Create a unique hash for the quote
        
        if (!loadedQuoteHashes.has(quoteHash)) {
          loadedQuoteHashes.add(quoteHash);
          return true;
        }
        return false;
      });

      if (newQuotes.length > 0) {
        // Append new quotes to the existing ones without refreshing old quotes
        if (isNewFetch) {
          setQuoteCards((prevQuotes) => [...prevQuotes, ...newQuotes]); // Append new quotes to the existing ones
        }
      }
    } catch (error) {
      setError("Failed to fetch quotes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;

      // Fetch more quotes when scrolling near the bottom
      if (scrollPosition >= bottomPosition - 200) {
        if (!loading) {
          fetchQuotes(true); // Fetch new quotes when near bottom
        }
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Only run this when loading changes

  useEffect(() => {
    // Initial fetch of quotes when the component is mounted
    fetchQuotes(true);
  }, []);

  if (loading && quoteCards.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center space-y-6 py-12">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-4/5 sm:4/5 md:w-8/12 lg:w-8/12 h-60 md:h-80 lg:h-80 sm:h-56 bg-gray-200 rounded-lg animate-pulse transform relative"
          >
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mt-6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mt-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-3 absolute left-12"></div>
            <div className="h-2 bg-gray-300 rounded w-1/3 absolute bottom-4 right-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center space-x-4 space-y-4">
      {quoteCards.length > 0 ? (
        quoteCards.map((quote, index) => (
          <QuoteCard key={index} quote={quote.text} author={quote.author} userId={userID} />
        ))
      ) : (
        <p>No quotes available.</p>
      )}

      {loading && (
        <div className="flex justify-center items-center w-full py-12">
          {/* Loading skeleton */}
          <div className="w-4/5 sm:4/5 md:w-8/12 lg:w-8/12 overflow-hidden h-60 md:h-80 lg:h-80 sm:h-56 bg-gray-200 rounded-lg animate-pulse transform relative">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mt-6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mt-3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-3 absolute left-12"></div>
            <div className="h-2 bg-gray-300 rounded w-1/3 absolute bottom-4 right-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}
