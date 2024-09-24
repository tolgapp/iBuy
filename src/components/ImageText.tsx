import { useState, useEffect } from "react";
import "../style/ImageText.css";

type Product = {
  brandName: string;
  tagline: string;
  description: string;
  url: string;
};

type ImageTextProps = {
  product: Product;
  reverse?: boolean;
};

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
    } while (brightness > 200); // Schwellenwert für Helligkeit, um helle Farben zu vermeiden

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
    <div style={containerStyle}  className={`outter-container ${reverse ? "reverse" : ""}`}>
      <img src={product.url} alt={`${product.brandName} image`} />
      <div className="text-container">
        <h2>{product.brandName}</h2>
        <h3>{product.tagline}</h3>
        <p>{product.description}</p>
        <button style={containerStyle}>Discover {product.brandName}</button>
      </div>
    </div>
  );
};

export default ImageText;
