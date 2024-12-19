'use client'
import Fuse from 'fuse.js'; // Import Fuse.js
import { generateShortHash } from "../quote_id_gene";
import searchHandler from './searchHandler';

// Fuzzy match function using Fuse.js
const fuseMatch = (text, term) => {
  if (!text || !term) return false;
  const fuse = new Fuse([text], {
    includeScore: true,
    threshold: 0.45, // Adjust sensitivity (lower is stricter)
    useExtendedSearch: true,
  });
  const result = fuse.search(term);
  return result.length > 0; // Return true if a match is found
};

export const filterQuotesUntilThreshold = async (fetchCount, preferences, loadedQuoteHashes, searchTerm, model) => {
  let filteredQuotes = [];
  let requestCount = 0; // Variable to count requests
  const maxIterations = 20; // Max attempts to fetch quotes
  let iterations = 0;

  preferences = { lang: (/[\u0900-\u097F]/.test(searchTerm) ? "hi" : "en") };

  while (filteredQuotes.length < fetchCount && iterations < maxIterations) {
    iterations++;
    try {
      // Fetch raw quotes
      const quotes = await searchHandler(fetchCount, preferences, searchTerm);
      requestCount++; // Increase request count for each fetch

      // Lightweight pre-filtering: uniqueness and basic text match
      const preFilteredQuotes = quotes.filter((quote) => {
        const quoteHash = generateShortHash(quote.text);
        if (!loadedQuoteHashes.has(quoteHash)) {
          loadedQuoteHashes.add(quoteHash);
          return true;
        }
        return false;
      });

      // Batch predict categories
      const texts = preFilteredQuotes.map((quote) => quote.text);
      const predictions = await model.predictTop3CategoriesBatch(texts, 'en'); // Batch prediction

      // Calculate match points for text and categories
      const scoredQuotes = preFilteredQuotes.map((quote, index) => {
        const predictedCategories = predictions[index];
        let points = 0;

        // Check if search term matches quote text
        if (searchTerm && fuseMatch(quote.text, searchTerm)) {
          points += 5; // Higher weight for direct match in text
        }

        // Check if search term matches predicted categories
        if (predictedCategories.some((category) => fuseMatch(category, searchTerm))) {
          points += 5; // Lower weight for category match
        }

        return { ...quote, matchPoints: points };
      });

      // Filter out quotes with 0 points, sort by match points
      const relevantQuotes = scoredQuotes
        .filter((quote) => quote.matchPoints > 0)
        .sort((a, b) => b.matchPoints - a.matchPoints);

      // Add to filtered list
      filteredQuotes = [...filteredQuotes, ...relevantQuotes];

      // Stop early if we have enough quotes
      if (filteredQuotes.length >= fetchCount) break;

    } catch (error) {
      console.error('Error during filtering:', error);
      break;
    }
  }

  if (iterations === maxIterations) {
    console.warn(`Reached max iterations (${maxIterations}). Returning available quotes.`);
  }

  return { quotes: filteredQuotes.slice(0, fetchCount), requestCount }; // Return quotes and request count
};
