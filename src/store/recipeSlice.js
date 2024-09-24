import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: { selectedRecipeId: null, cartitemid: null, cart: [] },
  reducers: {
    getRecipeById(state, action) {
      state.selectedRecipeId = action.payload;
    },
    recipePath(state, action) {
      console.log(action.payload);
      state.cartitemid = action.payload;
    },
    toggleRecipeInCart(state, action) {
      const recipeId = action.payload;
      const isInCart = state.cart.includes(recipeId);
      if (isInCart) {
        state.cart = state.cart.filter((id) => id !== recipeId);
      } else {
        state.cart.push(recipeId);
      }
    },
  },
});

export const { getRecipeById, recipePath, toggleRecipeInCart } =
  recipeSlice.actions;
export default recipeSlice;
