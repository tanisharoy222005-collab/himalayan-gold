import { useState } from "react";
import { supabase } from "./supabaseClient";

function TrackOrder() {

  const [trackingId, setTrackingId] =
    useState("");

  const [order, setOrder] =
    useState(null);

  const searchTracking =
    async () => {

      const { data, error } =
        await supabase
          .from("orders")
          .select("*")
          .eq(
            "tracking_id",
            trackingId
          )
          .single();

      if (error) {
        alert(
          "Tracking ID not found"
        );
        return;
      }

      setOrder(data);
    };

  const getStep = () => {

    if (!order) return 0;

    switch (
      order.shipping_status
    ) {

      case "Awaiting Payment":
        return 1;

      case "Pickup Scheduled":
        return 3;

      case "Shipped":
        return 4;

      case "Delivered":
        return 5;

      default:
        return 1;
    }
  };

  const currentStep =
    getStep();

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >

      <h1>
        Track Your Order
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom:
            "20px"
        }}
      >

        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) =>
            setTrackingId(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: "12px"
          }}
        />

        <button
          onClick={
            searchTracking
          }
        >
          Track
        </button>

      </div>

      {order && (

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "12px",
            padding: "25px"
          }}
        >

          <h2>
            Order Details
          </h2>

          <p>
            <strong>
              Order ID:
            </strong>{" "}
            {order.order_id}
          </p>

          <p>
            <strong>
              Tracking ID:
            </strong>{" "}
            {order.tracking_id}
          </p>

          <p>
            <strong>
              Customer:
            </strong>{" "}
            {order.name}
          </p>

          <p>
            <strong>
              Shipping Status:
            </strong>{" "}
            {
              order.shipping_status
            }
          </p>

          <p>
            <strong>
              Estimated Delivery:
            </strong>{" "}
            {
              order.estimated_delivery ||
              "5-7 Business Days"
            }
          </p>

          <p>
            <strong>
              Courier Partner:
            </strong>{" "}
            {
              order.courier_name ||
              "Not Yet Connected"
            }
          </p>

          <hr />

          <h3>
            Shipment Timeline
          </h3>

          <div
            style={{
              marginTop:
                "20px",
              fontSize:
                "18px"
            }}
          >

            <p>
              {currentStep >= 1
                ? "✅"
                : "⬜"}{" "}
              Order Placed
            </p>

            <p>
              {currentStep >= 2
                ? "✅"
                : "⬜"}{" "}
              Payment Verified
            </p>

            <p>
              {currentStep >= 3
                ? "✅"
                : "⬜"}{" "}
              Pickup Scheduled
            </p>

            <p>
              {currentStep >= 4
                ? "✅"
                : "⬜"}{" "}
              In Transit
            </p>

            <p>
              {currentStep >= 5
                ? "✅"
                : "⬜"}{" "}
              Delivered
            </p>

          </div>

          <hr />

          <h3>
            Latest Update
          </h3>

          {order.shipping_status ===
          "Awaiting Payment" && (

            <p>
              Waiting for payment
              verification from
              admin team.
            </p>

          )}

          {order.shipping_status ===
          "Pickup Scheduled" && (

            <p>
              Payment confirmed.
              Pickup request has
              been created and
              courier assignment
              is in progress.
            </p>

          )}

          {order.shipping_status ===
          "Shipped" && (

            <p>
              Your package has left
              our warehouse and is
              currently in transit.
            </p>

          )}

          {order.shipping_status ===
          "Delivered" && (

            <p>
              Your order has been
              delivered successfully.
              Thank you for shopping
              with Himalayan Gold.
            </p>

          )}

          {!order.courier_name && (

            <div
              style={{
                marginTop:
                  "20px",
                padding:
                  "15px",
                background:
                  "#fff8e1",
                border:
                  "1px solid #ffd54f",
                borderRadius:
                  "8px"
              }}
            >

              <strong>
                Demo Mode
              </strong>

              <p>
                Live courier
                integration with
                Shiprocket /
                Delhivery has not
                been connected yet.

                Tracking updates
                shown here are
                simulated for
                demonstration.
              </p>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default TrackOrder;