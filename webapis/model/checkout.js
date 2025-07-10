// models/Checkout.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  country: String,
  firstName: String,
  lastName: String,
  companyName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  phone: String,

  // Stripe transaction fields
  transactionId: String,
  paymentIntentId: String,
  paymentStatus: String,
  amountPaid: Number,
  currency: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Checkout', checkoutSchema);
