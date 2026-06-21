import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const total = cart.reduce(
    (sum,item) =>
      sum +
      parseInt(
        item.price.replace("₹","")
      ) *
      item.quantity,
    0
  );

  if(cart.length === 0){

    return (
      <div className="empty-cart">

        <h2>
          Your Cart Is Empty
        </h2>

        <Link to="/">
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>
        Shopping Cart
      </h1>

      {cart.map(item => (

        <div
          key={item.id}
          className="cart-item"
        >

          <img
            src={item.image}
            alt={item.name}
          />

          <div>

            <h3>
              {item.name}
            </h3>

            <p>
              {item.price}
            </p>

            <div className="quantity-box">

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <h2>
        Total: ₹{total}
      </h2>

      <Link
        to="/checkout"
        className="checkout-btn"
      >
        Proceed To Checkout
      </Link>

    </div>
  );
}

export default Cart;