const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { items, form } = req.body;

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'inr',
      unit_amount: item.price * 100,
      product_data: {
        name: item.name || 'Product',
      },
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineItems,
    success_url: 'http://localhost:3000/checkout?status=success&session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/checkout?status=cancel',
    metadata: Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, String(value)])
    )
  });

  res.json({ id: session.id });
});

module.exports = router;
