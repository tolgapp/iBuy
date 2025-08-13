import React from "react";
import { useParams } from "react-router-dom";
import ShopDetail from "../components/ShopDetail";
import ProductCard from "../components/ProductCard";
import ScrollingText from "../components/ScrollingText";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Products, ShopProps } from "../types";

const Shop: React.FC<ShopProps> = ({favoriteProducts, onToggleFavorite}) => {
  const products  = useSelector((state: RootState) => state.products);

  const { id } = useParams<{ id: string }>();

  const womenProducts = products.filter((product: Products) =>
    product.category.includes("Women")
  );

  const menProducts = products.filter((product: Products) =>
    product.category.includes("Men")
  );

  const accessoriesProducts = products.filter(
    (product: Products) => product.category === "Accessoires"
  );

  const renderProductList = (productList: Products[]) => (
    <div className="flex overflow-x-scroll whitespace-nowrap justify-staRT items-center no-scrollbar">
      <div className="p-8 flex gap-2">
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteProducts.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {id ? (
        <ShopDetail shopID={id} />
      ) : (
        <div className="flex flex-col whitespace-nowrap">
          <ScrollingText text={"All products"} />
          {renderProductList(products)}
          <ScrollingText text={"Women"} />
          {renderProductList(womenProducts)}
          <ScrollingText text={"Men"} />
          {renderProductList(menProducts)}
          <ScrollingText text={"Accessoires"} />
          {renderProductList(accessoriesProducts)}
        </div>
      )}
    </div>
  );
};

export default Shop;
