import { useEffect, useState } from "react";
import "../style/Slider.css";

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
    <div className="slider">
      <div className="image-container">
        <img src={images[currentIndex].url} alt={images[currentIndex].alt} />
        <div className="image-text">
          <h2>{images[currentIndex].title}</h2>
          <p>{images[currentIndex].text}</p>
        </div>
      </div>
      {currentIndex !== 0 && (
        <button className="prevButton" onClick={prevButton}>
          <img src="/images/icons/arrow-left.png" alt="arrow left icon" />
        </button>
      )}
      {currentIndex !== images.length - 1 && (
        <button className="nextButton" onClick={nextButton}>
          <img src="/images/icons/arrow-right.png" alt="arrow right icon" />
        </button>
      )}
    </div>
  );
};

export default Slides;
