import { useNavigate } from "react-router-dom";
import "./CuisineRecipeCard.css";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../../store/recipeSlice";

function CuisineRecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePage = (id) => {
    console.log(id);

    dispatch(getRecipeById(id));
    navigate("/recipeInfo");
  };

  return (
    <>
      <div onClick={() => handlePage(recipe.recipeId)}>
        <div className="card">
          <img src={recipe.recipeImageUrl} className="cardC-image" alt="" />
          <div className="card__content">
            <p className="card__title">{recipe.recipeName}</p>
            <p className="card__description">{recipe.course.courseName}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CuisineRecipeCard;
