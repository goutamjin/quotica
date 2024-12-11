// SkeletonCard.js
const SkeletonCard = () => {
    return (
      <div className="w-[24rem] h-48 bg-gray-300 rounded-xl shadow-xl animate-pulse p-6 m-4">
        {/* Simulating the quote text */}
        <div className="h-24 bg-gray-400 rounded-md mb-4"></div>
        {/* Simulating the author name */}
        <div className="h-6 w-1/2 bg-gray-400 rounded-md"></div>
      </div>
    );
  };
  
  export default SkeletonCard;
  