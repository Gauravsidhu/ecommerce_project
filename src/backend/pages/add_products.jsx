import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/footer";

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [childCategories, setChildCategories] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [username, setUsername] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);
  const [productDescription, setProductDescription] = useState("");



  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/categories')  // ✅ correct
          ;
        const data = response.data;
        setCategories(data);
        setParentCategories(data.filter(cat => cat.parent_id === null));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [navigate]);

  // Handle Parent Category Change
  const handleParentChange = (event) => {
    const parentId = event.target.value;
    setSelectedParent(parentId);
    setChildCategories(categories.filter(cat => cat.parent_id === parentId));
  };

  // Handle Child Category Change
  const handleChildCategoryChange = (event) => {
    setSelectedChild(event.target.value);
  };

  // Handle Input Changes
  const handleProductPriceChange = (event) => setProductPrice(event.target.value);

  const handleDescriptionChange = (event) => setProductDescription(event.target.value);


  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productImage) {
      alert("Please select a single image.");
      return;
    }

    const formData = new FormData();
    formData.append("parentCategory", selectedParent);
    formData.append("childCategory", selectedChild);
    formData.append("price", productPrice);
    formData.append("image", productImage); // Single image

    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("multipleImages", multipleImages[i]); // Multiple images
    }

    formData.append("description", productDescription);


    try {
      const response = await axios.post("http://localhost:5500/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product added successfully:", response.data);
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
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
                    <h3 className="mb-0">Add Products</h3>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} method="POST">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <label>Parent Category:</label>
                    <select className="form-control" onChange={handleParentChange} value={selectedParent}>
                      <option value="">Select Parent Category</option>
                      {parentCategories.map(parent => (
                        <option key={parent._id} value={parent._id}>{parent.name}</option>
                      ))}
                    </select>

                    <label>Child Category:</label>
                    <select className="form-control" onChange={handleChildCategoryChange} value={selectedChild} disabled={!selectedParent}>
                      <option value="">Select Child Category</option>
                      {childCategories.map(child => (
                        <option key={child._id} value={child._id}>{child.name}</option>
                      ))}
                    </select>

                    <label>Product Price:</label>
                    <input type="text" className="form-control" placeholder="Enter the Product price" value={productPrice} onChange={handleProductPriceChange} />
                  </div>
                </div>

                <div className="col-md-6">

                  <label>Product Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <label>Multiple Product Images:</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(e) => setMultipleImages(e.target.files)}
                  />

                  <label>Product Description:</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter product description"
                    rows="4"
                    value={productDescription}
                    onChange={handleDescriptionChange}
                  />



                  <div className="submit_btn">
                    <button type="submit" className="btn btn-danger">Submit</button>
                  </div>

                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProducts;
