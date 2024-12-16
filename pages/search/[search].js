import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import '@/app/globals.css'; // Updated path with @ alias
import Navbar from '@/app/components/navibar'; // Fixed component name capitalization
import ScrollToTopButton from '@/app/components/scrol_to_top'; // Updated path and capitalization

const SearchResults = () => {
  const router = useRouter();
  const { term } = router.query; // Updated query parameter to match dynamic route

  useEffect(() => {
    // Handle search term change here
  }, [term]);

  return (
    <div>
      <ScrollToTopButton />
      <Navbar />
      {/* Add your search results rendering logic here */}
    </div>
  );
};

export default SearchResults;
