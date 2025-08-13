import { buttonStyle, cartButton } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../store/reducers/cartReducer";
import { RootState } from "../store/store";
import { AmountProps } from "../types";

const Amount = ({ productId, amount, setItemAmount, isCart }: AmountProps) => {
  const dispatch = useDispatch();

  const cartItemQuantity = useSelector((state: RootState) =>
    productId !== undefined
      ? state.cart.items.find((item) => item.productId === productId)?.quantity
      : undefined
  );

  const quantity = isCart ? cartItemQuantity ?? 0 : amount ?? 0;

  const increaseAmount = () => {
    if (isCart && productId !== undefined) {
      dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
    } else if (setItemAmount) {
      setItemAmount((prevAmount) => prevAmount + 1);
    }
  };

  const decreaseAmount = () => {
    if (isCart) {
      if (quantity <= 1) return; 
      if (productId !== undefined) {
        dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
      }
    } else {
      if (quantity <= 0) return; 
      if (setItemAmount) {
      setItemAmount((prevAmount) => prevAmount - 1);
    }
  };
}

  const wrapperStyle = isCart
    ? "flex justify-evenly items-center gap-3 w-30"
    : "flex justify-between items-center gap-2";

  const buttonClass = isCart ? cartButton : buttonStyle;
  const quantityTextClass = isCart ? "text-2xl text-center w-4" : "text-4xl";

  return (
    <div className={wrapperStyle}>
      <button
        className={`${buttonClass} ${
          isCart && quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={decreaseAmount}
        disabled={isCart && quantity <= 1}
      >
        -
      </button>
      <h3 className={quantityTextClass}>{quantity}</h3>
      <button className={buttonClass} onClick={increaseAmount}>
        +
      </button>
    </div>
  );
};


export default Amount;
