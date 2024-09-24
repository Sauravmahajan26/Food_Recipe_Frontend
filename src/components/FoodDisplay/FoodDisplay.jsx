import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../recipeCard/RecipeCard";
import {
  markfetchDone,
  markfetchingDone,
  markfetingStarted,
} from "../../store/fetchStatusSlice";
import RecipeService from "../../services/RecipeService";

function FoodDisplay() {
  const [currentPage, setCurrentPage] = useState(1);

  const [fetchRecipes, setFetchRecipes] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageNumber: 0,
    pageSize: 12,
    lastPage: false,
  });

  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  const fetchDatax = async (pageNumber = 0, pageSize = 12) => {
    dispatch(markfetingStarted());
    const response = await RecipeService.getAllRecipes(pageNumber, pageSize);

    setFetchRecipes(response.data);
    dispatch(markfetchingDone());
    dispatch(markfetchDone());
  };
  const handlePage = (page) => {
    if (page < 1 || page > fetchRecipes.totalPages) return;
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchDatax(currentPage - 1, fetchRecipes.pageSize);
  }, [currentPage]);

  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top Dishes near you</h2>

        <div className="food-display-list">
          {fetchRecipes.content.length > 0 ? (
            fetchRecipes.content.map((item, index) => (
              <RecipeCard key={index} recipe={item} />
            ))
          ) : (
            <p>No recipes available</p>
          )}
        </div>

        <div className="Page_navigation-btn">
          <ul className="pagination Page_navigation">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className=" page-link-box"
                onClick={() => handlePage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {currentPage > 1 && (
              <li className="page-item">
                <button
                  className="page-link-box-num"
                  onClick={() => handlePage(currentPage - 1)}
                >
                  {currentPage - 1}
                </button>
              </li>
            )}
            <li className="page-item">
              <button
                className="active-page-link-box-num "
                onClick={() => handlePage(currentPage)}
              >
                {currentPage}
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link-box-num"
                onClick={() => handlePage(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link-box"
                onClick={() => handlePage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default FoodDisplay;
