import Image from 'next/image';

const BoxCard = () => {
  return (
    <div className="cursor-pointer w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src="https://i.ibb.co/Wswp6FD/stock-vector-d-flowers-blue-floral-picture-2344651821.jpg"
          alt="Floral"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default BoxCard;
