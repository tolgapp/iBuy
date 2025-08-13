import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { classicButton, resolveImagePath } from "../utils/helper";
import { Link } from "react-router-dom";
import {
  CartItem,
  clearCart,
  removeFromCart,
} from "../store/reducers/cartReducer";
import Amount from "../components/Amount";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const cart = useSelector((state: RootState) => state.cart.items.length);
  const amount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const totalPrice = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
    setShowMessage(true);

    setTimeout(() => {
      setCheckoutSuccess(true);
    }, 2000);

    setTimeout(() => {
      setShowMessage(false);
      setCheckoutSuccess(false);
    }, 10000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:min-h-[50rem] flex flex-col items-center justify-center ">
      {showMessage ? (
        <div className="mt-8 text-center text-green-600">
          {checkoutSuccess ? (
            <>
              <h3 className="text-2xl font-bold">Thanks for your order!</h3>
              <h4>
                You will receive the confirmation mail in the next 20 minutes.
              </h4>
            </>
          ) : (
            <h3 className="text-2xl font-bold">Processing your order...</h3>
          )}
        </div>
      ) : cart === 0 ? (
        <div className="min-h-[20rem] sm:min-h-[60rem] text-center flex items-center flex-col justify-center">
          <h2 className="font-bold text-3xl">Your cart is empty</h2>
          <Link to="/shop">
            <button className={classicButton}>Visit shop</button>
          </Link>
        </div>
      ) : (
        <div className="sm:h-[52rem] flex flex-col">
          <h2 className="text-2xl font-bold mb-6 mt-20">
            Your Cart ({amount} items)
          </h2>
          <ul className="space-y-6">
            {items.map((item: CartItem) => (
              <li
                key={item.productId}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Link to={`/shop/${item.productId}`}>
                  <img
                    src={resolveImagePath(item.image)}
                    alt={item.brand}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.brand}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-base font-bold">{item.price} €</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <Amount productId={item.productId} isCart />
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  onClick={() => dispatch(removeFromCart(item.productId))}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <div className="pt-4 mt-6 flex flex-col items-end w-full">
            <h2 className="text-2xl font-medium mb-6 text-right">
              Total: {totalPrice.toFixed(2)} €
            </h2>
            <button className={`${classicButton}`} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
