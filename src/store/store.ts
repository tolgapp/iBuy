import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;