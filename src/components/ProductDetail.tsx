import { useParams } from "react-router-dom";
import products from "../data/products.json";
import Amount from "./Amount";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import "../style/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState<number>(0)
  const [bigImage, setBigImage] = useState("");

  const changeMainImage = (e: React.MouseEvent<HTMLImageElement>) => {
    setBigImage(e.currentTarget.src);
  }  

  const product = id
    ? products.find((product) => product.id === parseInt(id))
    : null;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-thumbnails">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`/${image}`}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail"
            onMouseEnter={changeMainImage}
          />
        ))}
      </div>

      <div className="big-image">
        <img src={bigImage} alt={product.description} />
      </div>

      <div className="product-info">
        <h2>{product.brand}</h2>
        <h3>{product.description}</h3>
        <h4>{product.price} €</h4>
        <Amount amount={amount} setAmount={setAmount}/>
        <AddToCartButton />
      </div>
    </div>
  );
};

export default ProductDetail;
