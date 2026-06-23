import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./supabaseClient";

function Checkout() {

  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: ""
  });

  const total = cart.reduce(
    (sum, item) =>
      sum +
      parseInt(item.price.replace("₹", "")) *
      item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderId = "HG" + Date.now();

    // Insert order into Supabase
    const { error } = await supabase.from("orders").insert([
      {
        order_id: orderId,
        user_email: form.email,
        name: form.name,
        phone: form.phone,
        address: form.address,
        amount: total,
        payment_status: "Pending",
        shipping_status: "Awaiting Payment",
        tracking_id: "Pending"
      }
    ]);

    if (error) {
      console.error(error);
      alert("Error placing order");
      return;
    }

    // Insert order items
    const items = cart.map(item => ({
      order_id: orderId,
      product_name: item.name,
      price: parseInt(item.price.replace("₹", "")),
      quantity: item.quantity
    }));

    await supabase.from("order_items").insert(items);

    clearCart();

    alert(
      `Order Created Successfully!\n\nOrder ID: ${orderId}\n\nPlease complete payment using QR code.`
    );

    navigate("/track-order");
  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <h2>Total: ₹{total}</h2>

      {/* QR PAYMENT SECTION */}
      <div style={{ margin: "20px 0" }}>
        <h3>Scan & Pay</h3>
        <img
          src="/qr.png"
          alt="QR Payment"
          style={{ width: "200px" }}
        />
        <p>After payment, admin will verify your order.</p>
      </div>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Full Name"
          value={form.name}
          required
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          required
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          placeholder="Address"
          value={form.address}
          required
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <button type="submit">
          Place Order
        </button>

      </form>

    </div>
  );
}

export default Checkout;