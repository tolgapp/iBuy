import { useParams, Link } from "react-router-dom";
import Amount from "./Amount";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import Slides from "./Slider";
import { baseURL } from "../services/products";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { classicButton } from "../utils/helper";

const resolveImagePath = (imagePath: string) => {
  return imagePath.startsWith("http://") || imagePath.startsWith("https://")
    ? imagePath
    : `${baseURL}${imagePath}`;
};

const ProductDetail = () => {
  const products = useSelector((state: RootState) => state.products);
  const { id } = useParams<{ id: string }>();
  const [mobileStyle, setMobileStyle] = useState(false);
  const [itemAmount, setItemAmount] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string>("");

  const product = id
    ? products.find((product) => product.id === parseInt(id))
    : null;

  useEffect(() => {
    const handleResize = () => {
      setMobileStyle(window.innerWidth <= 1295);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      setMainImage(resolveImagePath(product.images[0]));
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
    setMainImage(e.currentTarget.src);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-12 max-w-[100rem] mx-auto mb-32">
      {mobileStyle ? (
        <Slides images={images} />
      ) : (
        <div className="flex gap-12 max-w-full mx-auto">
          <div className="flex flex-col gap-2.5">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={resolveImagePath(image)}
                alt={`Thumbnail ${index + 1}`}
                className="max-w-24 cursor-pointer border-4 border-gray-200"
                onMouseEnter={changeMainImage}
              />
            ))}
          </div>
          <div className="big-image">
            <img
              src={mainImage}
              alt={product.description}
              className="max-w-[40rem]"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col sm:justify-start gap-4 max-w-[50rem] mt-3 sm:mt-0 sm:ml-18">
        <h2 className="text-5xl font-bold">{product.brand}</h2>
        <h3 className="text-3xl font-medium">{product.description}</h3>
        <h4 className="text-4xl font-bold">{product.price} €</h4>
        <Amount amount={itemAmount} setItemAmount={setItemAmount} />
        <AddToCartButton product={product} amount={itemAmount} />
        <Link className={`${classicButton} text-center`} to="/cart">
          Go to cart
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
