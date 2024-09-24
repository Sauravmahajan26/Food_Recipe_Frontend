import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RecipeInfo.css";
import RecipeService from "../../services/RecipeService";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { getRecipeById } from "../../store/recipeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";

function RecipeInfo() {
  const [recipe, setRecipe] = useState(null); // Set to null initially
  const [ingredientsData, setIngredientsData] = useState([]); // Separate state for ingredients
  const [stepInstructionsx, setStepInstructionsx] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipeId = useSelector((state) => state.recipes.selectedRecipeId);
  const [fetchedCartData, setFetchedCartData] = useState(null);
  const [added, setAdded] = useState(false); // Track if recipe is added to the cart
  const [cartIDs, setCartIDs] = useState([]); // Store all cart recipe IDs

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart/user127`);
      setFetchedCartData(response.data);

      if (response.data && response.data.items) {
        const recipeIds = response.data.items.map(
          (item) => item.recipe?.recipeId
        );
        setCartIDs(recipeIds); // Set all recipe IDs in the cart
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const isRecipeInCart = cartIDs.includes(recipe?.recipeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchRecipe = async (id) => {
    const response = await RecipeService.getRecipeById(id);
    setRecipe(response.data); // Set the recipe data directly
  };

  const splitIngredient = (ingredientName) => {
    const match = ingredientName.match(
      /^([\d\/\.\-\s]+)?\s*(teaspoon|tablespoons?|cups|cup?)?\s*(.*)$/i
    );

    if (match) {
      let quantity = match[1] ? match[1].trim() : "";
      let unit = match[2] ? match[2].trim() : "";
      let name = match[3] ? match[3].trim() : ingredientName.trim();

      return {
        quantity: `${quantity} ${unit}`.trim(), // Combine quantity and unit
        name: name.trim(),
      };
    }

    return {
      quantity: "", // Default for ingredients without a quantity
      name: ingredientName.trim(),
    };
  };

  const fixSpacing = (instructionData) => {
    const fixedInstruction = instructionData.replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    );
    return fixedInstruction;
  };

  const splitInstruction = (instructionData) => {
    const fixedInstruction = fixSpacing(instructionData);
    const splitInstructions = fixedInstruction.split(/(?<=\.)\s+/);
    return splitInstructions;
  };

  useEffect(() => {
    if (recipe) {
      const splitIngredients = recipe.ingredients.map((item) =>
        splitIngredient(item.ingredientName)
      );
      setIngredientsData(splitIngredients);

      if (recipe.instructions) {
        const splitInstructions = splitInstruction(recipe.instructions);
        setStepInstructionsx(splitInstructions);
      } else {
        console.warn("No instruction found for this recipe");
        setStepInstructionsx([]); // Ensure it’s an empty array
      }
    }
  }, [recipe]);

  const handlepage = () => {
    dispatch(getRecipeById(null));
    navigate("/");
  };

  const addToCart = async (id) => {
    try {
      await axios.post(
        `http://localhost:8080/cart/carts/user127?recipeId=${id}`
      );
      setAdded(true); // Set added to true after successful addition
      toast.success("Recipe added to cart!", {
        position: "top-right",
        autoClose: 3000, // Automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
    if (recipeId) {
      fetchRecipe(recipeId);
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <div className="appinfoblank">
        <IoArrowBackSharp
          className="backarrowinfo"
          onClick={() => handlepage()}
        />

        <Loading />
      </div>
    ); // Show loading state while fetching
  }

  return (
    <div>
      <section className="appinfo">
        <RxCross2 onClick={() => handlepage()} className="cross-back" />
        <div className="details">
          <div className="large-img-wrapper">
            <img
              src={recipe?.recipeImageUrl}
              alt="largeImg"
              className="large-img"
            />
          </div>

          <div className="box">
            <div className="row">
              <h2>{recipe?.recipeName}</h2>
              <span>Prepare In {recipe?.prepTimeInMins} Mins</span>
            </div>
            <div>
              <h6>{recipe?.diet?.dietName}</h6>
              <h6>{recipe?.course?.courseName}</h6>
              <h6>{recipe?.cuisine?.cuisineName}</h6>
            </div>
            <div className="">
              <button className="add-to-cart">Like</button>

              {!isRecipeInCart && !added && (
                <button
                  className={`add-to-cart ${added ? "disable" : ""}`}
                  onClick={() => addToCart(recipe.recipeId)}
                >
                  Add to Recipes
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="continer">
          <div className="row">
            <div className="col table-right">
              <h3 className="container-h3">Ingredients</h3>

              <table className="table-div">
                <thead className="thead-dark">
                  <tr>
                    <th>Ingredients</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientsData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col table-left">
              <h3 className="container-h3">Instructions</h3>
              <table className="table-div">
                <thead className="thead-dark">
                  <tr>
                    <th>Steps</th>
                  </tr>
                </thead>
                <tbody>
                  {stepInstructionsx.map((instruction, index) => (
                    <tr key={index}>
                      <td>{instruction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecipeInfo;
