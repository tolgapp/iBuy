import React from "react";
import products from "../data/products.json";
import ProductCard from "./ProductCard";
import "../style/SearchResults.css"

type SearchResultsProps = {
  searchQuery: string;
  onToggleFavorite: (productId: number) => void;
  favoriteProducts: number[];  // Liste der Lieblingsprodukte
  isLoggedIn: boolean;         // Status, ob der Nutzer eingeloggt ist
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  onToggleFavorite,
  favoriteProducts,
  isLoggedIn,
}) => {

  // Filtere die Produkte basierend auf der Suchanfrage
  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-results">
      {searchQuery ? (
        filteredProducts.length > 0 ? (
          <div className="searched">
            {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoriteProducts.includes(product.id)}  
                  onToggleFavorite={onToggleFavorite}
                  isLoggedIn={isLoggedIn}  
                />
            ))}
          </div>
        ) : (
          <p>No results found for "{searchQuery}"</p>
        )
      ) : (
        <p>Please enter a search term.</p>
      )}
    </div>
  );
};

export default SearchResults;
