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
  reverse?: string;
};

const ImageText: React.FC<ImageTextProps> = ({ product, reverse = false }) => {
  const [color, setColor] = useState('#fff');

  function generateColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setColor('#' + randomColor);
  }

  useEffect(() => {
    generateColor();
  }, []);

  
  const containerStyle = {
    backgroundColor: color
  };

  return (
    <div className="outter-container">
      <div style={containerStyle} className={`inner-container ${reverse ? "reverse" : ""}`}>
        <img src={product.url} alt={`${product.brandName} image`} />
        <div className="text-container">
          <h2>{product.brandName}</h2>
          <h3>{product.tagline}</h3>
          <p>{product.description}</p>
          <button style={containerStyle}>Discover {product.brandName}</button>
        </div>
      </div>
    </div>
  );
};

export default ImageText;