'use client';

import React, { useState } from 'react';

const Navbar = ({ search }) => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="bg-white shadow-sm px-4 sm:px-2 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="https://www.quotica.life/images/logo.png"
          alt="Placeholder"
          className="h-8 w-8 rounded block mr-2 scale-[1.60]"
        />
        <h1 className={`md:text-2xl font-bold text-gray-800 ${ showSearch? "hidden":""}`}>Quotica</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex items-center justify-end">
        <div
          className={`hidden md:flex items-center w-96 px-4 py-2 border-b-2 border-green-500 bg-transparent`}
        >
          <img src="https://www.quotica.life/images/search_input.svg"
            alt="Search"
            className="h-5 w-5 text-green-700 mr-2"
          />
          <input
            type="text"
            className="focus:outline-none w-full bg-transparent"
            placeholder="Search..."
            value={search}
          />
        </div>
        <div
          className={`md:hidden ${showSearch ? 'flex' : 'hidden'} items-center w-3/4 px-2 py-1 border-b-2 border-green-500 bg-transparent`}
        >
          <img src="https://www.quotica.life/images/search_input.svg"
            alt="Search"
            className={`h-5 w-5 text-green-700 mr-2 `}
          />
          <input
            type="text"
            className="focus:outline-none w-full bg-transparent"
            placeholder="Search..." autoFocus
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex-grow flex items-center justify-end space-x-4">
        <button onClick={()=>{toggleSearch(); setFocus(true);}} className="md:hidden">
          <img src="https://www.quotica.life/images/search.svg"
            alt="Search"
            className={`h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer transform transition-transform hover:scale-110 active:scale-95 `}
          />
        </button>

        {/* Plus Icon */}
        <img src="https://www.quotica.life/images/custom.svg"
          alt="Plus"
          className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer transform transition-transform hover:scale-110 active:scale-95"
        />

        {/* Categories Icon */}
        <img src="https://www.quotica.life/images/category.svg"
          alt="Categories"
          className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer transform transition-transform hover:scale-110 active:scale-95" 
        />

       
      </div>
    </nav>
  );
};

export default Navbar;
