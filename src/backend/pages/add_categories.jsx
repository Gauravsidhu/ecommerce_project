import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import axios from "axios";

const AddCategories = () => {
  const [username, setUsername] = useState("");
  const [options, setOptions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/categories');
      const data = response.data;

      const buildOptions = (categories, parentId = null, prefix = '') => {
        return categories
          .filter(cat => cat.parent_id === parentId)
          .flatMap(cat => {
            const label = prefix ? `${prefix} >> ${cat.name}` : cat.name;
            return [
              { _id: cat._id, label },
              ...buildOptions(categories, cat._id, label)
            ];
          });
      };

      const dropdownOptions = buildOptions(data);
      setOptions(dropdownOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }
    try {
      const payload = {
        name: categoryName,
        parent_id: parentCategory || null
      };
      await axios.post("http://localhost:5500/api/categories", payload);  // <-- corrected route here
      alert("Category added successfully");

      setCategoryName("");
      setParentCategory("");

      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
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
          <main className="app-main">
            <div className="app-content-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="mb-0">Add Categories</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={handleCategorySubmit}>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="categoryName">Category Name</label>
                      <input
                        type="text"
                        name="categoryName"
                        className="form-control"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="parentCategory">Select Parent Category (Optional)</label>
                      <select
                        name="parentCategory"
                        className="form-control"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                      >
                        <option value="">No Parent</option>
                        {options.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddCategories;
