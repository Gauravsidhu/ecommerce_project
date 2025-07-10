const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  childCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  image: { type: String }, // single image
  multipleImages: [String], // array of image filenames
  description: { type: String }

});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
