// pages/search/[term].js
'use client'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import '@/app/globals.css';
import Navbar from '@/app/components/navibar';
import ScrollToTopButton from '@/app/components/scrol_to_top';
import PageSearch from '@/app/logics/search/search_page';

const SearchResults = () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <div className='bg-gray-50'>
      <Navbar search={search}/>
      <ScrollToTopButton />
      <div className="flex justify-start ml-12 mt-6">
        <span className='search_heading'>{search}</span>
      </div>
      <PageSearch search={search}/>
    </div>
  );
};

export default SearchResults;
