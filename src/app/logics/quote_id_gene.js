// Import the crypto module
import { createHash } from "crypto";

// Function to generate a 16-character alphanumeric hash
export function generateShortHash(input) {
  const hash = createHash("sha256").update(input).digest("base64");

  // Replace all non-alphanumeric characters with an empty string
  const alphanumericHash = hash.replace(/[^a-zA-Z0-9]/g, "");

  // Ensure the result is exactly 16 characters long
  return alphanumericHash.substring(0, 16);
}

