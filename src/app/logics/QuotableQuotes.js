const fetchQuotableQuotes = async (quoteCount = 10, tags = "technology,famous-quotes") => {
    try {
      // Define the URL for the API call
      const response = await fetch(`https://api.quotable.io/quotes/random?tags=${tags}&limit=${quoteCount}`);
  
      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to fetch quotes from Quotable API");
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Format the data to return only the quote text and author
      const formattedQuotes = data.map((quote) => ({
        text: quote.content,
        author: quote.author,
      }));
  
      return formattedQuotes; // Return the formatted quotes
    } catch (error) {
      console.error("Quotable Handler Error:", error);
      return []; // Return an empty array in case of an error
    }
  };
  
  export default fetchQuotableQuotes;
  