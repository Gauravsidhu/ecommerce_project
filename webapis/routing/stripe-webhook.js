const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Checkout = require('../model/checkout');

// Stripe Webhook Endpoint Secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe Webhook Handler
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  console.log("⚡ Webhook received"); // ✅ add this

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log("✅ Stripe Session:", session); // ✅ add this
    console.log("✅ Metadata:", session.metadata); // ✅ add this

    const formData = session.metadata;

    const newCheckout = new Checkout({
      country: formData.country || '',
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      companyName: formData.companyName || '',
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      zip: formData.zip || '',
      email: formData.email || '',
      phone: formData.phone || '',
      transactionId: session.id,
      paymentIntentId: session.payment_intent,
      paymentStatus: session.payment_status,
      amountPaid: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency || 'INR',
    });

    try {
      await newCheckout.save();
      console.log('✅ Payment + form data saved to DB');
    } catch (error) {
      console.error('❌ Error saving to DB:', error);
    }
  }

  res.status(200).json({ received: true });
});


module.exports = router;
