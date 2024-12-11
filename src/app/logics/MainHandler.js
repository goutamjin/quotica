import hindiQuotesHandler from "./hindiQuotesHandler";
import fetchDummyJsonQuotes from "./DummyJsonQuotes";
import fetchQuotableQuotes  from "./QuotableQuotes";
import fetchPaperQuotes   from "./PaperQuotesHandler";
// Import other sub-handlers when needed, e.g. zenQuotesHandler

const mainHandler = async (count = 5, preferences = {}) => {
  try {
    // Define the percentages for sub-handlers
    const subHandlersPercentages = [
      { handler: hindiQuotesHandler, percentage: 50}, // 100% of quotes from hindiQuotesHandler
      // You can add more handlers with percentages like:
      { handler: fetchDummyJsonQuotes , percentage: 16},
   
      { handler: fetchPaperQuotes , percentage: 18 }
    ];

    // Calculate how many quotes to fetch from each sub-handler
    let totalQuotes = [];
    for (let i = 0; i < subHandlersPercentages.length; i++) {
      const { handler, percentage } = subHandlersPercentages[i];

      // Calculate the number of quotes for this handler based on the percentage
      const quotesToFetch = Math.ceil((count * percentage) / 100);

      // Fetch the quotes from the sub-handler
      const quotes = await handler(quotesToFetch);
      
      
      totalQuotes = [...totalQuotes, ...quotes]; // Combine all fetched quotes
    }

      // Shuffle the combined quotes before returning
      return shuffleArray(totalQuotes); // Return all quotes collected from sub-handlers
  } catch (error) {
    console.error("MainHandler Error:", error);
    return []; // Return empty array on error
  }
};
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export default mainHandler;
