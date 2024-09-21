import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

type ProductProps = {
  product: Products;
  isFavorite?: boolean;
  onToggleFavorite: (id: number) => void;
  isLoggedIn?: boolean;
};

const ProductCard: React.FC<ProductProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  isLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleStarClick = () => {
    console.log(`Star clicked for product ID: ${product.id}`);
    if (isLoggedIn) {
      onToggleFavorite(product.id);
    } else {
      navigate("/login");
    }
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
      <img
        src={
          isFavorite
            ? "/images/icons/star-filled.png"
            : "/images/icons/star.png"
        }
        alt={isFavorite ? "filled yellow star" : "empty star"}
        onClick={handleStarClick}
        style={{ cursor: 'pointer' }}
      />
      <Link to={`/shop/${product.id}`}>
      <h3 className="product-name">{product.brand}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-card-price">{product.price} €</p>
      </Link>
    </div>
  );
};

export default ProductCard;