import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import { assets } from "../assets/assets";
import CuisineService from "../../services/CuisineService";
import CuisineRecipeCard from "../CuisineRecipeCard/CuisineRecipeCard";
import RecipeService from "../../services/RecipeService";

function ExploreMenu() {
  const [Cuisines, setCuisines] = useState([]);
  const [selectCuisine, setSelectCuisine] = useState("All");
  const [recipeByCuisine, setRecipeByCuisine] = useState([]);

  useEffect(() => {
    async function allCuisines() {
      const response = await CuisineService.allCuisine();
      setCuisines(response);
    }

    allCuisines();
  }, []);

  const clearSuisine = (cuisinename) => {
    const ClearName = cuisinename.replace("Recipes", "");
    return ClearName;
  };

  const fetchData = async () => {
    let response;
    if (selectCuisine === "All") {
      let responsex = await RecipeService.getAllRecipes(0, 30);

      response = responsex.data;
    } else {
      response = await CuisineService.getRecipeByCuisine(selectCuisine);
    }
    setRecipeByCuisine(response.content);
  };

  useEffect(() => {
    fetchData();
  }, [selectCuisine]);

  return (
    <>
      <div className="exploremenu" id="exploremenu">
        <h1>Explore Our Menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your craving and and elevate your dining
          experience, one delicious meal at a time
        </p>

        <div className="explore-menu-list" id="explore-menu">
          {Cuisines.map((item, index) => {
            return (
              <div
                key={index}
                className="explore-menu-list-item"
                onClick={() =>
                  setSelectCuisine((prev) =>
                    prev === item.cuisineName ? "All" : item.cuisineName
                  )
                }
              >
                <img
                  src={assets.cuisineImage}
                  className={selectCuisine === item.cuisineName ? "active" : ""}
                ></img>
                <p>{clearSuisine(item.cuisineName)}</p>
              </div>
            );
          })}
        </div>
        <hr className="hr-line-tag4" />
      </div>
      <div className="cuisine-recipes-container">
        {recipeByCuisine.length > 0 ? (
          recipeByCuisine.map((recipe, index) => (
            <CuisineRecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found for this cuisine.</p>
        )}
      </div>
      <hr className="hr-line-tag1" />
      <hr className="hr-line-tag2" />
      <hr className="hr-line-tag3" />
    </>
  );
}

export default ExploreMenu;
