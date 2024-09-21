import React from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import "../style/Favorites.css";
import ScrollingText from "../components/ScrollingText";

// Typdefinition für die Props, die an Favorites übergeben werden
type FavoriteProps = {
  favoriteProducts: number[]; // Liste der IDs der favorisierten Produkte
  isLoggedIn: boolean; // Ob der Benutzer eingeloggt ist
  onToggleFavorite: (productId: number) => void; // Funktion zum Hinzufügen/Entfernen eines Favoriten
};

const Favorites: React.FC<FavoriteProps> = ({
  favoriteProducts,
  onToggleFavorite,
  isLoggedIn,
}) => {

  const favProducts = productsData.filter((product) =>
    favoriteProducts.includes(product.id)
  );

  return (
    <div className="favorites-container">
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
