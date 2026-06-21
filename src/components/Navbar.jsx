import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total,item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        Himalayan Gold
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/">
          Products
        </Link>

        <Link to="/">
          Recipes
        </Link>

        <Link to="/">
          Contact
        </Link>

        <Link
          to="/cart"
          className="cart-link"
        >
          Cart ({totalItems})
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;