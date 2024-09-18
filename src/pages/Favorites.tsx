import React from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import "../style/Favorites.css";

type FavoriteProps = {
  favoriteProducts: number[];
  onToggleFavorite: (productId: number) => void;
};

const Favorites: React.FC<FavoriteProps> = ({
  favoriteProducts,
  onToggleFavorite,
}) => {
  const favProducts = products.filter((product) =>
    favoriteProducts.includes(product.id)
  );


  const containerStyle: React.CSSProperties = {
    minHeight: favProducts.length === 0 ? "45rem" : "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: favProducts.length === 0 ? "center" : "flex-start",
  };

  // Function to handle favorite toggling

  return (
    <div style={containerStyle} className="favorites-container">
      <h1>Favorites Page</h1>
      {favProducts.length === 0 ? (
        <p>No favorites selected.</p>
      ) : (
        <div className="products-con">
          {favProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;