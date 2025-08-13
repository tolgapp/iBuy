import React from "react";
import ProductCard from "./ProductCard";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { SearchResultsProps } from "../types";

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  onToggleFavorite,
  favoriteProducts,
}) => {
  const products = useSelector((state: RootState) => state.products)

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-results">
      {searchQuery ? (
        filteredProducts.length > 0 ? (
          <div className="flex m-8 overflow-x-scroll no-scrollbar min-h-screen">
            {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favoriteProducts.includes(product.id)}  
                  onToggleFavorite={onToggleFavorite}
                />
            ))}
          </div>
        ) : (
          <div className="no-results-found flex items-center justify-center h-1/2">
            <p className="text-xl font-medium">No results found for "{searchQuery}"</p>
          </div>
        )
      ) : <Navigate to={"/"} replace />}
    </div>
  );
};

export default SearchResults;
