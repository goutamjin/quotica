import hindiQuotesHandler from "../hindiQuotesHandler";
import fetchDummyJsonQuotes from "../DummyJsonQuotes";
import fetchPaperQuotes   from "../PaperQuotesHandler";
import fetchIndianQuotes from "../fetchIndianQuotes";
// Import other sub-handlers when needed, e.g. zenQuotesHandler

const searchHandler = async (count = 5, preferences = { lang:"en" }, searchTerm) => {
  try {
    // Define the percentages for sub-handlers
    const subHandlersPercentages = [
      { handler: hindiQuotesHandler, percentage: ((preferences.lang)=="hi"? 80:20)}, 
      { handler: fetchDummyJsonQuotes , percentage: ((preferences.lang)=="hi"? 20:60)},
      { handler: fetchPaperQuotes , percentage: ((preferences.lang)=="hi"? 20:60) },
    //  { handler: fetchIndianQuotes , percentage: 0 }
    ];

    // Calculate how many quotes to fetch from each sub-handler
    let totalQuotes = [];
    for (let i = 0; i < subHandlersPercentages.length; i++) {
      const { handler, percentage } = subHandlersPercentages[i];

      // Calculate the number of quotes for this handler based on the percentage
      const quotesToFetch = Math.ceil((count * percentage) / 100);

      // Fetch the quotes from the sub-handler
      const quotes = await handler(quotesToFetch,searchTerm);
      
      
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
export default searchHandler;
