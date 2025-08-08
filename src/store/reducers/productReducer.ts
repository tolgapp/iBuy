import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../components/ProductCard";

const initialState: Products[] = [];

const productReducer = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Products[]>) => {
        return action.payload;
        },
    }
    });

export default productReducer.reducer;
export const { setProducts } = productReducer.actions;