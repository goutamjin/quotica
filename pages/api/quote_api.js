// CDN URL for the JSON file
const JSON_CDN_URL = "https://temp.staticsave.com/6762f93b84f68.json"; // Replace with your actual CDN URL

// Your allowed origin and secret API key (set in environment variables)
const ALLOWED_ORIGIN = "http://localhost:3000/"; // Replace with your actual domain
const SECRET_API_KEY = process.env.SECRET_API_KEY; // Store securely in Vercel

// Helper function to get random keys
function getRandomKeys(keys, count) {
  const randomKeys = new Set();
  while (randomKeys.size < count) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    randomKeys.add(keys[randomIndex]);
  }
  return Array.from(randomKeys);
}

export default async function handler(req, res) {
  try {
    const { limit = 5, random = false, apiKey } = req.query;

    // Validate limit
    const parsedLimit = Math.min(Number(limit), 100); // Cap limit to 100
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ error: 'Invalid limit parameter' });
    }

    // Fetch JSON data from CDN
    const response = await fetch(JSON_CDN_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch quotes from CDN: ${response.statusText}`);
    }
    const quotes = await response.json();

    // Get all the keys (quote identifiers)
    const keys = Object.keys(quotes);

    let selectedKeys;
    if (random === 'true') {
      // Get random keys
      selectedKeys = getRandomKeys(keys, parsedLimit);
    } else {
      // Get the first N keys for non-random requests
      selectedKeys = keys.slice(0, parsedLimit);
    }

    // Fetch corresponding quotes
    const selectedQuotes = selectedKeys.map((key) => ({
      quote: key,
      author: quotes[key],
    }));

    res.status(200).json({ quotes: selectedQuotes });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
