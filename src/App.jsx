import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function Admin() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }
  };

  const approvePayment = async (order) => {

    const trackingId =
      "TRK" + Math.floor(100000 + Math.random() * 900000);

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: "Paid",
        shipping_status: "Processing",
        tracking_id: trackingId
      })
      .eq("order_id", order.order_id);

    if (error) {
      console.error(error);
      return;
    }

    alert("Payment Approved & Tracking ID Generated");

    fetchOrders();
  };

  const updateShipping = async (orderId, value) => {

    const { error } = await supabase
      .from("orders")
      .update({
        shipping_status: value
      })
      .eq("order_id", orderId);

    if (error) {
      console.error(error);
      return;
    }

    fetchOrders();
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Admin Dashboard</h1>

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
            <th>Screenshot</th>
            <th>Shipping</th>
            <th>Tracking</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>{order.order_id}</td>

              <td>{order.name}</td>

              <td>{order.user_email}</td>

              <td>₹{order.amount}</td>

              <td>{order.payment_status}</td>

              <td>

                {order.payment_screenshot ? (
                  <a
                    href={order.payment_screenshot}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Screenshot
                  </a>
                ) : (
                  "No Upload"
                )}

              </td>

              <td>

                <select
                  value={order.shipping_status}
                  onChange={(e) =>
                    updateShipping(order.order_id, e.target.value)
                  }
                >

                  <option>Awaiting Payment</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>

                </select>

              </td>

              <td>{order.tracking_id || "Pending"}</td>

              <td>

                {order.payment_status !== "Paid" ? (
                  <button
                    onClick={() => approvePayment(order)}
                  >
                    Approve Payment
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