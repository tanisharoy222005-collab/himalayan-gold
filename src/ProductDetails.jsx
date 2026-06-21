import { useParams } from "react-router-dom";
import products from "./data/products";
import { useCart } from "./context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    item => item.id === Number(id)
  );

  if(!product){
    return <h1>Product Not Found</h1>;
  }

  return (
    <div className="product-page">

      <div className="product-gallery">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="product-info">

        <div className="product-tag">
          Bestseller
        </div>

        <h1>
          {product.name}
        </h1>

        <h2>
          {product.price}
        </h2>

        <p>
          <strong>Origin:</strong>{" "}
          {product.origin}
        </p>

        <p>
          <strong>Weight:</strong>{" "}
          {product.weight}
        </p>

        <br />

        <p>
          {product.description}
        </p>

        <ul className="product-features">

          <li>
            100% Raw Himalayan Honey
          </li>

          <li>
            No Added Sugar
          </li>

          <li>
            Lab Tested
          </li>

          <li>
            Rich In Antioxidants
          </li>

        </ul>

        <button
          onClick={() =>
            addToCart(product)
          }
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;