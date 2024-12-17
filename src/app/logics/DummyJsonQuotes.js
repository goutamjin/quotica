const fetchDummyJsonQuotes = async (quoteCount) => {
  try {
    // Fetch quotes from DummyJSON API with the specified limit
    const response = await fetch(`https://dummyjson.com/quotes/random/${quoteCount}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // Transform the data into the required format
    const formattedQuotes = data.map((quote) => ({
      text: quote.quote,
      author: quote.author,
      weblink:"https://dummyjson.com"
    }));


    return formattedQuotes;
  } catch (error) {
    console.error('DummyJSON Handler Error:', error);
    return []; // Return empty array on error
  }
};

export default fetchDummyJsonQuotes;
