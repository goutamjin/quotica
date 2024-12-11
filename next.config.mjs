export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**', // Allows all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Add the placeholder image host
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
};
