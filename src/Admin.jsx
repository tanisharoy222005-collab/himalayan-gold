import { useState, useEffect } from "react";

function Admin() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(savedOrders);

  }, []);

  const approvePayment = (
    index
  ) => {

    const updatedOrders =
      [...orders];

    updatedOrders[index]
      .paymentStatus =
      "Paid";

    updatedOrders[index]
      .shippingStatus =
      "Processing";

    if (
      !updatedOrders[index]
        .trackingId ||
      updatedOrders[index]
        .trackingId ===
      "Pending"
    ) {

      updatedOrders[index]
        .trackingId =
        "TRK" +
        Math.floor(
          100000 +
          Math.random() *
          900000
        );
    }

    setOrders(
      updatedOrders
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(
        updatedOrders
      )
    );
  };

  const updateShipping =
    (
      index,
      value
    ) => {

      const updatedOrders =
        [...orders];

      updatedOrders[index]
        .shippingStatus =
        value;

      setOrders(
        updatedOrders
      );

      localStorage.setItem(
        "orders",
        JSON.stringify(
          updatedOrders
        )
      );
    };

  return (
    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>
        Admin Dashboard
      </h1>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >

        <thead>

          <tr>

            <th>
              Order ID
            </th>

            <th>
              Customer
            </th>

            <th>
              Email
            </th>

            <th>
              Amount
            </th>

            <th>
              Payment
            </th>

            <th>
              Shipping
            </th>

            <th>
              Tracking
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (
              order,
              index
            ) => (

            <tr
              key={
                order.orderId
              }
            >

              <td>
                {
                  order.orderId
                }
              </td>

              <td>
                {order.name}
              </td>

              <td>
                {order.email}
              </td>

              <td>
                ₹
                {
                  order.amount
                }
              </td>

              <td>
                {
                  order.paymentStatus
                }
              </td>

              <td>

                <select
                  value={
                    order.shippingStatus
                  }
                  onChange={e =>
                    updateShipping(
                      index,
                      e.target
                        .value
                    )
                  }
                >

                  <option>
                    Awaiting Payment
                  </option>

                  <option>
                    Processing
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
                  order.trackingId
                }
              </td>

              <td>

                {order
                  .paymentStatus !==
                "Paid" ? (

                  <button
                    onClick={() =>
                      approvePayment(
                        index
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