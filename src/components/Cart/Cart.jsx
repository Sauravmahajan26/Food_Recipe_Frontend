import React, { useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, recipePath } from "../../store/recipeSlice";
import { setCartItems, removeItemFromCart } from "../../store/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);

  // Fetch cart details from backend
  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`http://foodrecipebackend-production-9ab7.up.railway.app/cart/user127`);
      dispatch(setCartItems(response.data.items)); // Store fetched cart items in Redux
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  };

  // Remove item from cart and update Redux
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cart/user127/item/${id}`);
      dispatch(removeItemFromCart(id)); // Remove item from Redux store
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const goToRecipe = (id, cartid) => {
    dispatch(getRecipeById(id));
    dispatch(recipePath(cartid));
    navigate("/recipeInfo");
  };

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Name</p>
            <p>Cuisine</p>
            <p>Diet</p>
            <p>Course</p>
            <p>Recipe</p>
            <p>Remove</p>
          </div>
        </div>

        <hr />

        {cartData.length > 0 ? (
          cartData.map((item, index) => (
            <div className="cart-items-title cart-items-item" key={index}>
              <p>{item.recipe.recipeName}</p>
              <p>{item.recipe.cuisine.cuisineName}</p>
              <p>{item.recipe.diet.dietName}</p>
              <p>{item.recipe.course.courseName}</p>
              <p
                onClick={() =>
                  goToRecipe(item.recipe.recipeId, item.cartItemId)
                }
              >
                <button className="btn">Recipe</button>
              </p>
              <p
                onClick={() => removeFromCart(item.cartItemId)}
                className="cross"
              >
                x
              </p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}

        <hr />
      </div>
    </>
  );
}

export default Cart;
