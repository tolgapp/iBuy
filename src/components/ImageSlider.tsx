import { useState, useEffect } from 'react';
import "../style/Slider.css";

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 20000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(sliderInterval);
  }, [images.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slider">
      <button className='prevButton' onClick={goToPrevious}>⬅</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button className='nextButton' onClick={goToNext}>➡</button>
    </div>
  );
};

export default ImageSlider;
