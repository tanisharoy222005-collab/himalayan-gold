// src/components/ProductGrid.jsx

import { Link } from "react-router-dom";
import products from "../data/products";

function ProductGrid() {
  return (
    <section
      className="products"
      id="products"
    >
      <h2>Our Collection</h2>

      <div className="grid">

        {products.map((product) => (

          <div
            className="card"
            key={product.id}
          >

            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.price}</p>

            <Link
              to={`/product/${product.id}`}
            >
              <button>
                View Product
              </button>
            </Link>

          </div>

        ))}

      </div>
    </section>
  );
}

export default ProductGrid;