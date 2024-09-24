import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed for API calls
import RecipeCard from "../recipeCard/RecipeCard";
import "./RecipeSearch.css";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../../store/recipeSlice";
import { useNavigate } from "react-router-dom";
const RecipeSearch = () => {
  const [query, setQuery] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to fetch suggestions based on the query
  const fetchSuggestions = async (keyword) => {
    if (keyword.length < 3) return; // Only fetch suggestions if the keyword is at least 3 characters long
    try {
      const response = await axios.get(
        `http://localhost:8080/recipes/recipe/suggestions/${keyword}`
      );

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  useEffect(() => {
    fetchSuggestions(query);
    if (query.length == 0) {
      setSuggestions([]);
    }
  }, [query]);

  // Function to handle search button click
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/recipes/recipe/search/${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching recipes", error);
    } finally {
      setLoading(false);
    }
  };

  const goToRecipe = (id) => {
    dispatch(getRecipeById(id));
    navigate("/recipeInfo");
  };

  return (
    <div className="serchContainerBox1">
      <div className="container mt-4 ">
        <h2 className="text-center ">Search Recipes</h2>
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Type recipe name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {/* {suggestions.length > 0 && (
          <ul className="list-unstyled p-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item border border-light p-1 suggestionbox"
                onClick={() => goToRecipe(suggestion.recipeId)}
              >
                {suggestion.recipeName}
              </li>
            ))}
          </ul>
        )} */}
        {suggestions.length > 0 && (
          <ul className="list-group p-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action border border-light p-1 suggestionbox cursor-pointer"
                onClick={() => goToRecipe(suggestion.recipeId)}
              >
                {suggestion.recipeName}
              </li>
            ))}
          </ul>
        )}

        {loading && <div className="text-center mt-3">Loading...</div>}
        {results.length > 0 && (
          <div className="mt-4">
            <h4>
              Results for: "{query}" ({results.length} total)
            </h4>
            <div className="row">
              {results.map((recipe) => (
                <div key={recipe.recipeId} className="col-md-3 mb-4">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
