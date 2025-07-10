import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import axios from "axios";
import DeleteProducts from "./delete_products";

const Products = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);

      axios.get("http://localhost:5500/api/products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("❌ Error fetching products:", error);
        });

    } else {
      navigate("/");
    }
  }, [navigate]);

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
                    <Link to="/add_products">
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
                    <th>Child Category</th>
                    <th>Price</th>
                    <th>Description</th> {/* New column */}
                    <th>Main Image</th>
                    <th>Multiple Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.parentCategory?.name || "N/A"}</td>
                        <td>{product.childCategory?.name || "N/A"}</td>
                        <td>{product.price || "N/A"}</td>
                        <td>{product.description || "N/A"}</td> {/* New description cell */}

                        {/* Main Image Column */}
                        <td>
                          {product.image ? (
                            <img
                              src={product.image} // ✅ use as-is
                              alt="Main"
                              style={{ width: "auto", height: "60px", objectFit: "cover" }}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </td>

                        {/* Multiple Images Column */}
                        <td>
                          {product.multipleImages && product.multipleImages.length > 0 ? (
                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                              {product.multipleImages.map((img, i) => (
                                <img
                                  key={i}
                                  src={img} // ✅ use as-is
                                  alt={`product-${i}`}
                                  style={{ width: "auto", height: "60px", objectFit: "cover" }}
                                />
                              ))}
                            </div>
                          ) : (
                            <span>No Images</span>
                          )}
                        </td>

                        <td>
                          <Link to={`/edit_products/${product._id}`}>
                            <button className="btn btn-warning btn-sm me-2">Edit</button>
                          </Link>
                          <DeleteProducts
                            id={product._id}
                            updateCategories={() => {
                              axios.get("http://localhost:5500/api/products").then((res) => setProducts(res.data));
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No products found.</td>
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

export default Products;
