import axios from "axios";

const RECIPE_API_BASE_URL = "http://localhost:8080/recipes";

class DietService {
  getAllDietByDietary = async (pageNumber, pageSize) => {
    try {
      const response = await axios.get(
        // this will get all filterd recipes
        // "All"
        `${RECIPE_API_BASE_URL}/distinct-diet-recipes?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      return response;
    } catch (error) {
      console.log("error in fetching all recipes");
    }
  };

  getRecipesByDietary = async (dietary, pageNumber, pageSize) => {
    try {
      const response = await axios.get(
        `${RECIPE_API_BASE_URL}/Diet/Recipes/${dietary}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      console.log("error in fetching all recipes");
    }
  };
}
export default new DietService();
