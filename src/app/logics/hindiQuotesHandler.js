const hindiQuotesHandler = async (count = 5) => {
    try {
      const quotes = [];
  
      // Fetch quotes multiple times to get the desired count
      for (let i = 0; i < count; i++) {
        const response = await fetch("https://hindi-quotes.vercel.app/random");
        if (!response.ok) {
          throw new Error(`Failed to fetch Hindi quotes: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Validate and push the quote
        if (data && data.quote) {
          quotes.push({
            text: data.quote, // Use "quote" from API response
            author: "अज्ञात",
            weblink:"https://hindi-quotes.vercel.app" // Default author since it's not provided
          });
        } else {
          throw new Error("Invalid data format received.");
        }
      }
  
      return quotes; // Return the collected quotes
    } catch (error) {
      console.error("HindiQuotesHandler Error:", error);
      return [];
    }
  };
  
  export default hindiQuotesHandler;
  