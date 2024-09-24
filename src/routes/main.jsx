import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import RecipeStore from "../store/index.js";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay.jsx";
import RecipeCarousel from "../components/RecipeCarousel/RecipeCarousel.jsx";
import Home from "./Home.jsx";
import RecipeInfo from "../components/RecipInfo/RecipeInfo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={RecipeStore}>
      <App />
    </Provider>
  </StrictMode>
);
