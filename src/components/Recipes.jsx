import recipes from "../data/recipes";
import { Link } from "react-router-dom";

function Recipes() {
  return (
    <section
      className="recipes"
      id="recipes"
    >

      <h2>Honey Recipes</h2>

      <div className="recipe-grid">

        {recipes.map((recipe) => (

          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="recipe-card"
          >

            <img
              src={recipe.image}
              alt={recipe.title}
            />

            <h3>{recipe.title}</h3>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Recipes;