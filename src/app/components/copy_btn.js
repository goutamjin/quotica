import { useState } from "react";

const CopyButton = ({quote}) => {
  const [copyState, setCopyState] = useState("copy"); // "copy", "loading", "copied"
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip visibility

  const handleCopy = () => {
    setCopyState("loading");

    // Simulate copy action
    setTimeout(() => {
      navigator.clipboard.writeText(quote); // Replace with your dynamic text
      setCopyState("copied");
      setShowTooltip(true); // Show tooltip

      // Hide tooltip and reset icon after 2 seconds
      setTimeout(() => {
        setShowTooltip(false);
        setCopyState("copy");
      }, 2000);
    }, 500); // Simulate a brief loading state
  };

  const renderIcon = () => {
    if (copyState === "loading") {
      return (
        <svg
          className="animate-spin h-5 w-5 text-green-500"
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
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      );
    }
    if (copyState === "copied") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-green-500"
        >
          <path d="M15.24 2H11.3458C9.58159 1.99999 8.18418 1.99997 7.09054 2.1476C5.96501 2.29953 5.05402 2.61964 4.33559 3.34096C3.61717 4.06227 3.29833 4.97692 3.14701 6.10697C2.99997 7.205 2.99999 8.60802 3 10.3793V16.2169C3 17.725 3.91995 19.0174 5.22717 19.5592C5.15989 18.6498 5.15994 17.3737 5.16 16.312L5.16 11.3976L5.16 11.3024C5.15993 10.0207 5.15986 8.91644 5.27828 8.03211C5.40519 7.08438 5.69139 6.17592 6.4253 5.43906C7.15921 4.70219 8.06404 4.41485 9.00798 4.28743C9.88877 4.16854 10.9887 4.1686 12.2652 4.16867L12.36 4.16868H15.24L15.3348 4.16867C16.6113 4.1686 17.7088 4.16854 18.5896 4.28743C18.0627 2.94779 16.7616 2 15.24 2Z" />
          <path d="M6.6001 11.3974C6.6001 8.67119 6.6001 7.3081 7.44363 6.46118C8.28716 5.61426 9.64481 5.61426 12.3601 5.61426H15.2401C17.9554 5.61426 19.313 5.61426 20.1566 6.46118C21.0001 7.3081 21.0001 8.6712 21.0001 11.3974V16.2167C21.0001 18.9429 21.0001 20.306 20.1566 21.1529C19.313 21.9998 17.9554 21.9998 15.2401 21.9998H12.3601C9.64481 21.9998 8.28716 21.9998 7.44363 21.1529C6.6001 20.306 6.6001 18.9429 6.6001 16.2167V11.3974Z" />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-gray-500"
      >
        <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#6b7280" strokeWidth="2"/>
        <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#6b7280" strokeWidth="2"/>
      </svg>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="text-gray-500 hover:text-blue-400 flex items-center transform transition-transform hover:scale-110 active:scale-95"
      >
        {renderIcon()}
      </button>
      {showTooltip && (
        <div className="absolute top-[-10px] right-[-70px] bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-md">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CopyButton;
