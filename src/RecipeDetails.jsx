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

      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-banner"
      />

      <h1>{recipe.title}</h1>

      <h2>Ingredients (1 Serving)</h2>

      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>

      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

    </div>
  );
}

export default RecipeDetails;