import recipes from "../data/recipes";
import { Link } from "react-router-dom";

function Recipes() {
  return (
    <section
      className="recipes"
      id="recipes"
    >
      <h2>Himalayan Honey Recipes</h2>

      <div className="grid">

        {recipes.map((recipe) => (

          <div
            className="card"
            key={recipe.id}
          >

            <img
              src={recipe.image}
              alt={recipe.title}
            />

            <div className="card-content">

              <h3>{recipe.title}</h3>

              <Link
                to={`/recipe/${recipe.id}`}
              >
                <button>
                  View Recipe
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}

export default Recipes;