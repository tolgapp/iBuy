import React from "react";
import ProductCard from "../components/ProductCard";
import ScrollingText from "../components/ScrollingText";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { FavoriteProps } from "../types";

const Favorites: React.FC<FavoriteProps> = ({
  favoriteProducts,
  onToggleFavorite,
}) => {
  const products = useSelector((state: RootState) => state.products);

  const style = {
    height: favoriteProducts.length > 0 ? "55rem" : "65rem",
  };

  const favProducts = products.filter((product) =>
    favoriteProducts.includes(product.id)
  );


  return (
    <main style={style} className="flex flex-col">
      <ScrollingText text={"Your favorites"} />
      {favProducts.length === 0 ? (
          <p className="text-3xl sm:text-5xl text-center mt-90">No favorites selected.</p>
      ) : (
        <div className="flex p-6">
          {favProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoriteProducts.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Favorites;
