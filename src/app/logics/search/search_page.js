import React, { useState, useEffect } from 'react';
import QuoteCard from '../../components/qoute';
import { useAuth } from '../firebase/auth_manage';
import { fetchLikedData } from '../firebase/like/fetchLikes_local';
import { useCategoryPredictor } from '../ai/predict';
import PullToRefreshCom from '../../components/PullToRefresh';
import { filterQuotesUntilThreshold } from './search_filter';

const PENALTY_THRESHOLD = 50;  // Threshold for penalty points

export default function PageSearch({ search }) {
  const [quoteCards, setQuoteCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedQuoteHashes, setLoadedQuoteHashes] = useState(new Set()); // Track loaded quotes
  const [userID, setUserID] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  // AI model weight
  const modelWeight = useCategoryPredictor();

  // Penalty points for this search term
  const [penaltyPoints, setPenaltyPoints] = useState(0);
  const [noMoreQuotes, setNoMoreQuotes] = useState(false);  // State for no more quotes

  // Call useAuth at the top level
  const { isLogin, uid } = useAuth(() => {}) || {};

  // Handle user login and fetch liked data
  useEffect(() => {
    if (isLogin && uid) {
      fetchLikedData(uid);
      setUserID(uid); // Set the user ID for further use
    }
  }, [isLogin, uid]);

  // Handle new search requests
  useEffect(() => {
    if (search) {
      resetState();
      fetchQuotes(true, search);
    }
  }, [search]);

  // Function to reset state for a new search
  const resetState = () => {
    setQuoteCards([]);  // Clear quotes
    setLoadedQuoteHashes(new Set());  // Clear loaded hashes
    setError(null);  // Reset error
    setTriggerRefresh(0);  // Reset refresh trigger
    setPenaltyPoints(0);  // Reset penalty points
    setNoMoreQuotes(false);  // Reset noMoreQuotes flag
  };

  // Function to fetch and filter quotes
  const fetchQuotes = async (isNewFetch = true, searchTerm = '') => {
    // Check penalty points before making a request
    if (penaltyPoints >= PENALTY_THRESHOLD) {
      setNoMoreQuotes(true);  // Set the flag to indicate no more quotes
      return;  // Don't make the request if penalty points are too high
    }

    setLoading(true);
    setError(null);

    try {
      const preferences = {}; // Example preferences
      const fetchCount = window.innerWidth <= 768 ? 5 : window.innerWidth <= 1024 ? 8 : 12;

      // Use helper function to fetch and filter quotes
      const { quotes, requestCount } = await filterQuotesUntilThreshold(fetchCount, preferences, loadedQuoteHashes, searchTerm, modelWeight);
     
      // Add penalty points based on the number of failed requests
      setPenaltyPoints((prevPoints) => prevPoints + requestCount);
     
      if (quotes.length > 0) {
        setQuoteCards((prevQuotes) => (isNewFetch ? quotes : [...prevQuotes, ...quotes]));
      }

    } catch (error) {
      setError('Failed to fetch quotes.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;

      if (scrollPosition >= bottomPosition - 200 && !loading && !noMoreQuotes) {
        fetchQuotes(false, search);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, search, noMoreQuotes]);

  // Trigger refresh
  useEffect(() => {
    if (triggerRefresh) {
      resetState();
      fetchQuotes(true, search);
    }
  }, [triggerRefresh]);

  // Render function
  const getReturn = () => {
    if (loading && quoteCards.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center space-y-6 py-12">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-full bg-gray-200 rounded-lg animate-pulse transform relative" style={{ maxWidth: '90%', width: '600px' }}>
              <div className="h-60 bg-gray-300 rounded w-full"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mt-4 ml-8"></div>
              <div className="h-5 bg-gray-300 rounded w-1/2 mt-3 ml-8"></div>
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
            <QuoteCard key={index} quote={quote.text} author={quote.author} userId={userID} model={modelWeight} link={quote.weblink} />
          ))
        ) : (
          <div className="text-center mt-6 mb-6 text-gray-500">
            No more quotes available for this search term.
          </div>
        )}
        {loading && (
          <div className="relative" style={{ maxWidth: '90%', width: '600px' }}>
            <div className="w-full mb-12 h-full bg-gray-200 rounded-lg animate-pulse transform relative">
              <div className="h-60 bg-gray-300 rounded w-full"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mt-4 ml-8"></div>
              <div className="h-5 bg-gray-300 rounded w-1/2 mt-3 ml-8"></div>
              <div className="h-5 bg-gray-300 rounded-full w-16 ml-10 mt-4 mb-4 inline-block"></div>
              <div className="h-5 bg-gray-300 rounded-full w-16 ml-2 mt-4 mb-4 inline-block"></div>
              <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mt-4 mb-6"></div>
              <div className="h-2 bg-gray-300 rounded w-1/4 mx-auto mt-2 absolute bottom-2 right-2"></div>
            </div>
          </div>
        )}
        {noMoreQuotes && (
          <div className="text-center mt-6 mb-6 text-gray-500">
            No more quotes available for this search term.
          </div>
        )}
      </div>
    );
  };

  return <PullToRefreshCom tiggerRef={setTriggerRefresh}>{getReturn()}</PullToRefreshCom>;
}
