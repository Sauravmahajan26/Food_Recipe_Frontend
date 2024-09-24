import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload; // Update cart items
    },
    addItemToCart(state, action) {
      state.items.push(action.payload); // Add a new item
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
    },
  },
});

export const { setCartItems, addItemToCart, removeItemFromCart } =
  cartSlice.actions;
export default cartSlice;
