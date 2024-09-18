import React from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import "../style/Favorites.css";
import ScrollingText from "../components/ScrollingText";

type FavoriteProps = {
  favoriteProducts: number[];
  isLoggedIn: boolean;
  onToggleFavorite: (productId: number) => void;
};

const Favorites: React.FC<FavoriteProps> = ({
  favoriteProducts,
  onToggleFavorite,
  isLoggedIn,
}) => {
  const favProducts = products.filter((product) =>
    favoriteProducts.includes(product.id)
  );

  return (
    <div className="favorites-container">
      <ScrollingText text={"Your favorites"} />
      {favProducts.length === 0 ? (
        <p>No favorites selected.</p>
      ) : (
        <div className="favorite-products-container">
          {favProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoggedIn={isLoggedIn}
              isFavorite={favoriteProducts.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
