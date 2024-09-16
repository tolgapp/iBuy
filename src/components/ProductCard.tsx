import { useState } from "react";
import "../style/ProductCard.css";

export type Products = {
  id: number;
  images: string[];
  brand: string;
  description: string;
  price: number;
  info?: string;
  category: string[] | string;
};

type Product = {
  product: Products;
};

const ProductCard: React.FC<Product> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteProduct = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.brand} />
      {product.info && <p className="product-info">{product.info}</p>}
      {product.images[1] && (
        <img
          src={product.images[1]}
          alt={product.brand}
          className="product-image-hover"
        />
      )}
      {isFavorite ? (
        <img
          src="/images/icons/star-filled.png"
          alt="empty star"
          onClick={favoriteProduct}
        />
      ) : (
        <img
          src="/images/icons/star.png"
          alt="empty star"
          onClick={favoriteProduct}
        />
      )}{" "}
      <h3 className="product-name">{product.brand}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-card-price">{product.price} €</p>
    </div>
  );
};
export default ProductCard;
