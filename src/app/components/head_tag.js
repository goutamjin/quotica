import Head from 'next/head';

export default function HeadTag() {
  return (

      <Head>
        {/* Basic Meta Tags */}
        {/* Title Tag: Defines the title of the webpage */}
        <title>Quotica Life | Inspiring, Motivational, and Famous Quotes</title>
        
        {/* Meta Description: Provides a brief summary of the webpage's content */}
        <meta name="description" content="Discover a collection of inspiring, motivational, and famous quotes to brighten your day and uplift your spirit at Quotica Life." />
        
        {/* Viewport Tag: Ensures your site is responsive on different devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Charset Tag: Specifies the character encoding for the webpage */}
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        {/* Keywords Tag: Lists relevant keywords */}
        <meta name="keywords" content="quotes, inspirational quotes, motivational quotes, famous quotes, life quotes, love quotes, friendship quotes, success quotes, wisdom quotes, happiness quotes, positive quotes, daily quotes" />
        
        {/* Robots Tag: Instructs search engines on how to crawl and index your pages */}
        <meta name="robots" content="index, follow" />
        
        {/* Social Media Meta Tags */}
        {/* Open Graph Tags for Facebook */}
        <meta property="og:title" content="Quotica Life | Inspiring, Motivational, and Famous Quotes" />
        <meta property="og:description" content="Discover a collection of inspiring, motivational, and famous quotes to brighten your day and uplift your spirit at Quotica Life." />
        <meta property="og:image" content="https://quotica.life/image/logo.png" />
        <meta property="og:url" content="https://quotica.life" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:title" content="Quotica Life | Inspiring, Motivational, and Famous Quotes" />
        <meta name="twitter:description" content="Discover a collection of inspiring, motivational, and famous quotes to brighten your day and uplift your spirit at Quotica Life." />
        <meta name="twitter:image" content="https://quotica.life/image/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Additional Meta Tags */}
        {/* Author Tag: Specifies the author of the webpage */}
        <meta name="author" content="Goutam Jeengar" />
        
        {/* Copyright Tag: Indicates the copyright information */}
        <meta name="copyright" content="2024, quotica.life" />
        
        {/* Language Tag: Specifies the language of the webpage */}
        <meta name="language" content="en-US" />
      </Head>

  );
}
