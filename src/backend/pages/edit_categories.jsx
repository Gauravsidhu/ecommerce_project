import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";

const EditCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [childCategory, setChildCategory] = useState({ _id: null, name: "" });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");


  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }


    const fetchData = async () => {
      try {
        // Fetch all categories
        const categoriesResponse = await axios.get("http://localhost:5500/api/categories");
        const allCategories = categoriesResponse.data;

        // Fetch current category
        const categoryResponse = await axios.get(`http://localhost:5500/api/categories/${id}`);
        const categoryData = categoryResponse.data.category;

        setCategoryName(categoryData.name || "");

        // Find first child of this category (if any)
        const child = allCategories.find((cat) => cat.parent_id === categoryData._id);
        setChildCategory(child ? { _id: child._id, name: child.name } : { _id: null, name: "" });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching category details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      // Prepare payload
      const payload = {
        name: categoryName,
        child_categories: [],
      };

      if (childCategory.name.trim() !== "") {
        payload.child_categories = [childCategory];
      }

      await axios.put(`http://localhost:5500/api/categories/updateCategory/${id}`, payload);

      alert("Category updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category");
    }
  };

  if (loading) return <p className="text-center my-4">Loading category data...</p>;

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

          <main className="app-main">
            <div className="app-content-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="mb-0">Edit Category</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <form onSubmit={handleCategoryUpdate}>
                  <div className="card-body">
                    {/* Category Name */}
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Single Child Category Name */}
                    <div className="mb-3">
                      <label htmlFor="childCategoryName" className="form-label">
                        Child Category Name (optional)
                      </label>
                      <input
                        type="text"
                        id="childCategoryName"
                        className="form-control"
                        value={childCategory.name}
                        onChange={(e) => setChildCategory({ ...childCategory, name: e.target.value })}
                        placeholder="Enter child category name"
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Update Category
                    </button>
                    <Link to="/dashboard" className="btn btn-secondary ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditCategories;
