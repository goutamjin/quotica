const fetchPaperQuotes = async (quoteCount, tags = '', curated = false) => {
  const limit = quoteCount > 100 ? 100 : quoteCount; // Ensure the limit does not exceed 100

  // Build the API URL with optional tags and curated parameter
  const offset = Math.floor(Math.random() * 1000);
  let apiUrl = `https://api.paperquotes.com/apiv1/quotes/?format=json&limit=${limit}&&offset=${offset}`;
  if (tags) {
    apiUrl += `&tags=${tags}`;
  }
  
  if (curated) {
    apiUrl += `&curated=1`;
  }

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch Paper Quotes');
  }

  const data = await response.json();
  
  
  return data.results.map(quote => ({
    text: quote.quote,
    author: quote.author,
    weblink:"https://paperquotes.com"
    }));
  
};

export default fetchPaperQuotes;
