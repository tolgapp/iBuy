import { useState, useEffect } from "react";
import "../style/BackToTop.css"

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Funktion zum Scrollen nach oben
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  // Sichtbarkeit des Buttons beim Scrollen steuern
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top">
          ↑
        </button>
      )}
    </>
  );
};

export default BackToTop;
