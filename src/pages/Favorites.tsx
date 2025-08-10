import React from "react";
import ProductCard from "../components/ProductCard";
import ScrollingText from "../components/ScrollingText";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

type FavoriteProps = {
  favoriteProducts: number[];
  onToggleFavorite: (productId: number) => void;
};

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
    <div style={style} className="flex flex-col">
      <ScrollingText text={"Your favorites"} />
      {favProducts.length === 0 ? (
          <p className="text-3xl sm:text-5xl text-center mt-90">No favorites selected.</p>
      ) : (
        <div className="flex p-8">
          {favProducts.map((product) => {
            console.log(product.id);
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
    </div>
  );
};

export default Favorites;
