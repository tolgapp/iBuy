import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  userId: localStorage.getItem("userId") || "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },
    setLoggedOut: (state) => {
        state.isLoggedIn = false;
        state.userId = ""
    }
  },
});

export default authReducer.reducer;
export const { setAuth, setLoggedOut } = authReducer.actions;
