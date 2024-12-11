const fetchDummyJsonQuotes = async (quoteCount) => {
  try {
    // Fetch quotes from DummyJSON API with the specified limit
    const response = await fetch(`https://dummyjson.com/quotes?limit=${quoteCount}`);

    if (!response.ok) {
      throw new Error('Failed to fetch quotes from DummyJSON');
    }

    const data = await response.json();

    // Transform the data into the required format
    const formattedQuotes = data.quotes.map((quote) => ({
      text: quote.quote,
      author: quote.author,
    }));


    return formattedQuotes;
  } catch (error) {
    console.error('DummyJSON Handler Error:', error);
    return []; // Return empty array on error
  }
};

export default fetchDummyJsonQuotes;
