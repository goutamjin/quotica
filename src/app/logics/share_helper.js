import { fixed_web_short_link } from "./other/fixedData";

{/*get proccessed canvas for download */ }

export function imageDataToDataURL(imageData) {
  // Create a new canvas element
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  // Set the canvas size to match the ImageData dimensions
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;

  // Put the ImageData onto the canvas
  tempCtx.putImageData(imageData, 0, 0);

  // Get the dataURL from the canvas
  const dataURL = tempCanvas.toDataURL();
  return dataURL;
}



export function processCanvasImage(canvasRef) {
  if (!canvasRef || !canvasRef.current) {
    console.error("Canvas reference is not valid.");
    return null;
  }

  try {
    // Get the canvas element and 2D context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Specify the area to extract (full canvas)
    const width = canvas.width;
    const height = canvas.height;

    // Retrieve image data
    const imageData = ctx.getImageData(0, 0, width, height);

    // Return the image data for further processing
    return imageData;
  } catch (error) {
    console.error("Failed to process the canvas image:", error);
    return null;
  }
}
export const formatString = input => input.replace(/[^a-zA-Z0-9 \u0900-\u097F]/g, '').padEnd(16, ' ').substring(0, 16);




// share more component

export const ShareMoreComp=({shareToPlatform,setShowMore,showMore})=>{

return (
  <div className="flex space-x-3 mt-2 ">
  <button
    onClick={(e) => {
      shareToPlatform("facebook");
      setShowMore(!showMore)
      e.stopPropagation();
    }}
    className="text-gray-500 hover:text-blue-600 flex items-center transform transition-transform hover:scale-110 active:scale-95"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 mr-2"
    >
      <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.35C0 23.4.6 24 1.325 24H12v-9.294H9.294V11.71H12V9.294c0-2.687 1.641-4.145 4.035-4.145 1.148 0 2.135.086 2.422.124v2.812h-1.664c-1.307 0-1.56.622-1.56 1.534v2.004H18.6l-.553 3.004H15.23V24h7.445C23.4 24 24 23.4 24 22.675v-21.35C24 .6 23.4 0 22.675 0z" />
    </svg>
  </button>
  <button
    onClick={(e) => {
      shareToPlatform("pinterest");
      setShowMore(!showMore);
      e.stopPropagation();
    }}
    className="text-gray-500 hover:text-red-600 flex items-center transform transition-transform hover:scale-110 active:scale-95"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 mr-2 "
    >
      <path d="M12 0C5.372 0 0 5.372 0 12c0 4.658 2.747 8.65 6.755 10.39-.094-.885-.179-2.24.038-3.205.196-.85 1.26-5.411 1.26-5.411s-.32-.64-.32-1.584c0-1.48.86-2.584 1.935-2.584.91 0 1.352.685 1.352 1.506 0 .91-.58 2.27-.88 3.538-.25 1.07.52 1.94 1.548 1.94 1.85 0 3.272-1.95 3.272-4.76 0-2.487-1.791-4.22-4.34-4.22-2.956 0-4.688 2.218-4.688 4.52 0 .91.35 1.88.785 2.42.085.1.095.19.07.29-.08.32-.26 1.04-.3 1.18-.05.2-.2.27-.43.16-1.59-.73-2.58-3.02-2.58-4.87 0-3.96 2.874-7.61 8.304-7.61 4.36 0 7.75 3.12 7.75 7.28 0 4.32-2.71 7.8-6.47 7.8-.92 0-1.77-.17-2.55-.47-.19.48-.45 1.11-.58 1.6-.18.71-.68 2.2-.78 2.52-.09.32-.32.69-.51.95C18.27 21.74 24 17.19 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  </button>
  <button
    onClick={(e) => {
      shareToPlatform("twitter");
      setShowMore(!showMore);
      e.stopPropagation();
    }}
    className="text-gray-500 hover:text-blue-400 flex items-center transform transition-transform hover:scale-110 active:scale-95">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 mr-2"
    >
      <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.56-3.594-1.56-2.724 0-4.93 2.206-4.93 4.93 0 .386.045.762.126 1.124-4.094-.205-7.725-2.165-10.151-5.144-.424.722-.667 1.56-.667 2.475 0 1.708.869 3.216 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.624-.03-.927-.086.631 1.953 2.445 3.377 4.6 3.418-1.68 1.32-3.809 2.107-6.102 2.107-.394 0-.779-.023-1.161-.067 2.179 1.398 4.768 2.214 7.548 2.214 9.05 0 13.998-7.496 13.998-13.998 0-.213-.005-.425-.014-.637.961-.695 1.797-1.562 2.457-2.549z" />
    </svg>

  </button>

 <button
  onClick={(e) => {
    shareToPlatform("tumblr");
    setShowMore(!showMore);
    e.stopPropagation();
  }}
  className="text-gray-500 hover:text-blue-900 flex items-center transform transition-transform hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 mr-2"
  >
    <path d="M12.744 11.749v6.184c0 .238.018.427.056.564a1.139 1.139 0 00.288.495c.161.155.348.25.559.283.21.033.444.05.704.05.474 0 .897-.074 1.266-.222.369-.148.665-.35.885-.605l1.207 2.043c-.474.393-.964.686-1.469.88a5.083 5.083 0 01-1.605.285c-.729 0-1.378-.095-1.948-.285a3.582 3.582 0 01-1.414-.83 3.612 3.612 0 01-.845-1.344c-.194-.532-.291-1.177-.291-1.935v-6.493h-2.285V8.4c.336-.13.677-.33 1.022-.601.344-.272.635-.602.873-.99.238-.387.415-.825.531-1.313.115-.487.173-1.006.173-1.557V2.001h3.404v4.479h2.765v2.57h-2.765z" />
  </svg>
</button>


<button
  onClick={(e) => {
    shareToPlatform("reddit");
    setShowMore(!showMore);
    e.stopPropagation();
  }}
  className="text-gray-500 hover:text-orange-500 flex items-center transform transition-transform hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 mr-2 scale-150"
  >
   <path d="M10.24 13.6C10.0818 13.6 9.92711 13.5531 9.79555 13.4652C9.66399 13.3773 9.56145 13.2523 9.5009 13.1061C9.44035 12.96 9.42451 12.7991 9.45538 12.6439C9.48624 12.4887 9.56244 12.3462 9.67432 12.2343C9.7862 12.1224 9.92875 12.0462 10.0839 12.0154C10.2391 11.9845 10.4 12.0003 10.5461 12.0609C10.6923 12.1214 10.8173 12.224 10.9052 12.3555C10.9931 12.4871 11.04 12.6418 11.04 12.8C11.04 12.9051 11.0193 13.0091 10.9791 13.1061C10.9389 13.2032 10.88 13.2914 10.8057 13.3657C10.7314 13.44 10.6432 13.4989 10.5461 13.5391C10.4491 13.5793 10.3451 13.6 10.24 13.6ZM20 12C20 13.5823 19.5308 15.129 18.6518 16.4446C17.7727 17.7602 16.5233 18.7855 15.0615 19.391C13.5997 19.9965 11.9911 20.155 10.4393 19.8463C8.88743 19.5376 7.46197 18.7757 6.34315 17.6569C5.22433 16.538 4.4624 15.1126 4.15372 13.5607C3.84504 12.0089 4.00347 10.4003 4.60897 8.93853C5.21447 7.47672 6.23985 6.22729 7.55544 5.34824C8.87103 4.46919 10.4178 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12ZM15.73 10.67C15.4543 10.6862 15.1943 10.8038 15 11C14.1775 10.4564 13.2158 10.1613 12.23 10.15L12.79 7.62L14.58 8.02C14.5787 8.12458 14.5981 8.22839 14.6372 8.32539C14.6764 8.4224 14.7343 8.51067 14.8078 8.58509C14.8813 8.65951 14.9689 8.7186 15.0654 8.75892C15.1619 8.79925 15.2654 8.82001 15.37 8.82C15.5831 8.81737 15.7866 8.73087 15.9363 8.57925C16.0861 8.42763 16.17 8.2231 16.17 8.01C16.176 7.82715 16.1183 7.6479 16.0069 7.50284C15.8954 7.35777 15.737 7.25589 15.5588 7.21458C15.3806 7.17327 15.1936 7.1951 15.0296 7.27633C14.8657 7.35756 14.7351 7.49317 14.66 7.66L12.66 7.22C12.6124 7.21087 12.5631 7.22027 12.5222 7.2463C12.4813 7.27233 12.4519 7.313 12.44 7.36L11.82 10.15C10.8346 10.1641 9.87368 10.4589 9.05 11C8.94175 10.8882 8.81043 10.8014 8.66518 10.7456C8.51993 10.6898 8.36426 10.6663 8.20902 10.6769C8.05378 10.6874 7.9027 10.7316 7.76631 10.8065C7.62993 10.8814 7.51152 10.9852 7.41934 11.1105C7.32717 11.2359 7.26344 11.3799 7.23261 11.5324C7.20178 11.6849 7.20458 11.8423 7.24082 11.9936C7.27706 12.1449 7.34586 12.2865 7.44244 12.4085C7.53902 12.5305 7.66104 12.63 7.8 12.7C7.78471 12.8663 7.78471 13.0337 7.8 13.2C7.8 14.89 9.71 16.27 12.06 16.27C14.41 16.27 16.32 14.89 16.32 13.2C16.3204 13.0282 16.3002 12.857 16.26 12.69C16.4621 12.5755 16.6215 12.3984 16.714 12.1854C16.8066 11.9724 16.8274 11.7351 16.7732 11.5092C16.719 11.2834 16.5927 11.0813 16.4136 10.9335C16.2344 10.7858 16.012 10.7003 15.78 10.69L15.73 10.67ZM13.51 14.42C13.0606 14.7023 12.5407 14.852 12.01 14.852C11.4793 14.852 10.9594 14.7023 10.51 14.42C10.4731 14.3863 10.425 14.3676 10.375 14.3676C10.325 14.3676 10.2769 14.3863 10.24 14.42C10.2206 14.4378 10.2051 14.4594 10.1945 14.4835C10.1839 14.5076 10.1785 14.5337 10.1785 14.56C10.1785 14.5863 10.1839 14.6124 10.1945 14.6365C10.2051 14.6606 10.2206 14.6822 10.24 14.7C10.7652 15.0564 11.3853 15.2469 12.02 15.2469C12.6547 15.2469 13.2748 15.0564 13.8 14.7C13.8194 14.6822 13.8349 14.6606 13.8455 14.6365C13.8561 14.6124 13.8616 14.5863 13.8616 14.56C13.8616 14.5337 13.8561 14.5076 13.8455 14.4835C13.8349 14.4594 13.8194 14.4378 13.8 14.42C13.7813 14.4003 13.7588 14.3847 13.7339 14.374C13.709 14.3633 13.6821 14.3577 13.655 14.3577C13.6279 14.3577 13.601 14.3633 13.5761 14.374C13.5512 14.3847 13.5287 14.4003 13.51 14.42ZM13.76 12C13.6018 12 13.4471 12.0469 13.3155 12.1348C13.184 12.2227 13.0814 12.3477 13.0209 12.4939C12.9604 12.64 12.9445 12.8009 12.9754 12.9561C13.0062 13.1113 13.0824 13.2538 13.1943 13.3657C13.3062 13.4776 13.4487 13.5538 13.6039 13.5846C13.7591 13.6155 13.92 13.5997 14.0662 13.5391C14.2123 13.4786 14.3373 13.376 14.4252 13.2445C14.5131 13.1129 14.56 12.9582 14.56 12.8C14.56 12.5878 14.4757 12.3843 14.3257 12.2343C14.1757 12.0843 13.9722 12 13.76 12Z" />
  </svg>
</button>

 <button
  onClick={(e) => {
    shareToPlatform("quora");
    setShowMore(!showMore);
    e.stopPropagation();
  }}
  className="text-gray-500 hover:text-rose-500 flex items-center transform transition-transform hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 mr-2"
  >
   <path d='M14.07 12.847s-.049.718-.696.718c-.5 0-.841-.385-1.16-.884a4.417 4.417 0 0 0 1.483-3.325C13.697 6.95 11.821 5 9.507 5c-2.314 0-4.19 1.95-4.19 4.356 0 2.405 1.876 4.356 4.19 4.356.42 0 .826-.065 1.208-.184.484.775 1.098 1.472 2.06 1.472 1.958 0 2.039-2.153 2.039-2.153h-.744zm-4.563.147c-1.35 0-2.443-1.629-2.443-3.638 0-2.01 1.094-3.638 2.443-3.638 1.35 0 2.443 1.629 2.443 3.638 0 .799-.173 1.537-.466 2.138-.331-.477-.729-.883-1.297-1.013-1.009-.229-1.877.229-2.152.457l.259.539s.261-.152.91 0c.41.095.727.667 1.09 1.323a1.73 1.73 0 0 1-.787.194z'/><path d='M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'/>
   </svg>
</button>

<button
  onClick={(e) => {
    shareToPlatform("medium");
    setShowMore(!showMore);
    e.stopPropagation();
  }}
  className="text-gray-500 hover:text-gray-900 flex items-center transform transition-transform hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 mr-2"
  >
  <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9V15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17H8H9C9.55228 17 10 16.5523 10 16C10 15.4477 9.55228 15 9 15V11.3028L11.1679 14.5547C11.3534 14.8329 11.6656 15 12 15C12.3344 15 12.6466 14.8329 12.8321 14.5547L15 11.3028V15C14.4477 15 14 15.4477 14 16C14 16.5523 14.4477 17 15 17H16H17C17.5523 17 18 16.5523 18 16C18 15.4477 17.5523 15 17 15V9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H16C15.6656 7 15.3534 7.1671 15.1679 7.4453L12 12.1972L8.83205 7.4453C8.64658 7.1671 8.33435 7 8 7H7Z" />
  </svg>
</button>

<button
  onClick={(e) => {
    shareToPlatform("instagram");
    setShowMore(!showMore);
    e.stopPropagation();
  }}
  className="text-gray-500 hover:text-rose-500 flex items-center transform transition-transform hover:scale-110 active:scale-95"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 mr-2"
  >
 <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM12 15.88C9.86 15.88 8.12 14.14 8.12 12C8.12 9.86 9.86 8.12 12 8.12C14.14 8.12 15.88 9.86 15.88 12C15.88 14.14 14.14 15.88 12 15.88ZM17.92 6.88C17.87 7 17.8 7.11 17.71 7.21C17.61 7.3 17.5 7.37 17.38 7.42C17.26 7.47 17.13 7.5 17 7.5C16.73 7.5 16.48 7.4 16.29 7.21C16.2 7.11 16.13 7 16.08 6.88C16.03 6.76 16 6.63 16 6.5C16 6.37 16.03 6.24 16.08 6.12C16.13 5.99 16.2 5.89 16.29 5.79C16.52 5.56 16.87 5.45 17.19 5.52C17.26 5.53 17.32 5.55 17.38 5.58C17.44 5.6 17.5 5.63 17.56 5.67C17.61 5.7 17.66 5.75 17.71 5.79C17.8 5.89 17.87 5.99 17.92 6.12C17.97 6.24 18 6.37 18 6.5C18 6.63 17.97 6.76 17.92 6.88Z" />
 </svg>
</button>

</div>
);

};




export const shareToPlatformEx = async (platform, quote, author) => {
  const message = encodeURIComponent(`${quote} - ${fixed_web_short_link}`);
  let url = null;

  // Construct platform-specific share URLs with the uploaded image link
  if (platform === "facebook") {
    url = `https://www.facebook.com/sharer/sharer.php?u=${message}`;
  } else if (platform === "pinterest") {
    url = `https://pinterest.com/pin/create/button/?description=${message}`;
  } else if (platform === "twitter") {
    url = `https://twitter.com/intent/tweet?text=${message}`;
  } else if (platform === "whatsapp") {
    url = `https://wa.me/?text=${message}`;
  } else if (platform === "snapchat") {
    url = `https://snapchat.com/submit?text=${message}`;
  } else if (platform === "quora") {
    url = `https://www.quora.com/share?text=${message}`;
  } else if (platform === "instagram") {
    url = `https://instagram.com/?text=${message}`;
  } else if (platform === "tumblr") {
    url = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${author}&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
  } else if (platform === "reddit") {
    url = `https://www.reddit.com/submit?title=${message}`;
  } else if (platform === "medium") {
    url = `https://medium.com/new-story?source=post_page&title=${quote}&author=${author}`;
  } else if (platform === "linkedin") {
    url = `https://www.linkedin.com/sharing/share-offsite/?url=${message}`;
  }

  if (url) {
    window.open(url, "_blank");
  }
};



