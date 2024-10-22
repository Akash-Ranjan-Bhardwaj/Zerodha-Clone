// model/HoldingsModel.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for Holdings
const HoldingsSchema = new Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

// Create and export the HoldingsModel
const HoldingsModel = mongoose.model("Holding", HoldingsSchema);

module.exports = HoldingsModel;
