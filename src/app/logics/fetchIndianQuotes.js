const fetchQuotesOwn = async (quoteCount = 5, random = true) => {
  try {
    // Your API key (keep this secure in an environment variable on the server)
    const apiKey = process.env.NEXT_PUBLIC_QUOTES_API_KEY; // Replace with your actual environment variable

    // Define the URL for the API call, passing in the limit, random flag, and API key
    const response = await fetch(
      `${window.location.origin}/api/quote_api?limit=${quoteCount}&random=${random}&apiKey=${window.encodeURIComponent(apiKey)}`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json', 
        },
      }
    );

    // Check if the response is okay
    if (!response.ok) {
      console.error('Failed to fetch quotes');
      return []; // Return an empty array if the response is not okay
    }

    // Parse the JSON response
    const jsonResponse = await response.json();

    // Extract the quotes array from the response
    const data = jsonResponse.quotes;

    // Format the data to return only the quote text and author
    const formattedQuotes = data.map((quote) => ({
      text: quote.quote,
      author: quote.author,
      weblink: "https://quotica.life", // Provide the correct domain here
    }));

    return formattedQuotes; // Return the formatted quotes
  } catch (error) {
    console.error('Quotes Handler Error:', error);
    return []; // Return an empty array in case of an error
  }
};

export default fetchQuotesOwn;
