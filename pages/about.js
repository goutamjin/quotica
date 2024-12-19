'use client'
import React from 'react';
import '@/app/globals.css';
import Navbar from '@/app/components/navibar';
import Footer from '@/app/components/footer';
const About = () => {
  return (
    <>
    <Navbar/>
    {getabout()}
    <Footer/>
    </>
  )




};



const getabout=()=>{

      return (<div className="pt-2 bg-gray-50 min-h-screen">
        {/* Top Gap */}
        <div className="pt-6 pl-4">
          {/* Breadcrumb Navigation */}
          <nav className="container mx-auto px-4">
            <ol className="flex space-x-2 text-gray-500">
              <li><a href="/" className="hover:text-gray-900">Home</a></li>
              <li>/</li>
              <li>About</li>
            </ol>
          </nav>
        </div>
        
        {/* Main Content */}
        <main className="pt-4 container mx-auto px-4 pl-8">
          {/* About Heading */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
          
          {/* Summary About the Website */}
          <p className="text-sm text-gray-700 mb-12 text-left" style={{ maxWidth: '70%' }}>
            Welcome to [Your Website Name], your go-to place for daily doses of inspiration. We believe that words have the power to uplift, motivate, and bring joy. Our mission is to spread positivity through a collection of carefully curated quotes from around the world.
          </p>
          
          {/* Full Width Card */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12 mx-auto" style={{ maxWidth: '100%' }}>
            <div className="flex flex-col md:flex-row items-center">
              {/* Text Content */}
              <div className="md:w-2/3 mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-700" style={{ maxWidth: '90%', wordWrap: 'break-word' }}>
                  It all started with a love for words and a desire to share that love with the world. Our founder, inspired by the power of a good quote, began collecting meaningful sayings and sharing them with friends and family. Fast forward to today, and what began as a personal collection has blossomed into a vibrant community of quote lovers.
                </p>
                
                {/* New Heading and Description */}
                <h3 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Our Impact</h3>
                <p className="text-gray-700 mb-2">
                  Through dedication and a passion for positivity, we've built a library of quotes that inspire millions.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  We have curated over 500,000 quotes from various authors, each one carefully selected to brighten your day and guide you through life's challenges.
                </p>
              </div>
              {/* Placeholder Images and Statistics */}
              <div className="md:w-1/3 mt-4 md:mt-0 md:ml-6 flex flex-col space-y-4 items-center">
                <div className="flex flex-col items-center">
                  <img src="https://via.placeholder.com/120" alt="First" className="w-24 h-24 rounded-lg shadow-lg mb-4" />
                  <img src="https://via.placeholder.com/120" alt="Second" className="w-24 h-24 rounded-lg shadow-lg mb-4" />
                </div>
                <div className="flex flex-wrap justify-center space-x-4">
                  <div className="text-center mb-4 md:w-auto w-1/2">
                    <p className="text-2xl font-bold text-gray-900">500k+</p>
                    <p className="text-sm text-gray-600">Quotes</p>
                  </div>
                  <div className="text-center mb-4 md:w-auto w-1/2">
                    <p className="text-2xl font-bold text-gray-900">1M+</p>
                    <p className="text-sm text-gray-600">Users</p>
                  </div>
                </div>
                <div className="text-center mb-4 w-full">
                  <p className="text-2xl font-bold text-gray-900">10M+</p>
                  <p className="text-sm text-gray-600">Inspiration Moments</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      
      );
};

export default About;
