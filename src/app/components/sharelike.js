'use client';

import React, { useEffect, useState } from 'react';
import { getLikeData, handleLike } from '../logics/firebase/like/Like_handler'; 
import { formatNumber } from '../logics/firebase/like/kmb_converter';
import { generateShortHash } from '../logics/quote_id_gene';
import { isLikedIdInLocalStorage } from '../logics/firebase/like/fetchLikes_local';
import CopyButton from './copy_btn';
import { imageDataToDataURL, processCanvasImage, formatString } from '../logics/share_helper';
import { ShareMoreComp } from '../logics/share_helper';
import { shareToPlatformEx } from '../logics/share_helper';

const ShareLike = ({ quote, author, userId, canvasRef }) => {
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const likeData = await getLikeData(generateShortHash(quote));
        setLikes(likeData.likeCount);
        if (likeData.likeId !== null) setLiked(isLikedIdInLocalStorage(likeData.likeId));
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };
    getLikes();
  }, [quote]); // Dependency array ensures this runs once when `quote` changes

  const downloadIt = () => {
    const cur = imageDataToDataURL(processCanvasImage(canvasRef));
    if (cur) {
      const link = document.createElement('a');
      link.href = cur;
      link.download = `${formatString(quote)}.png`;
      link.click();
    } else {
      console.error('Canvas reference is not available');
    }
  };

  const shareToPlatform = (platform) => {
    shareToPlatformEx(platform, quote, author);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (loading) return; 
    setLoading(true);

    handleLike(quote, userId, (success) => {
      if (success === true) {
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      } else if (success === false) {
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        console.error("Failed to toggle like state.");
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col w-auto font-xs">
      <div className="flex space-x-4 items-center">
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className={` ${liked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'} flex items-center transform transition-transform hover:scale-110 active:scale-95`}
          disabled={loading} // Disable the button during loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-pink-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path d="M12 4.248c-3.148-5.376-12-3.278-12 2.944 0 2.994 2.501 5.74 6.148 8.684C7.418 16.707 9.706 19 12 21.432 14.294 19 16.582 16.707 17.852 15.876 21.499 12.932 24 10.186 24 7.192c0-6.222-8.852-8.32-12-2.944z" />
            </svg>
          )}
          <p>{likes !== null && likes != 0 ? formatNumber(likes) : 'Like'}</p>
        </button>

        {/* Share Button */}
        <button
          onClick={(e) => {
            shareToPlatform("whatsapp");
            e.stopPropagation();
          }}
          className="text-gray-500 hover:text-green-500 flex items-center transform transition-transform hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.557 4.145 1.528 5.89l-1.5 5.61 5.733-1.515c1.73.89 3.692 1.398 5.74 1.398 6.627 0 12-5.373 12-12S18.627 0 12 0zm.558 17.62l-.073.005c-2.747-.002-5.322-1.372-6.87-3.653l-.165-.249c-.268-.393-.405-.794-.373-1.19l.009-.116c.091-.801.719-1.34 1.498-1.386l.135-.002c.36-.01.707.145.945.414l.134.168c.091.121.191.246.29.37l.14.172c.22.276.463.573.724.88.302.356.696.651 1.157.821l.187.062.122.023.238.033c.252.026.51.026.763.001l.118-.02c.246-.034.484-.103.714-.207.22-.105.429-.248.625-.415l.144-.136c.146-.14.291-.296.444-.467l.161-.185c.146-.165.34-.28.56-.324l.125-.016c.44-.058.83.198.998.617l.047.137c.252.789.079 1.569-.491 2.182-.356.388-.753.746-1.181 1.067-.69.525-1.457.9-2.274 1.144l-.183.048-.12.028c-.238.054-.477.1-.717.14z" />
          </svg>
        </button>

        {/* Download */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            downloadIt();
          }}
          className="text-gray-500 hover:text-gray-800 flex items-center transform transition-transform hover:scale-125 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M12 16C11.68 16 11.41 15.91 11.17 15.7L6.17 10.7C5.73 10.26 5.73 9.49 6.17 9.05C6.61 8.61 7.38 8.61 7.82 9.05L11 12.24V4.75C11 4.06 11.56 3.5 12.25 3.5C12.94 3.5 13.5 4.06 13.5 4.75V12.24L16.68 9.05C17.12 8.61 17.89 8.61 18.33 9.05C18.77 9.49 18.77 10.26 18.33 10.7L13.33 15.7C13.09 15.91 12.82 16 12.5 16H12ZM5 19C4.45 19 4 19.45 4 20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20C20 19.45 19.55 19 19 19H5Z" />
          </svg>
        </button>


        {/* Share Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMore(!showMore);
          }}
          className="text-gray-500 hover:text-blue-500 flex items-center transform transition-transform hover:scale-125 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M18 16.08C17.24 16.08 16.56 16.38 16.05 16.88L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.05 7.12C15.56 7.62 16.24 7.92 18 7.92C19.66 7.92 21 6.58 21 4.92C21 3.26 19.66 1.92 18 1.92C16.34 1.92 15 3.26 15 4.92C15 5.16 15.04 5.39 15.09 5.62L8.95 9.8C8.44 9.3 7.76 9 7 9C5.34 9 4 10.34 4 12C4 13.66 5.34 15 7 15C7.76 15 8.44 14.7 8.95 14.2L15.09 18.38C15.04 18.61 15 18.84 15 19.08C15 20.74 16.34 22.08 18 22.08C19.66 22.08 21 20.74 21 19.08C21 17.42 19.66 16.08 18 16.08Z" />
          </svg>
        </button>

        {/* copy button */}

        <CopyButton quote={quote}/>


      </div>

      {/* Optional More Options Menu */}
      {showMore && (
        <div className="absolute bg-white shadow-md rounded p-2 mt-[-60px]">
          {showMore && (
           <ShareMoreComp shareToPlatform={shareToPlatform}  setShowMore={setShowMore} showMore={showMore}/>
          )}
        </div>
      )}
    </div>
  );
};



export default ShareLike;



