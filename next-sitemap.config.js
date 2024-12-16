/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://quotica.life', // Replace with your website's URL
    generateRobotsTxt: true, // Generate robots.txt alongside the sitemap 
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' }, // Allow all user agents to crawl all pages
      ],
    },
  };
  
  module.exports = config;
  