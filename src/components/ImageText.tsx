import { useState, useEffect } from "react";
import { ImageTextProps } from "../types";

const ImageText: React.FC<ImageTextProps> = ({ product, reverse = false }) => {
  const [color, setColor] = useState("#fff");

  function generateColor() {
    let randomColor;
    let brightness;

    do {
      randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
      brightness = calculateBrightness(randomColor);
    } while (brightness > 200); 

    setColor("#" + randomColor);
  }

  function calculateBrightness(hexColor: string) {
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  useEffect(() => {
    generateColor();
  }, []);

  const containerStyle = {
    backgroundColor: color,
  };

  return (
    <div
      style={containerStyle}
      className={`${reverse ? "sm:flex-row-reverse" : ""} flex flex-col sm:flex-row p-8`}
    >
      <div className="flex-1/2">
        <img
          src={product.url}
          alt={`${product.brandName} product image`}
          className="sm:min-w-full"
        />
      </div>
      <div className="flex-1/2 flex flex-col justify-center items-center p-4 pt-9 sm:p-2 text-white">
        <div className="flex gap-2 flex-col items-start">
          <h2 className="text-3xl sm:text-5xl font-medium">{product.brandName}</h2>
          <h3 className="text-lg sm:text-2xl">{product.tagline}</h3>
          <p className="text-sm sm:text-lg">{product.description}</p>
          <button
            style={containerStyle}
            className="border p-2 cursor-pointer text-lg mt-3 hover:scale-95"
          >
            Discover {product.brandName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageText;
