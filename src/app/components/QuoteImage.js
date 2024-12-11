import { useRef, useEffect, useState } from 'react';

// Function to get image URL based on screen size
const getImageUrl = () => {
  const width = window.innerWidth;
  let size;

  if (width >= 1024) {
    // Desktop size
    size = '800/450'; // Half of full width for two cards
  } else if (width >= 768) {
    // Tablet size
    size = '1200/675';
  } else {
    // Mobile size
    size = '600/337';
  }

  return `https://picsum.photos/${size}?random=${Math.random()}`;
};

// Image component
const QuoteImage = ({ quote, author }) => {
  const canvasRef = useRef(null);
 
  
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageUrl = getImageUrl();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      // Set the canvas size based on the image
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Apply a black filter over the image (semi-transparent)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // 40% opacity black
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate text size and word wrapping
      const quoteText = `"${quote}"`;
      const maxWidth = canvas.width * .95; // Allow text to occupy 80% of the image width
      const lineHeight = isDesktop ? 60 : isTablet ? 50 : 40; // Increased line height for better readability
      let fontSize = isDesktop ? 50 : isTablet ? 40 : 30; // Increased font size for larger screens

      // Dynamically adjust font size to fit the quote within the canvas
      ctx.font = `bold ${fontSize}px Arial`;
      let textWidth = ctx.measureText(quoteText).width;
      const minFontSize = isDesktop ? 34 : isTablet ? 36 : 30; // Minimum font size

      while (textWidth > maxWidth && fontSize > minFontSize) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(quoteText).width;
      }

      // Word wrapping logic
      const words = quoteText.split(' ');
      let lines = [];
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      // Position quote text at the center of the image
      const textX = canvas.width / 2;
      let textY = canvas.height / 2 - (lines.length * lineHeight) / 2;

      // Add shadow to the quote text (less contrast)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 50% opacity black shadow
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      lines.forEach((line) => {
        ctx.fillText(line, textX, textY);
        textY += lineHeight;
      });

      // Reset shadow properties after drawing the text
      ctx.shadowColor = 'transparent';

      // Add author name at the bottom-right corner with red background
      const authorText = `— ${author}`;
      const authorFontSize = isDesktop ? 28 : isTablet ? 22 : 18;
      ctx.font = `bold ${authorFontSize}px Arial`;
      const authorWidth = ctx.measureText(authorText).width;
      const padding = 10; // Padding inside the red background
      const authorX = canvas.width - authorWidth - padding - 10;
      const authorY = canvas.height - authorFontSize - padding - 10;

      // Red background for author name
      ctx.fillStyle = 'red';
      ctx.fillRect(
        authorX - padding,
        authorY - authorFontSize,
        authorWidth + 2 * (padding + 10),
        authorFontSize + padding
      );

      // Author text in white
      ctx.fillStyle = 'white';
      ctx.fillText(authorText, authorX + (authorWidth / 2) + 2, authorY);
     
      setImageLoaded(true);
    };
  }, [quote, author]);

  return {Image:(
    <div className="relative w-full h-60 md:h-80 lg:h-80">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      {!imageLoaded && <p>Loading...</p>}
    </div>
  ),
      downloadCanvas:canvasRef,
   
};
};

export default QuoteImage;
