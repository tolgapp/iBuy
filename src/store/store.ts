import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;