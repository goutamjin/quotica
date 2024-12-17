
const fetchIndianQuotes = async (quoteCount = 10) => {
  try {
         
      // Generate a random page number, e.g., between 1 and 100 (adjust as per API's data)
      const randomPage = Math.floor(Math.random() * 100) + 1;

      // Define the URL for the API call with random page and limit
      const response = await fetch(`https://indian-quotes-api.vercel.app/api/quotes?page=${randomPage}&limit=${quoteCount}`,{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      });

      // Check if the response is okay
      if (!response.ok) {
          return []; // Return an empty array if the response is not okay
      }

      // Parse the JSON response
      const jsonResponse = await response.json();
      
      // Extract the data array
      const data = jsonResponse.data;

      // Format the data to return only the quote text and author
      const formattedQuotes = data.map((quote) => ({
          text: quote.quote,
          author: quote.author.name,
          weblink:"https://indian-quotes-api.vercel.app"
      }));

      return formattedQuotes; // Return the formatted quotes
  } catch (error) {
      console.error("Indian Quotes Handler Error:", error);
      return []; // Return an empty array in case of an error
  }
};
export default fetchIndianQuotes;
