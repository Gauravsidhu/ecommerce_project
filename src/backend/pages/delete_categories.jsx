import React from "react";
import axios from "axios";

const DeleteCategory = ({ id, updateCategories, setRows }) => {
  const handleDelete = async () => {
    if (!id) {
      console.error("Invalid ID passed to delete function");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
   const response = await axios.delete(`http://localhost:5500/api/categories/deleteCategory/${id}`);

      console.log("Delete response:", response.data);
      alert("Category deleted successfully!");

      // Update parent component state
      if (updateCategories) {
        updateCategories(id);
      }

      if (setRows) {
        setRows(prevRows => prevRows.filter(row => row.id !== id));
      }

    } catch (error) {
      console.error("Error deleting category:", error.response?.data || error.message);
      alert("Failed to delete category. Please try again.");
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteCategory;
