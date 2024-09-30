import axios from "axios";

const RECIPE_API_BASE_URL = "https://foodrecipebackend-production-9ab7.up.railway.app/recipes";

class RecipeService {
  getAllRecipes = async (pageNumber, pageSize) => {
    try {
      const response = await axios.get(
        `${RECIPE_API_BASE_URL}/allRecipes?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      return response;
    } catch (error) {
      console.log("error in fetching all recipes");
    }
  };

  getRecipeById = async (recipe_Id) => {
    try {
      const response = await axios.get(
        `${RECIPE_API_BASE_URL}/recipeById/${recipe_Id}`
      );
      return response;
    } catch (error) {
      console.log("error in getRecipeById");
    }
  };
}
export default new RecipeService();
