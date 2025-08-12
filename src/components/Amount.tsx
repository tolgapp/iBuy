import { useLocation } from "react-router-dom";
import { buttonStyle, cartButton } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../store/reducers/cartReducer";
import { RootState } from "../store/store";

type Props =
  | {
      productId: number;
      amount?: never;
      setItemAmount?: never;
    }
  | {
      productId?: never;
      amount: number;
      setItemAmount: React.Dispatch<React.SetStateAction<number>>;
    };

const Amount = ({ productId, amount, setItemAmount }: Props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const cartItemQuantity = useSelector((state: RootState) =>
    productId !== undefined
      ? state.cart.items.find((item) => item.productId === productId)?.quantity
      : undefined
  );

  const quantity = pathname === "/cart" ? cartItemQuantity ?? 0 : amount ?? 0;

  const increaseAmount = () => {
    if (pathname === "/cart" && productId !== undefined) {
      dispatch(updateQuantity({ productId, quantity: quantity + 1 }));
    } else if (setItemAmount) {
      setItemAmount((prevAmount) => prevAmount + 1);
    }
  };

  const decreaseAmount = () => {
    if (quantity < 1) return;

    if (pathname === "/cart" && productId !== undefined) {
      dispatch(updateQuantity({ productId, quantity: quantity - 1 }));
    } else if (setItemAmount) {
      setItemAmount((prevAmount) => prevAmount - 1);
    }
  };

  const wrapperStyle =
    pathname === "/cart"
      ? "flex justify-evenly items-center gap-3 w-48"
      : "flex justify-between items-center gap-2";

  const buttonClass = pathname === "/cart" ? cartButton : buttonStyle;
  const quantityTextClass = pathname === "/cart" ? "text-2xl text-center w-8" : "text-4xl";

  return (
    <div className={wrapperStyle}>
      <button className={buttonClass} onClick={decreaseAmount}>
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
