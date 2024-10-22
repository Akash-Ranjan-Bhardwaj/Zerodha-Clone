// models/wallet.js
const mongoose = require('mongoose');

// Define the Wallet schema
const walletSchema = new mongoose.Schema({
  // MongoDB will automatically create an `_id` field
  margin: {
    type: String, // Assuming margin is stored as a string; change to Number if needed
    required: true,
  },
});

// Create the Wallet model
const Wallet = mongoose.model('Wallet', walletSchema);

// Export the Wallet model
module.exports = Wallet;
