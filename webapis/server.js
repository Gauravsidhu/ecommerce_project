// ✅ Load environment variables
require('dotenv').config();

// ✅ Core imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const sessionDetails = require('./routing/session-details'); // ✅ Adjust if needed


const app = express();
const port = 5500;

// ✅ Route imports
const sessionRoutes = require('./routing/create-checkout-session');       // /create-checkout-session
const webhookRoutes = require('./routing/stripe-webhook');       // /webhook
const { routing } = require('./routing/route');          // Other API routes
// Mongoose model

// ✅ CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/', sessionDetails);

// ⚠️ Stripe Webhook MUST use raw body before any express.json()
app.use('/webhook', webhookRoutes); // Uses bodyParser.raw inside this file

// ✅ JSON middleware AFTER /webhook
app.use(express.json());

// ✅ Static files
app.use('/product_single_images', express.static('product_single_images'));
app.use('/product_multiple_images', express.static('product_multiple_images'));

// ✅ API and Stripe session routes
app.use('/api', routing);
app.use('/', sessionRoutes);

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('✅ Server is running and connected.');
});

// ✅ Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
  });
});
