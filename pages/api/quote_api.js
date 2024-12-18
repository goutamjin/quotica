import path from "path";
import fs from "fs/promises";

// Directory containing JSON chunk files
const CHUNKS_DIR = path.join(process.cwd(), "quote_chunks");

// Total number of chunks
const CHUNKS_COUNT = 10; // Adjust based on the actual number of chunks

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
    const { limit = 5, apiKey } = req.query;

    // Validate limit
    const parsedLimit = Math.min(Number(limit), 100); // Cap limit to 100
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ error: "Invalid limit parameter" });
    }

    // Select a random chunk file
    const randomChunkIndex = Math.floor(Math.random() * CHUNKS_COUNT) + 1;
    const chunkFilePath = path.join(CHUNKS_DIR, `quote_chunk${randomChunkIndex}.json`);

    // Read the chunk file
    const fileData = await fs.readFile(chunkFilePath, "utf-8");
    const quotes = JSON.parse(fileData);

    // Get all the keys (quote identifiers)
    const keys = Object.keys(quotes);

    // Get random keys
    const selectedKeys = getRandomKeys(keys, parsedLimit);

    // Fetch corresponding quotes
    const selectedQuotes = selectedKeys.map((key) => ({
      quote: key,
      author: quotes[key],
    }));

    // Return the selected quotes
    res.status(200).json({ quotes: selectedQuotes });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
