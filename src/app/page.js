'use client';
import React, { useState, useEffect } from "react";
import QuoteCard from "./components/qoute";
import mainHandler from "./logics/MainHandler";
import { useAuth } from "./logics/firebase/auth_manage";
import { generateShortHash } from "./logics/quote_id_gene";
import { fetchLikedData } from "./logics/firebase/like/fetchLikes_local";
import { useCategoryPredictor } from "./logics/ai/predict";
import PullToRefreshCom from "./components/PullToRefresh";
import BoxCardGrid from "./components/categories";

export default function Page() {
  const [quoteCards, setQuoteCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedQuoteHashes, setLoadedQuoteHashes] = useState(new Set()); // To track already loaded quotes
  const [userID, setUserID] = useState(null);

// for refrshing
const [triggerRefresh, setTriggerRefresh] = useState(0);



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
 





// Add useEffect to handle the refresh trigger
useEffect(() => {
  if (triggerRefresh) {
    console.log("tiggered");
    setQuoteCards([]);  // Empty the quoteCards array
    fetchQuotes(true);
  }
}, [triggerRefresh]);






  useEffect(() => {
    console.log("refreshed");
    fetchQuotes(true);  // Fetch new quotes for first time
  }, []);



  const modelWeight=  useCategoryPredictor();
 function getReturn(){
  if (loading && quoteCards.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center space-y-6 py-12">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-full bg-gray-200 rounded-lg animate-pulse transform relative"
            style={{
              maxWidth: '90%', // Ensures the card doesn't exceed 90% of screen width
              width: '600px',
            }}
          >
            <div className="h-60 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4  mt-4 ml-8"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2  mt-3 ml-8"></div>

            <div className="h-5 bg-gray-300 rounded-full w-16 ml-10 mt-4 mb-4 inline-block"></div>
            <div className="h-5 bg-gray-300 rounded-full w-16 ml-2 mt-4 mb-4 inline-block"></div>

            <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mt-4 mb-6"></div>
            <div className="h-2 bg-gray-300 rounded w-1/4 mx-auto mt-2 absolute bottom-2 right-2"></div>
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
          <QuoteCard key={index} quote={quote.text} author={quote.author} userId={userID} model={modelWeight} link={quote.weblink}/>
        ))
      ) : (
        <p>Im trying...</p>
      )}

      {loading && (
        <div className={`${(window.innerWidth >= 1024? " pr-12 ":window.innerWidth >= 768? " pr-4 ":" pr-4 ")} relative`}
        style={{
          maxWidth: '90%', // Ensures the card doesn't exceed 90% of screen width
          width: '600px',
        }}
        >
        <div 
        className=" w-full mb-12 h-full bg-gray-200 rounded-lg animate-pulse transform relative"
      >
        
        <div className="h-60 bg-gray-300 rounded w-full"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4  mt-4 ml-8"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2  mt-3 ml-8"></div>

        <div className="h-5 bg-gray-300 rounded-full w-16 ml-10 mt-4 mb-4 inline-block"></div>
        <div className="h-5 bg-gray-300 rounded-full w-16 ml-2 mt-4 mb-4 inline-block"></div>

        <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mt-4 mb-6"></div>
        <div className="h-2 bg-gray-300 rounded w-1/4 mx-auto mt-2 absolute bottom-2 right-2"></div>
      </div>
      </div>
   )}
    </div>

  );
 }






return (
       
  <PullToRefreshCom tiggerRef={setTriggerRefresh}>
  <BoxCardGrid />
  {getReturn()}
  </PullToRefreshCom>

);

}
