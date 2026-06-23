import { useAuth } from "./context/AuthContext";

export default function Profile() {

  const {
    user,
    logout
  } = useAuth();

  if (!user) {

    return (
      <h2>
        Please login first.
      </h2>
    );

  }

  const orders =
    JSON.parse(
      localStorage.getItem(
        "orders"
      )
    ) || [];

  const myOrders =
    orders.filter(
      order =>
        order.email ===
        user.email
    );

  return (
    <div className="container">

      <h2>
        My Profile
      </h2>

      <p>
        <strong>
          Name:
        </strong>
        {" "}
        {user.name}
      </p>

      <p>
        <strong>
          Email:
        </strong>
        {" "}
        {user.email}
      </p>

      <button
        onClick={logout}
      >
        Logout
      </button>

      <hr />

      <h2>
        My Orders
      </h2>

      {myOrders.map(
        order => (

        <div
          key={
            order.orderId
          }
        >

          <p>
            Order ID:
            {" "}
            {order.orderId}
          </p>

          <p>
            Tracking:
            {" "}
            {order.trackingId}
          </p>

          <p>
            Amount:
            ₹{order.amount}
          </p>

          <p>
            Payment:
            {" "}
            {
              order.paymentStatus
            }
          </p>

          <p>
            Shipping:
            {" "}
            {
              order.shippingStatus
            }
          </p>

          <hr />

        </div>

      ))}

    </div>
  );
}