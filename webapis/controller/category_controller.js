// controllers/categoryController.js
const mongoose = require("mongoose");
const Category = require("../model/category.js");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch child categories if parent_id exists
    let childCategories = [];
    if (category.parent_id) {
      childCategories = await Category.find({ parent_id: category.parent_id });
    }

    res.status(200).json({ category, childCategories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};


// Get child categories
const getChildCategories = async (req, res) => {
  try {
    const parentId = req.params.id;
    const childCategories = await Category.find({ parent_id: parentId });

    if (!childCategories.length) {
      return res.status(404).json({ message: "No child categories found." });
    }

    res.json({ childCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Add a new category
const addCategory = async (req, res) => {
  try {
    const { name, parent_id } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    let validParentId = null;
    if (parent_id && mongoose.Types.ObjectId.isValid(parent_id)) {
      validParentId = parent_id;
    }

    const newCategory = new Category({ name, parent_id: validParentId });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Error adding category", error });
  }
};

// Update category

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, parent_id, child_categories } = req.body;
    // child_categories expected as array of objects: [{ _id: '...', name: '...' }, ...]

    // Fetch existing category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Update category name if provided
    if (name) category.name = name;

    // Update parent_id explicitly (null if no parent)
    if (typeof parent_id !== "undefined") {
      category.parent_id = parent_id ? parent_id : null;
    }

    // Save updated category
    await category.save();

    // Only update children if this category is a parent (no parent_id)
    if (!category.parent_id && Array.isArray(child_categories)) {
      // Extract child IDs for those supposed to remain children
      const childIds = child_categories
        .filter((c) => c._id)
        .map((c) => new mongoose.Types.ObjectId(c._id));

      // Unset parent_id for categories no longer children of this parent
      await Category.updateMany(
        { parent_id: category._id, _id: { $nin: childIds } },
        { $unset: { parent_id: "" } }
      );

      // Update each child category's name and parent_id
      const updatePromises = child_categories.map((child) => {
        if (!child._id) return null; // skip invalid child

        return Category.findByIdAndUpdate(
          child._id,
          {
            name: child.name,
            parent_id: category._id,
          },
          { new: true }
        );
      });

      await Promise.all(updatePromises);
    }

    res.status(200).json({
      message: "Category and child categories updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If parent category, delete its children too
    if (category.parent_id === null) {
      await Category.deleteMany({ parent_id: id });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getChildCategories,
  addCategory,
  updateCategory,
  deleteCategory
};
