import { useParams } from "react-router-dom";
import recipes from "./data/recipes";

function RecipeDetails() {
  const { id } = useParams();

  const recipe = recipes.find(
    (item) => item.id === Number(id)
  );

  if (!recipe) {
    return <h1>Recipe Not Found</h1>;
  }

  return (
    <div className="recipe-page">

      <div className="recipe-layout">

        <div className="recipe-image-section">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-banner"
          />
        </div>

        <div className="recipe-content-section">

          <div className="recipe-tag">
            🍯 Himalayan Honey Recipe
          </div>

          <h1>{recipe.title}</h1>

          <div className="recipe-card">

            <h2>⭐ Ingredients</h2>

            <ul className="ingredient-list">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>
                  ✓ {item}
                </li>
              ))}
            </ul>

          </div>

          <div className="recipe-card">

            <h2>📝 Instructions</h2>

            <ol className="instruction-list">
              {recipe.steps.map((step, index) => (
                <li key={index}>
                  {step}
                </li>
              ))}
            </ol>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecipeDetails;