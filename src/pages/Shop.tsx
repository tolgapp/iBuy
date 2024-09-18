import React from "react";
import { useParams } from "react-router-dom";
import ShopDetail from "../components/ShopDetail";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import ScrollingText from "../components/ScrollingText";
import { Products } from "../components/ProductCard";
import "../style/Shop.css";

type ShopProps = {
  favoriteProducts: number[];
  isLoggedIn: boolean
  onToggleFavorite: (productId: number) => void;
}

const Shop: React.FC<ShopProps> = ({favoriteProducts, onToggleFavorite, isLoggedIn}) => {
  const { id } = useParams<{ id: string }>();

  // Filter products by category
  const womenProducts = products.filter((product: Products) =>
    product.category.includes("Women")
  );

  const menProducts = products.filter((product: Products) =>
    product.category.includes("Men")
  );

  const accessoriesProducts = products.filter(
    (product: Products) => product.category === "Accessoires"
  );

  // Function to render product lists
  const renderProductList = (productList: Products[]) => (
    <div className="product-container">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteProducts.includes(product.id)}          onToggleFavorite={onToggleFavorite}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );

  return (
    <div>
      {id ? (
        <ShopDetail shopID={id} />
      ) : (
        <div className="shop">
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
