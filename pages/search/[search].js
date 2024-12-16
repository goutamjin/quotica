// pages/search/[term].js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import '../app/globals.css';
import Navbar from '@/app/components/navibar';
import ScrollToTopButton from "./components/scrol_to_top";

const SearchResults = () => {
  const router = useRouter();
  const {search}= router.query;


  useEffect(() => {
    
  }, [search]);


  return (
  <html>
    <ScrollToTopButton/>
    <Navbar />
  </html>
  );
};

export default SearchResults;
