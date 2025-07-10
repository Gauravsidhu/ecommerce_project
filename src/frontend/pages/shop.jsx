import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage] = useState(1);
  const itemsPerPage = 12;

  const totalItems = products.length;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems);
  const paginatedProducts = products.slice(start - 1, end);

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5500/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5500/api/categories")
      .then((res) => {
        const data = res.data;
        const parentCategories = data.filter((cat) => !cat.parent_id);
        const childCategories = data.filter((cat) => cat.parent_id);

        const structured = parentCategories.map((parent) => ({
          ...parent,
          sub: childCategories
            .filter((child) => child.parent_id === parent._id)
            .map((child) => child.name),
        }));

        setCategories(structured);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewMore = () => {
    const modalEl = document.getElementById("my_modal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide(); // Close the modal

    // Navigate after short delay to allow modal to close cleanly
    setTimeout(() => {
      navigate(`/product_details/${selectedProduct?._id}`);
    }, 200);
  };

  return (
    <>
      <Header />
      <div className="breadcrumb_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home &gt;</Link>
                  </li>
                  <li>Shop</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="organic_food_wrapper">
        <div className="shop_wrapper pt-90">
          <div className="container-fluid">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-3">
                <div className="shop_sidebar">
                  <div className="block_categories">
                    <div className="category_top_menu widget">
                      <div className="widget_title">
                        <h3>Categories</h3>
                      </div>
                      <ul className="shop_toggle">
                        {categories.map((category, index) => (
                          <li key={category._id} className="has-sub">
                            <div
                              className="category-header mt-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Link to={`/category/${category._id}`}>
                                {category.name}
                              </Link>
                              <span
                                onClick={() => toggleCategory(index)}
                                style={{ cursor: "pointer", marginLeft: "10px" }}
                              >
                                {openIndex === index ? "−" : "+"}
                              </span>
                            </div>

                            {openIndex === index && category.sub.length > 0 && (
                              <ul
                                className="categorie_sub"
                                style={{
                                  paddingLeft: "20px",
                                  marginTop: "5px",
                                  listStyleType: "circle",
                                  display: "block",
                                }}
                              >
                                {category.sub.map((subName, subIndex) => (
                                  <li key={subIndex}>
                                    <Link to="#">{subName}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner */}
              <div className="col-md-9">
                <div className="categories_banner_inner">
                  <img
                    src="/frontend/assets/img/banner/shop.jpg"
                    alt="Shop Banner"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="categories_banner">
                  <h3>SHOP</h3>
                </div>

                <div className="tav_menu_wrapper">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-7 col-sm-6">
                      <div className="tab_menu shop_menu">
                        <div className="tab_menu_right">
                          <p>
                            There {products.length === 1 ? "is" : "are"}{" "}
                            {products.length}{" "}
                            {products.length === 1 ? "product" : "products"}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab_product_wrapper">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="shop_active">
                      <div className="row">
                        {paginatedProducts.map((product) => (
                          <div
                            key={product._id}
                            className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                          >
                            <div className="single__product">
                              <div className="single_product__inner">
                                <span className="new_badge">new</span>
                                {product.discount && (
                                  <span className="discount_price">
                                    -{product.discount}%
                                  </span>
                                )}
                                <div className="product_img">
                                  <Link to={`/product_details/${product._id}`}>
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                    />
                                  </Link>
                                </div>
                                <div className="product__content text-center">
                                  <div className="produc_desc_info">
                                    <div className="product_title">
                                      <h4>
                                        <Link to={`/product_details/${product._id}`}>
                                          {product.childCategory?.name || product.name}
                                        </Link>
                                      </h4>
                                    </div>
                                    <div className="product_price">
                                      <p>₹{product.price}</p>
                                    </div>
                                  </div>
                                  <div className="product__hover">
                                    <ul>
                                      <li><a href="/"><i className="ion-android-cart"></i></a></li>
                                      <li>
                                        <a
                                          href="#"
                                          className="cart-fore"
                                          data-bs-toggle="modal"
                                          data-bs-target="#my_modal"
                                          title="Quick View"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedProduct(product);
                                            setQuantity(1);
                                          }}
                                        >
                                          <i className="ion-android-open"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <Link to={`/product_details/${product._id}`}>
                                          <i className="ion-clipboard"></i>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="shop_pagination mt-4">
                        <div className="row align-items-center">
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="total_item_shop">
                              Showing {start}-{end} of {totalItems} item
                              {totalItems !== 1 && "s"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Section */}
            <div className="modal fade" id="my_modal" tabIndex="-1" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Quick View</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 text-center">
                        <img
                          src={selectedImage || selectedProduct?.image}
                          alt={selectedProduct?.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="product_title">
                          <h4>{selectedProduct?.childCategory?.name || selectedProduct?.name}</h4>
                        </div>

                        <p>
                          <del>₹{selectedProduct?.price + 10}</del>{" "}
                          <span style={{ color: "green", fontWeight: "bold" }}>
                            ₹{selectedProduct?.price}
                          </span>
                        </p>
                        <p>{selectedProduct?.description || "No description available."}</p>

                        <button className="btn btn-success" onClick={handleViewMore}>
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
