const mongoose = require("mongoose");
const Product = require("../model/products");
const path = require('path');
const fs = require('fs');  // Also make sure fs is imported if you use fs.unlinkSync

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("parentCategory", "name")
      .populate("childCategory", "name");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const getProductsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ parentCategory: categoryId });

    const host = req.protocol + "://" + req.get("host");
    const updatedProducts = products.map(product => ({
      ...product._doc,
      image: product.image ? `${host}/product_single_images/${product.image}` : null,
      multipleImages: product.multipleImages.map(img => `${host}/product_multiple_images/${img}`),
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category", error });
  }
};

// controllers/products_controller.js
const addProduct = async (req, res) => {
  try {
    const { parentCategory, childCategory, price, description } = req.body;


    // Single image
    const singleImage = req.files["image"] ? req.files["image"][0].filename : null;

    // Multiple images
    const multipleImages = req.files["multipleImages"]
      ? req.files["multipleImages"].map(file => file.filename)
      : [];

    const newProduct = new Product({
      parentCategory,
      childCategory,
      price: parseFloat(price),
      image: singleImage,
      multipleImages,
      description   // ← Add this line
    });


    await newProduct.save();
    return res.status(201).json({ message: "✅ Product added", product: newProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "❌ Failed to add product" });
  }
};

// ✅ Get All Products Function
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("parentCategory", "name")
      .populate("childCategory", "name");

    const host = req.protocol + "://" + req.get("host");

    const updatedProducts = products.map(product => ({
      ...product._doc,
      image: product.image ? `${host}/product_single_images/${product.image}` : null,
      multipleImages: product.multipleImages.map(img => `${host}/product_multiple_images/${img}`),
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "❌ Error fetching products", error });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields from request body
    product.parentCategory = req.body.parentCategory || product.parentCategory;
    product.childCategory = req.body.childCategory || product.childCategory;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;

    // Handle single image update
    if (req.files && req.files["image"] && req.files["image"][0]) {
      // Delete old image if exists
      if (product.image) {
        const oldImagePath = path.join(__dirname, "../product_single_images", product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      product.image = req.files["image"][0].filename;
    }

    // Handle multiple images update
    if (req.files && req.files.multipleImages) {
      // Delete old multiple images if exist
      if (product.multipleImages && product.multipleImages.length > 0) {
        product.multipleImages.forEach((img) => {
          const oldMultiImagePath = path.join(__dirname, "../backend/product_multiple_images", img);
          if (fs.existsSync(oldMultiImagePath)) {
            fs.unlinkSync(oldMultiImagePath);
          }
        });
      }

      // Save new multiple images filenames array
      // req.files.multipleImages is an array of uploaded files
      product.multipleImages = req.files.multipleImages.map(file => file.filename);
    }

    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error while updating product" });
  }
};

// ✅ DELETE Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "❌ Error deleting product", error });
  }
};

// Exporting the functions at the end
module.exports = { getProductById, addProduct, getAllProducts, updateProduct, deleteProduct , getProductsByCategoryId };
