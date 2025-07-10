const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.Mongo_uri;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
