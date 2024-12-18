import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { createGunzip } from 'zlib'; // Gzip decompression (just an example)

export default async function handler(req, res) {
  try {
    // Path to your ZIP file (assuming it's a .gz file for this example)
    const zipFilePath = path.join(process.cwd(), 'pages/api/quotes_data.zip'); // Replace with actual path to your ZIP file
    
    // Check if the ZIP file exists
    if (!fs.existsSync(zipFilePath)) {
      return res.status(404).json({ error: 'ZIP file not found' });
    }

    // Read and create a Gunzip stream for decompression
    const unzipStream = createReadStream(zipFilePath).pipe(createGunzip());
    
    // Path where you want to save the extracted content
    const outputFilePath = path.join(process.cwd(), 'pages/api/quotes_data.json');

    // Create a write stream to write the decompressed content
    const outputFileStream = fs.createWriteStream(outputFilePath);

    // Pipe the decompressed content to the output file
    unzipStream.pipe(outputFileStream);

    // Wait for the extraction to finish
    outputFileStream.on('finish', () => {
      res.status(200).json({ message: 'ZIP extracted and saved as quotes_data.json' });
    });

    // Handle errors during the process
    unzipStream.on('error', (err) => {
      console.error('Error extracting ZIP:', err);
      res.status(500).json({ error: 'Failed to extract ZIP file' });
    });

  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
