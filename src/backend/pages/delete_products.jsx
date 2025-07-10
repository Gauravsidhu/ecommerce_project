import React from "react";
import axios from "axios";

const DeleteProducts = ({ id, updateCategories }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5500/api/products/${id}`)
        .then(() => {
          alert("✅ Deleted successfully");
          updateCategories(); // Call parent function to refresh data
        })
        .catch((err) => {
          console.error("❌ Error deleting product", err);
        });
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteProducts;
