import { useEffect, useState } from "react";

type SlideProps = {
  images: { url: string; text?: string; alt: string; title?: string }[];
  interval?: number;
};

const Slides: React.FC<SlideProps> = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideInterval, setSlideInterval] = useState(interval);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, slideInterval);

    return () => clearInterval(sliderInterval);
  }, [images.length, slideInterval]);

  const prevButton = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    extendInterval();
  };

  const nextButton = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    extendInterval();
  };

  const extendInterval = () => {
    setSlideInterval((prevInterval) => prevInterval + 2000);
  };

  return (
    <div className="relative overflow-hidden w-full h-96 sm:h-[46rem] flex items-center justify-center group">
      <div className="w-full h-full relative">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-96 sm:h-[46rem] object-cover"
        />
        <div className="absolute text-white bottom-0 pb-8 pl-9 z-20 text-left max-w-[51rem] flex gap-2 flex-col">
          <h2 className="text-4xl sm:text-7xl font-bold text-shadow">
            {images[currentIndex].title}
          </h2>
          <p className="text-2xl sm:text-3xl text-shadow">{images[currentIndex].text}</p>
        </div>
      </div>
      {currentIndex !== 0 && (
        <button
          className="absolute bottom-1 translate-y-[-1rem] right-[60px] w-[1.85rem] h-[1.85rem] bg-black/50 text-white flex items-center justify-center z-[1000] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70  cursor-pointer"
          onClick={prevButton}
        >
          <img src="/images/icons/arrow-left.png" alt="arrow left icon" />
        </button>
      )}
      {currentIndex !== images.length - 1 && (
        <button
          className="absolute bottom-1 translate-y-[-1rem] right-[20px] w-[1.85rem] h-[1.85rem] bg-black/50 text-white flex items-center justify-center z-[1000] opacity-0 group-hover:opacity-100  transition-opacity hover:bg-black/70 cursor-pointer"
          onClick={nextButton}
        >
          <img src="/images/icons/arrow-right.png" alt="arrow right icon" />
        </button>
      )}
    </div>
  );
};

export default Slides;
