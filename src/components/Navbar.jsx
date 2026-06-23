import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {

  const { cart } = useCart();

  const count = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
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

        <Link to="/?section=products">
          Products
        </Link>

        <Link to="/?section=recipes">
          Recipes
        </Link>

        <Link to="/?section=contact">
          Contact
        </Link>

        <Link
          to="/cart"
          className="cart-link"
        >
          Cart ({count})
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;