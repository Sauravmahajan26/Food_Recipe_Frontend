import React from "react";
import "./DietRecipeCard.css";
import { assets } from "../assets/assets.js";
import { HashLink as Link } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../../store/recipeSlice.js";

function DietRecipeCard({ recipe }) {
  const dispatch = useDispatch();

  function getRecipeNameBeforeSymbols(recipeName) {
    let cleanName = recipeName.replace(/Recipe/i, "").trim();
    return cleanName.split(/[-(]/)[0].trim();
  }

  const handlePage = (id) => {
    console.log(id);

    dispatch(getRecipeById(id));
  };

  return (
    <Link
      to="/recipeInfo"
      smooth
      onClick={() => handlePage(recipe.recipeId)}
      className="no-underline-text"
    >
      <div className="no-underline-text">
        <article className="carddiet bg-body-secondary">
          <section className="card__herodiet">
            <section
              className="card__herodiet"
              style={{
                backgroundImage: `url(${recipe.recipeImageUrl})`, // Set background image from API
              }}
            ></section>
            <header className="card__hero-headerdiet">
              <span>Prepare in {recipe.prepTimeInMins} Mins</span>
              <div className="card__icondiet">
                {/* Cart icon to save recipe */}
              </div>
            </header>
          </section>
          <p className="card__job-titlediet">
            {getRecipeNameBeforeSymbols(recipe.recipeName)}
          </p>
          <img src={assets.rating_starts} className="card-rating" alt="" />
        </article>
      </div>
    </Link>
  );
}

export default DietRecipeCard;
