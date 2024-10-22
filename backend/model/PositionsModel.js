const { Schema, model } = require("mongoose");

// Define the schema for positions
const PositionsSchema = new Schema({
  product: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: { type: String, required: true },
  day: { type: String, required: true },
  isLoss: { type: Boolean, required: true },
});

// Create the model from the schema
const PositionsModel = model("Position", PositionsSchema);

// Export the model
module.exports = PositionsModel;  // <-- Change to this
