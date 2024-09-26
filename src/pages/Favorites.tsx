import React from "react";
import productsData from "../data/products.json";
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
  const style = {
    height: favoriteProducts.length > 0 ? "auto" : "45rem",
  };

  const favProducts = productsData.filter((product) =>
    favoriteProducts.includes(product.id)
  );

  return (
    <div style={style} className="favorites-container">
      <ScrollingText text={"Your favorites"} />
      {favProducts.length === 0 ? (
        <p className="no-favorites-text">No favorites selected.</p>
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
