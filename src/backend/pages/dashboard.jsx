import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import axios from "axios";
import DeleteCategory from "../pages/delete_categories"; // Import DeleteCategory component

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [rows, setRows] = useState([]); // Table rows: { parent, child }
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
    fetchCategories();
  }, [navigate]);

  // Fetch categories from the backend and group them as parent and their children
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/categories');
      const data = response.data;

      console.log("Categories:", data);
      const parentCategories = data.filter(cat => cat.parent_id === null);

      let tableRows = [];

      parentCategories.forEach(parent => {
        // Find all child categories of the parent
        const children = data.filter(cat => cat.parent_id === parent._id);

        if (children.length > 0) {
          children.forEach(child => {
            tableRows.push({
              id: parent._id,
              parent: parent.name, // Always show the parent name
              child: child.name, // Show child category name
            });
          });
        } else {
          // If no children, show "No Child"
          tableRows.push({
            id: parent._id,
            parent: parent.name,
            child: "No Child",
          });
        }
      });

      setRows(tableRows);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    console.log("Attempting to delete category with ID:", id);
    if (!id) {
      console.error("Invalid ID passed to delete function");
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5500/api/auth/deleteCategory/${id}`);
      console.log("Delete response:", response.data);
      setRows(prevRows => prevRows.filter(row => row.id !== id)); // Update rows after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      <div className="layout-fixed sidebar-expand-lg bg-body-tertiary">
        <div className="app-wrapper">
          <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
            <div className="sidebar-brand">
              <Link to="#" className="brand-link">
                <p>Welcome, <strong>{username}</strong></p>
              </Link>
            </div>
            <div className="sidebar-wrapper">
              <nav className="mt-2">
                <ul className="nav sidebar-menu flex-column">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      <i className="nav-icon bi bi-folder"></i>
                      <p>Catalogs</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/products" className="nav-link">
                      <i className="nav-icon bi bi-bag"></i>
                      <p>Products</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={handleLogout}>
                      <i className="nav-icon bi bi-box-arrow-right"></i>
                      Logout
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="app-main">
            <div className="app-content-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <h3 className="mb-0">Categories</h3>
                  </div>
                  <div className="col-sm-6">
                    <Link to="/add_categories">
                      <button type="button" className="btn btn-danger add_category_btn">
                        Add Categories
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Table */}
            <div className="container mt-4">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Sr</th>
                    <th>Parent Category</th>
                    <th>Child Categories</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.parent}</td>  {/* Always display the parent category */}
                        <td>{row.child}</td>   {/* Display each child in a new row */}
                        <td>
                          <Link to={`/edit_categories/${row.id}`}>
                            <button className="btn btn-warning btn-sm me-2">Edit</button>
                          </Link>
                          <DeleteCategory id={row.id} updateCategories={handleDelete} setRows={setRows} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No categories found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
