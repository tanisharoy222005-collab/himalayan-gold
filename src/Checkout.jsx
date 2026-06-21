import { useState } from "react";

function Checkout() {

  const [form,setForm] =
    useState({
      name:"",
      email:"",
      address:""
    });

  const handleSubmit = e => {
    e.preventDefault();

    alert(
      "Order placed successfully!"
    );
  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <form
        onSubmit={handleSubmit}
      >

        <input
          placeholder="Full Name"
          required
          onChange={e =>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          required
          onChange={e =>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <textarea
          placeholder="Address"
          required
          onChange={e =>
            setForm({
              ...form,
              address:e.target.value
            })
          }
        />

        <button>
          Place Order
        </button>

      </form>

    </div>
  );
}

export default Checkout;