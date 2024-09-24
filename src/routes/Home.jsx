import React from "react";
import Header from "../components/Header/Header";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay";
import RecipeCarousel from "../components/RecipeCarousel/RecipeCarousel";
import ExploreMenu from "../components/ExploreMenu/ExploreMenu";
import RecipeSearch from "../components/RecipeSearch/RecipeSearch";

function Home() {
  return (
    <main>
      <div id="header">
        <Header />
      </div>
      <div id="foodDisplay">
        <FoodDisplay />
      </div>
      <div id="recipeCarousel">
        <RecipeCarousel />
      </div>
      <div id="exploreMenu">
        <ExploreMenu />
      </div>
      <div id="searchRecipe">
        <RecipeSearch />
      </div>
    </main>
  );
}

export default Home;
