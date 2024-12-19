import path from "path";
import fs from "fs/promises";

// Directory containing JSON chunk files
const CHUNKS_DIR = path.join(process.cwd(), "quote_chunks");

// Allowed origins
const ALLOWED_ORIGINS = ["https://www.quotica.life", "http://localhost:3000"];

// Secret API key
const SECRET_API_KEY = process.env.SECRET_API_KEY;

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
    const origin =  req.headers.origin || "http://localhost:3000"
    
    // Set CORS headers
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      return res.status(403).json({ error: "Forbidden: Origin not allowed" });
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    // Validate API key
    const { apiKey } = req.query;
    if (!apiKey || apiKey !== SECRET_API_KEY) {
      console.log("Invalid API Key:", apiKey);
      return res.status(403).json({ error: "Forbidden: Invalid API key" });
    }

    const { limit = 5 } = req.query;

    // Validate limit
    const parsedLimit = Math.min(Number(limit), 100); // Cap limit to 100
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ error: "Invalid limit parameter" });
    }

    // Get all chunk files dynamically
    const chunkFiles = await fs.readdir(CHUNKS_DIR);
    const chunkFileNames = chunkFiles.filter(
      (file) => file.startsWith("quote_chunk") && file.endsWith(".json")
    );
    if (chunkFileNames.length === 0) {
      return res.status(500).json({ error: "No chunks available" });
    }

    // Select a random chunk file
    const randomChunkIndex = Math.floor(Math.random() * chunkFileNames.length);
    const chunkFilePath = path.join(CHUNKS_DIR, chunkFileNames[randomChunkIndex]);

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
