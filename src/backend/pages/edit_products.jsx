import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [username, setUsername] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");  // New state for description
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [multipleImages, setMultipleImages] = useState([]);
  const [previewMultipleImages, setPreviewMultipleImages] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/categories");
        const allCategories = response.data;
        setCategories(allCategories);
        setParentCategories(allCategories.filter(cat => cat.parent_id === null));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/products/${id}`);
        const product = response.data;

        setPrice(product.price || "");
        setDescription(product.description || "");  // Set description here

        setPreviewImage(`http://localhost:5500/product_single_images/${product.image}`);

        const parentCatId = product.parentCategory?._id || product.parentCategory || "";
        setSelectedParent(parentCatId);

        const filteredChildren = categories.filter(cat => cat.parent_id === parentCatId);
        setChildCategories(filteredChildren);

        const childCatId = product.childCategory?._id || product.childCategory || "";
        setSelectedChild(childCatId);

        if (product.multipleImages && product.multipleImages.length > 0) {
          const multipleImageUrls = product.multipleImages.map(
            img => `http://localhost:5500/product_multiple_images/${img}`
          );
          setPreviewMultipleImages(multipleImageUrls);
        } else {
          setPreviewMultipleImages([]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (categories.length) {
      fetchProduct();
    }
  }, [categories, id]);

  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setSelectedParent(parentId);
    setSelectedChild("");
    setChildCategories(categories.filter(cat => cat.parent_id === parentId));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setMultipleImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewMultipleImages(previews);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("parentCategory", selectedParent);
    formData.append("childCategory", selectedChild);
    formData.append("price", Number(price));
    formData.append("description", description);  // Append description here

    if (image) {
      formData.append("image", image);
    }

    if (multipleImages.length > 0) {
      multipleImages.forEach((file) => {
        formData.append("multipleImages", file);
      });
    }

    try {
      await axios.put(`http://localhost:5500/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product updated!");
      navigate("/products");
    } catch (err) {
      console.error("❌ Update error", err);
      alert("Failed to update product.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
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
                  <h3 className="mb-0">Edit Product</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleUpdate} method="POST" encType="multipart/form-data">
                <div className="card-body">
                  {/* Parent Category */}
                  <div className="mb-3">
                    <label className="form-label">Parent Category</label>
                    <select
                      className="form-select"
                      value={selectedParent}
                      onChange={handleParentChange}
                      required
                    >
                      <option value="">Select Parent</option>
                      {parentCategories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Child Category */}
                  <div className="mb-3">
                    <label className="form-label">Child Category</label>
                    <select
                      className="form-select"
                      value={selectedChild}
                      onChange={(e) => setSelectedChild(e.target.value)}
                      required
                      disabled={!childCategories.length}
                    >
                      <option value="">Select Child</option>
                      {childCategories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Description textarea */}
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter product description"
                    />
                  </div>

                  {/* Single Image */}
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        height="100"
                        className="mt-2"
                      />
                    )}
                  </div>

                  {/* Multiple Images */}
                  <div className="mb-3">
                    <label className="form-label">Multiple Images</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImagesChange}
                    />
                    <div className="d-flex flex-wrap mt-2 gap-2">
                      {previewMultipleImages.map((imgSrc, idx) => (
                        <img
                          key={idx}
                          src={imgSrc}
                          alt={`Preview ${idx + 1}`}
                          height="100"
                        />
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">Update Product</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProducts;
