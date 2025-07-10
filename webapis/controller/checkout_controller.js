const Checkout = require('../model/checkout');

exports.createCheckout = async (req, res) => {
  try {
    const {
      country,
      firstName,
      lastName,
      companyName,
      address,
      city,
      state,
      zip,
      email,
      phone,
      transactionId,
      paymentIntentId,
      paymentStatus,
      amountPaid,
      currency
    } = req.body;

    const newEntry = new Checkout({
      country,
      firstName,
      lastName,
      companyName,
      address,
      city,
      state,
      zip,
      email,
      phone,
      transactionId,
      paymentIntentId,
      paymentStatus,
      amountPaid,
      currency
    });

    await newEntry.save();
    res.status(201).json({ message: 'Checkout data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while saving checkout details.' });
  }
};
