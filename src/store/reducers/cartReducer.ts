import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    }
  }
}); 

export default cartReducer.reducer;
export const { addItem } = cartReducer.actions;