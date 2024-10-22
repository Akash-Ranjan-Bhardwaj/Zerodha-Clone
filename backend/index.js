const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
require("dotenv").config(); // Load environment variables
const { OrdersModel } = require("./model/OrdersModel");
const HoldingsModel = require("./model/HoldingsModel"); // Correct import of the model
const PositionsModel = require("./model/PositionsModel"); // Ensure this path is correct
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple route 
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define route to get all holdings
app.get("/api/holdings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find(); // Fetch holdings from the database
    res.json(holdings); // Send holdings as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Function to get all orders from the database
app.get("/api/orders", async (req, res) => {
  try {
    const ordersData = await OrdersModel.find();
    res.json(ordersData);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Server error");
  }
});

// Endpoint to get financial data (margin available, current value, investment)
app.get("/api/financial-data", async (req, res) => {
  try {
    // Fetch holdings and calculate current value and investment
    const holdings = await HoldingsModel.find();
    const orders = await OrdersModel.find(); // Add any calculations needed for orders

    const investment = holdings.reduce((acc, holding) => acc + (holding.avg * holding.qty), 0);
    const currentValue = holdings.reduce((acc, holding) => acc + (holding.price * holding.qty), 0);
    const marginsUsed = orders.reduce((acc, order) => acc + order.price * order.qty, 0); // Adjust as needed

    const marginAvailable = currentValue - marginsUsed; // Calculate margin available

    res.json({
      marginAvailable,
      currentValue,
      investment,
      marginsUsed,
    });
  } catch (err) {
    console.error("Error fetching financial data:", err);
    res.status(500).send("Server error");
  }
});

// Create a new order
app.post("/api/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  try {
    await newOrder.save();
    res.send("Order saved!");
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Error saving order");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
