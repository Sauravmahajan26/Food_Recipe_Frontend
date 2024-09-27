import React, { useEffect, useState } from "react";
import "./RecipeCarousel.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import DietRecipeCard from "../DietRecipeCard/DietRecipeCard";
import DietService from "../../services/DietService";
import { HashLink as Link } from "react-router-hash-link";

function RecipeCarousel() {
  const [diets, setDiets] = useState([]);
  const [diatary, setDiatary] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [diataryRecipe, setDiataryRecipe] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 5,
    lastPage: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    {
      /* THIS WILL GET ALL DIET NAME WHICH IS DIETARY ON NAMES */
    }
    fetch("http://foodrecipebackend-production-9ab7.up.railway.app/diets/getDietByDietary", { signal })
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching diets:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const fetchData = async (pageNumber = 0, pageSize = 5) => {
    try {
      let response;

      // Check if 'diatary' is "All" to fetch all recipes
      if (diatary === "All") {
        response = await DietService.getAllDietByDietary(pageNumber, pageSize);
      } else {
        // Fetch recipes by dietary preference if it's not "All"
        response = await DietService.getRecipesByDietary(
          diatary,
          pageNumber,
          pageSize
        );
      }

      setDiataryRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage - 1);
  }, [diatary, currentPage]); // Re-fetch data when 'diatary' changes

  const handlePageChange = (page) => {
    if (page < 1 || page > diataryRecipe.totalPages) return;
    setCurrentPage(page);
  };

  const handleDietaryChange = (string) => {
    setCurrentPage(1);
    setDiatary(string); // This will automatically trigger the fetchData in useEffect
  };

  return (
    <div className="">
      <div className="w-11/12 max-w-3xl text-center mx-auto h-auto flex flex-col items-center justify-start gap-4 mt-20 recipediv">
        <h3 className="RecipeCarouseltitle">
          RECIPES BASED ON DIETARY PREFERENCES
        </h3>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your craving and and elevate your dining
          experience, one delicious meal at a time
        </p>
        <hr className="hr-line" />
        <hr className="hr-line" />
        <div
          className={`flex flex-col ${
            diatary === "All" ? "background-color : red" : ""
          }`}
        >
          <button
            className={`dietaryCard ${
              diatary === "All" ? "selectedDietaryCard" : ""
            }`}
            onClick={() => handleDietaryChange("All")}
          >
            All
          </button>
          {/* diet name for dietary */}
          {diets.map((diet, index) => (
            <button
              key={index}
              className={`dietaryCard ${
                diatary === diet.dietName ? "selectedDietaryCard" : ""
              }`}
              onClick={() => handleDietaryChange(diet.dietName)}
            >
              {diet.dietName}
            </button>
          ))}
        </div>
        {/* recipes */}
        <div className="recipe-card-wrapper">
          <IoIosArrowBack
            onClick={() => handlePageChange(currentPage - 1)}
            className="arrow back-arrow"
          />

          <div className="recipe-card-container">
            {diataryRecipe.content.map((recipe, index) => (
              <DietRecipeCard key={index} recipe={recipe} />
            ))}
          </div>

          <IoIosArrowForward
            onClick={() => handlePageChange(currentPage + 1)}
            className="arrow forward-arrow"
          />
        </div>
        {/*dot pagination */}
        <div className="pagination-dots">
          {Array.from({ length: diataryRecipe.totalPages }, (_, index) => (
            <span
              key={index}
              className={`pagination-dot ${
                currentPage === index + 1 ? "active-dot" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCarousel;
