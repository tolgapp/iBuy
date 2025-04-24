import React from "react";
import products from "../data/products.json";
import ProductCard from "./ProductCard";
import "../style/SearchResults.css"
import { Navigate } from "react-router-dom";

type SearchResultsProps = {
  searchQuery: string;
  onToggleFavorite: (productId: number) => void;
  favoriteProducts: number[];  
  isLoggedIn: boolean;         
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  onToggleFavorite,
  favoriteProducts,
  isLoggedIn,
}) => {

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
          <div className="no-results-found">
            <p>No results found for "{searchQuery}"</p>
          </div>
        )
      ) : <Navigate to={"/"} replace />}
    </div>
  );
};

export default SearchResults;
