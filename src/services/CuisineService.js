import axios from "axios";

const RECIPE_API_BASE_URL = "http://localhost:8080/";

class CuisineService {
  allCuisine = async () => {
    try {
      const response = await axios.get(
        `${RECIPE_API_BASE_URL}cuisines/allCuisines`
      );

      return response.data;
    } catch (error) {
      console.log("Error in fetching all cusisine " + error);
    }
  };

  getRecipeByCuisine = async (cuisineName) => {
    try {
      const response = await axios.get(
        `${RECIPE_API_BASE_URL}recipes/Cuisine/Recipes/${cuisineName}`
      );
      return response.data;
    } catch (error) {
      console.log("error in fetching recipe by cuisine " + error);
    }
  };
}

export default new CuisineService();
