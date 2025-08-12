import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { resolveImagePath } from "../utils/helper";

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
}) => {
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth)

  const handleStarClick = () => {
    if (isLoggedIn) {
      onToggleFavorite(product.id);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col relative m-4 w-fit group">
      <div className="relative w-[18rem]">
        <img
          src={resolveImagePath(product.images[0])}
          alt={product.brand}
          className="absolute top-0 left-0 w-full h-full object-cover border border-[#f5f5f5] rounded-[1.1rem] mb-1 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />
        {product.info && (
          <p className="absolute top-4 left-4 bg-white text-black font-semibold text-sm px-2 py-1 max-sm:px-1 max-sm:py-[0.3rem] rounded border border-gray-300 z-10">
            {product.info}
          </p>
        )}
        {product.images[1] && (
          <img
            src={resolveImagePath(product.images[1])}
            alt={product.brand}
            className="w-full h-full object-cover border border-[#f5f5f5] rounded-[1.1rem] mb-1 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
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
          style={{ cursor: "pointer" }}
          className="absolute top-4 right-4 w-[1.8rem] sm:w-[1.5rem] max-[850px]:w-[1.5rem] z-10"
        />
      </div>
      <Link to={`/shop/${product.id}`} className="text-black no-underline  w-full">
        <h3 className="text-lg font-semibold mt-2">{product.brand}</h3>
        <p className="w-full text-sm">{product.description}</p>
        <p className="text-base font-semibold">{product.price} €</p>
      </Link>
    </div>
  );
};

export default ProductCard;
