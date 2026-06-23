require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const orderRoutes =
require("./routes/orders");

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {

  res.send(
    "Himalayan Gold Backend Running"
  );

});

app.listen(
  process.env.PORT || 5000,
  () => {

    console.log(
      "Server Running"
    );

  }
);