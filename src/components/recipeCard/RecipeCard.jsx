import React from "react";
import "./RecipeCard.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../store/recipeSlice";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setRecipe_Id = (id) => {
    dispatch(getRecipeById(id));
    navigate("/RecipeInfo");
  };

  return (
    <div className="cardRecipe">
      <div className="card-imgRecipe">
        <img
          className="food-item-imageRecipe"
          src={recipe?.recipeImageUrl ?? "default-image-url.jpg"}
          alt={recipe?.recipeName ?? "Recipe"}
        />
      </div>
      <div className="card-infoRecipe">
        <p className="text-titleRecipe">
          {recipe?.recipeName ?? "Unknown Recipe Name"}
        </p>
        <p className="text-bodyRecipe">
          {recipe?.cuisine?.cuisineName ?? "Unknown Cuisine"} /{" "}
          {recipe?.diet?.dietName ?? "Unknown Diet"}
        </p>
      </div>
      <div className="card-footerRecipe">
        <span className="text-titleRecipe">
          <span>Preparation Time</span> - {recipe?.prepTimeInMins ?? "N/A"} mins
        </span>
        <div
          className="card-buttonRecipe"
          onClick={() => setRecipe_Id(recipe.recipeId)}
        >
          Recipe
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
