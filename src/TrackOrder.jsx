import { useState } from "react";

function TrackOrder() {

  const [orderId,
    setOrderId] =
    useState("");

  const [order,
    setOrder] =
    useState(null);

  const searchOrder =
    () => {

      const orders =
        JSON.parse(
          localStorage.getItem(
            "orders"
          )
        ) || [];

      const found =
        orders.find(
          item =>
            item.orderId ===
            orderId
        );

      setOrder(found);
    };

  return (
    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>
        Track Order
      </h1>

      <input
        placeholder="Enter Order ID"
        value={orderId}
        onChange={e =>
          setOrderId(
            e.target.value
          )
        }
      />

      <button
        onClick={
          searchOrder
        }
      >
        Search
      </button>

      {order && (

        <div
          style={{
            marginTop:
              "20px"
          }}
        >

          <h2>
            {
              order.orderId
            }
          </h2>

          <p>
            Tracking ID:
            {" "}
            {
              order.trackingId
            }
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

          <p>
            ✓ Order
            Placed
          </p>

          {order
            .paymentStatus ===
          "Paid" && (
            <p>
              ✓ Payment
              Verified
            </p>
          )}

          {(order
            .shippingStatus ===
            "Processing" ||
            order
              .shippingStatus ===
              "Shipped" ||
            order
              .shippingStatus ===
              "Delivered") && (
            <p>
              ✓ Processing
            </p>
          )}

          {(order
            .shippingStatus ===
            "Shipped" ||
            order
              .shippingStatus ===
              "Delivered") && (
            <p>
              ✓ Shipped
            </p>
          )}

          {order
            .shippingStatus ===
            "Delivered" && (
            <p>
              ✓ Delivered
            </p>
          )}

        </div>

      )}

    </div>
  );
}

export default TrackOrder;