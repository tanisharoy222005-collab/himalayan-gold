import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function Admin() 
{
const [orders, setOrders] = useState([]);

useEffect(() => {
fetchOrders();
}, []);

async function fetchOrders() {
const { data, error } = await supabase
.from("orders")
.select("*")
.order("created_at", { ascending: false });

if (error) {
  console.error(error);
  return;
}

setOrders(data || []);

}

async function approvePayment(order) {


const trackingId =
  "HGTRK-" +
  Math.floor(
    100000 +
    Math.random() * 900000
  );

const couriers = [
  "Shiprocket",
  "Delhivery",
  "Blue Dart",
  "DTDC",
  "Xpressbees"
];

const courier =
  couriers[
    Math.floor(
      Math.random() *
      couriers.length
    )
  ];

const deliveryDate =
  new Date();

deliveryDate.setDate(
  deliveryDate.getDate() + 5
);

const estimatedDelivery =
  deliveryDate.toDateString();

const { error } =
  await supabase
    .from("orders")
    .update({
      payment_status: "Paid",
      shipping_status:
        "Pickup Scheduled",
      tracking_id:
        trackingId,
      courier_name:
        courier,
      estimated_delivery:
        estimatedDelivery
    })
    .eq(
      "order_id",
      order.order_id
    );

if (error) {
  console.error(error);
  alert(
    "Error updating order"
  );
  return;
}

alert(
  `Payment Approved


Tracking ID:
${trackingId}

Courier:
${courier}

Estimated Delivery:
${estimatedDelivery}`
);


fetchOrders();


}

async function updateShipping(
orderId,
status
) {


const { error } =
  await supabase
    .from("orders")
    .update({
      shipping_status:
        status
    })
    .eq(
      "order_id",
      orderId
    );

if (error) {
  console.error(error);
  return;
}

fetchOrders();


}

return (
<div
style={{
padding: "30px"
}}
> <h1>
Admin Dashboard </h1>

```
  <table
    border="1"
    cellPadding="10"
    width="100%"
  >
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Customer</th>
        <th>Email</th>
        <th>Amount</th>
        <th>Payment</th>
        <th>Shipping</th>
        <th>Tracking</th>
        <th>Courier</th>
        <th>Delivery</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {orders.map(
        (order) => (

        <tr
          key={
            order.order_id
          }
        >

          <td>
            {
              order.order_id
            }
          </td>

          <td>
            {order.name}
          </td>

          <td>
            {
              order.user_email
            }
          </td>

          <td>
            ₹{order.amount}
          </td>

          <td>
            {
              order.payment_status
            }
          </td>

          <td>

            <select
              value={
                order.shipping_status
              }
              onChange={(e) =>
                updateShipping(
                  order.order_id,
                  e.target.value
                )
              }
            >

              <option>
                Awaiting Payment
              </option>

              <option>
                Pickup Scheduled
              </option>

              <option>
                Shipped
              </option>

              <option>
                Delivered
              </option>

            </select>

          </td>

          <td>
            {
              order.tracking_id ||
              "Pending"
            }
          </td>

          <td>
            {
              order.courier_name ||
              "-"
            }
          </td>

          <td>
            {
              order.estimated_delivery ||
              "-"
            }
          </td>

          <td>

            {order.payment_status !==
            "Paid" ? (

              <button
                onClick={() =>
                  approvePayment(
                    order
                  )
                }
              >
                Confirm Payment
              </button>

            ) : (

              "Approved"

            )}

          </td>

        </tr>

      ))}

    </tbody>

  </table>
</div>


);
}

export default Admin;
