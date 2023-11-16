import { createSlice } from "@reduxjs/toolkit";
// createSlice and not createApi because not using API for asynchronous requests
import { updateCart } from "../utilities/cartUtilities";

// check local storage for cart items
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // reducers are functions that take the current state and an action as arguments,
  // and return a new state result
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      // .find returns first element in array that satisfies provided testing function

      if (existItem) {
        state.cartItems = state.cartItems.map(
          (x) => (x._id === existItem._id ? item : x)
          // latest item information replaces previous item information
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
      // state needs to be returned
      // to clear local storage: Application > Local storage > Clear All (cancel button)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
