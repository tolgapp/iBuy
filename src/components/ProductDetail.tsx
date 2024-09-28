import { useParams } from "react-router-dom";
import products from "../data/products.json";
import Amount from "./Amount";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import "../style/ProductDetail.css";
import Slides from "./Slides";

const resolveImagePath = (imagePath: string) => {
  return imagePath.startsWith("http://") || imagePath.startsWith("https://")
    ? imagePath
    : `/${imagePath}`;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mobileStyle, setMobileStyle] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [bigImage, setBigImage] = useState<string>("");
  
  const product = id ? products.find((product) => product.id === parseInt(id)) : null;

  useEffect(() => {
    const handleResize = () => {
      setMobileStyle(window.innerWidth <= 884);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      setBigImage(resolveImagePath(product.images[0]));
    }
  }, [product]);


  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images.map((image) => ({
    url: resolveImagePath(image),
    alt: product.description,
  }));

  const changeMainImage = (e: React.MouseEvent<HTMLImageElement>) => {
    setBigImage(e.currentTarget.src);
  };

  return (
    <div className="product-detail">
      {mobileStyle ? (
        <Slides images={images} />
      ) : (
        <div className="web-container">
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={resolveImagePath(image)}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
                onMouseEnter={changeMainImage}
              />
            ))}
          </div>
          <div className="big-image">
            <img src={bigImage} alt={product.description} />
          </div>
        </div>
      )}
      <div className="product-detail-info">
        <h2>{product.brand}</h2>
        <h3>{product.description}</h3>
        <h4>{product.price} €</h4>
        <Amount amount={amount} setAmount={setAmount} />
        <AddToCartButton />
      </div>
    </div>
  );
};

export default ProductDetail;