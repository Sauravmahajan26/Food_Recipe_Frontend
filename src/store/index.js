import { configureStore } from "@reduxjs/toolkit";
import RecipeSlice from "./recipeSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import cartSlice from "./cartSlice";

const RecipeStore = configureStore({
  reducer: {
    recipes: RecipeSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default RecipeStore;
