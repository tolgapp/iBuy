import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/cartReducer";
import { AddToCartBtnProps } from "../types";

const AddToCartButton = ({ product, amount }: AddToCartBtnProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (amount <= 0) {
      console.warn("Amount must be greater than 0");
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        brand: product.brand,
        description: product.description,
        price: product.price,
        image: product.images[0],
        quantity: amount,
      })
    );
  };

  return (
    <button
      className="border-[.1rem] bg-white p-3.5 text-black cursor-pointer hover:bg-black hover:text-white"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
