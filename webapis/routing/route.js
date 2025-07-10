const express = require('express');
const routing = express.Router();
const upload = require("../middlewares/upload");

const { register, login } = require('../controller/food_controller');
const {
  getAllCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getChildCategories
} = require('../controller/category_controller');

const {
  getProductById,
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId
} = require("../controller/products_controller");

const { createCheckout } = require('../controller/checkout_controller');

const { createContact } = require("../controller/contact_controller");


// Auth routes
routing.post("/auth/register", register);
routing.post("/auth/login", login);

// Category routes
routing.get("/categories", getAllCategories);
routing.post("/categories", addCategory);
routing.get("/categories/:id", getCategoryById);
routing.get("/categories/child/:id", getChildCategories);
routing.put("/categories/updateCategory/:id", updateCategory);
routing.delete("/categories/deleteCategory/:id", deleteCategory);

// Product image routes
routing.post(
  '/products',
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "multipleImages", maxCount: 10 }
  ]),
  addProduct
);

routing.put(
  '/products/:id',
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "multipleImages", maxCount: 10 }
  ]),
  updateProduct
);

routing.get('/products', getAllProducts);
routing.get('/products/:id', getProductById);
routing.delete('/products/:id', deleteProduct);
routing.get("/products/category/:categoryId", getProductsByCategoryId);

routing.post('/checkout', createCheckout);

routing.post("/contact", createContact);

module.exports = {
  routing,
  upload
};
