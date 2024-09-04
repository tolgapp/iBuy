import { useEffect, useState } from "react";
import "../style/Slider.css";


type SlideProps = {
  images: { url: string; text: string; alt: string }[];
  interval?: number;
};


const Slides: React.FC<SlideProps> = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(sliderInterval);
  }, [images.length, interval]);

  const prevButton = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextButton = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="slider">
      <button className="prevButton" onClick={prevButton}>
        ⬅
      </button>
      <div className="image-container">
        <img src={images[currentIndex].url} alt={images[currentIndex].alt} />
        <div className="image-text">{images[currentIndex].text}</div>
      </div>
      <button className="nextButton" onClick={nextButton}>
        ➡
      </button>
    </div>
  );
};

export default Slides;
