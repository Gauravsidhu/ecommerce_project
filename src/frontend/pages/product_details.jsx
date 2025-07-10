import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../pages/cart_content";
import Header from "../components/header";
import Footer from "../components/footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Product_details = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5500/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:5500/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching related products:", err));
  }, []);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleViewMore = () => {
    const modalEl = document.getElementById("my_modal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    setTimeout(() => {
      navigate(`/product_details/${selectedProduct?._id}`);
    }, 200);
  };

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (<>
    <Header />

    {/* First section */}

    <div className="breadcrumb_container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home {'>'}</Link>
                </li>
                <li>Product details </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    {/* Second section */}

    <div className="table_primary_block pt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="product-flags">
              <div className="tab-content">
                {/* First image tab */}
                {product.multipleImages[0] && (
                  <div
                    className="tab-pane fade show active"
                    id="tab1"
                    role="tabpanel"
                  >
                    <div className="product_tab_img">
                      <Link to="#">
                        <img
                          src={`http://localhost:5500/product_multiple_images/${product.multipleImages[0]}`}
                          alt="Main Product"
                        />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Remaining image tabs */}
                {product.multipleImages.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="tab-pane fade"
                    id={`tab${index + 2}`}
                    role="tabpanel"
                  >
                    <div className="product_tab_img">
                      <Link to="#">
                        <img
                          src={`http://localhost:5500/product_multiple_images/${img}`}
                          alt={`product-${index + 2}`}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tab navigation buttons - thumbnails */}
              <div className="products_tab_button">
                <ul className="nav product_navactive justify-content-center" role="tablist">

                  {/* First image thumbnail tab button */}
                  {product.multipleImages[0] && (
                    <li key="first">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#tab1"
                        role="tab"
                        aria-selected="true"
                      >
                        <img
                          src={`http://localhost:5500/product_multiple_images/${product.multipleImages[0]}`}
                          alt="thumb-0"
                          style={{ height: "60px", objectFit: "cover" }}
                        />
                      </a>
                    </li>
                  )}

                  {/* Other thumbnail tab buttons */}
                  {product.multipleImages.slice(1).map((img, index) => (
                    <li key={index + 1}>
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href={`#tab${index + 2}`}
                        role="tab"
                        aria-selected="false"
                      >
                        <img
                          src={`http://localhost:5500/product_multiple_images/${img}`}
                          alt={`thumb-${index + 1}`}
                          style={{ height: "60px", objectFit: "cover" }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="col-lg-7 col-md-7 col-sm-12">
            <div className="product__details_content">
              <div className="demo_product">
                <h2>{product?.childCategory?.name}</h2>
                <p>Reference: Order #ZC1025</p>

              </div>
              <div className="product_comments_block">
                <div className="comments_note clearfix">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </div>
                <div className="comments_advices">
                  <ul>
                    <li><a href="#"><i className="fa fa-comment-o" aria-hidden="true"></i>
                      Read reviews (<span>1</span>)</a></li>
                    <li><a href="#"><i className="fa fa-pencil"></i>Read reviews </a></li>
                  </ul>
                </div>
              </div>
              <div className="current_price">
                <span>₹ {product?.price}</span>
              </div>
              <div className="product_information">
                <div id="product_description_short">
                  <p> {product?.description}</p>
                </div>
                <div className="product_variants">
                  <div className="quickview_plus_minus">
                    <span className="control_label">Quantity</span>
                    <div className="quickview_plus_minus_inner">
                      <div className="cart-plus-minus d-flex align-items-center">
                        <button
                          type="button"
                          onClick={handleDecrease}
                          className="qtybtn"
                        >
                          −
                        </button>

                        <input
                          type="text"
                          name="qtybutton"
                          className="cart-plus-minus-box"
                          value={quantity}
                          readOnly
                        />

                        <button
                          type="button"
                          onClick={handleIncrease}
                          className="qtybtn"
                        >
                          +
                        </button>
                      </div>

                      <div className="add_button">
                        <button type="button" onClick={handleAddToCart}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-availability">
                    <span id="availability">
                      <i className="zmdi zmdi-check"></i>
                      In stock
                    </span>
                  </div>
                  <div className="social-sharing">
                    <span>Share</span>
                    <ul>
                      <li><Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                      <li><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                      <li><Link to="#"><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
                      <li><Link to="#"><i className="fa fa-pinterest" aria-hidden="true"></i></Link></li>
                    </ul>
                  </div>
                  <div className="block-reassurance">
                    <ul>
                      <li>
                        <img src="/frontend/assets/img/cart/cart1.png" alt="" />
                        <span>Security policy (edit with Customer reassurance module)</span>
                      </li>
                      <li>
                        <img src="/frontend/assets/img/cart/cart2.png" alt="" />
                        <span>Delivery policy (edit with Customer reassurance module)</span>
                      </li>
                      <li>
                        <img src="/frontend/assets/img/cart/cart3.png" alt="" />
                        <span>Return policy (edit with Customer reassurance module)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Third section */}

    <div className="product_page_tab ptb-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="product_tab_button">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li role="presentation">
                  <button type="button" className="tav_past active" id="home-tab" data-bs-toggle="tab" data-bs-target="#Description" role="tab" aria-controls="Description" aria-selected="true">Description</button>
                </li>
                <li role="presentation">
                  <button type="button" className="tav_past" id="profile-tab" data-bs-toggle="tab" data-bs-target="#details" role="tab" aria-controls="details" aria-selected="false">Information</button>
                </li>
                <li role="presentation">
                  <button type="button" className="tav_past" id="contact-tab" data-bs-toggle="tab" data-bs-target="#Reviews" role="tab" aria-controls="Reviews" aria-selected="false">Reviews</button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="Description" role="tabpanel" aria-labelledby="home-tab">
                <div className="product-description">
                  <p>ZestyCart has been delivering quality food and grocery essentials since 2025. Focused on freshness, flavor, and affordability, the brand brings a wide variety of everyday staples, premium products, and health-conscious options straight to your doorstep. Whether you're shopping for daily needs or indulging in your favorite snacks, ZestyCart ensures everything is handpicked with care and delivered with love. Our mission is to make grocery shopping easier, faster, and more enjoyable for every household.</p>

                </div>
              </div>
              <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="profile-tab">
                <div className="product-details">
                  <div className="product-manufacturer">
                    <Link to="#"><img src="assets/img/cart/11.jpg" alt="" /></Link>
                  </div>
                  <div className="product-reference">
                    <label className="label">Reference </label>
                    <span>demo_10</span>
                  </div>
                  <div className="product-quantities">
                    <label className="label">In stock</label>
                    <span>321 Items</span>
                  </div>
                  <div className="product-out-of-stock">
                    <section className="product-features">
                      <h3>Data sheet</h3>
                      <dl className="data-sheet">
                        <dt className="name">Compositions</dt>
                        <dd className="value">Viscose</dd>
                        <dt className="name">Styles</dt>
                        <dd className="value">Dressy</dd>
                        <dt className="name">Properties</dt>
                        <dd className="value">Short Dress</dd>
                      </dl>
                    </section>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="Reviews" role="tabpanel" aria-labelledby="contact-tab">
                <div className="product_comments_block_tab">
                  <div className="comment_clearfix">
                    <div className="comment_author">
                      <span>Grade </span>
                      <div className="star_content clearfix">
                        <ul>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                          <li><i className="fa fa-star"></i></li>
                        </ul>
                      </div>

                    </div>
                    <div className="comment_author_infos">
                      <strong>Priya Mehta</strong>
                      <br />
                      <em>26/07/2025</em>
                    </div>
                    <div className="comment_details">
                      <h4>Excellent Service!</h4>
                      <p>
                        I ordered from ZestyCart for the first time and was really impressed by the quick delivery and quality of the products. Fresh fruits, well-packaged groceries, and a user-friendly website made the experience even better. Highly recommended!
                      </p>
                    </div>

                    <div className="review">
                      <p><Link to="#">Write your review !</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
                  <del>${selectedProduct?.price + 10}</del>{" "}
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

    {/* Fourth section */}

    <div className="features_product">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section_title text-start">
              <h3>Related Product</h3>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
          className="related_product_swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product._id || index}>
              <div className="single__product">
                <div className="single_product__inner">
                  <span className="new_badge">new</span>
                  <div className="product_img">
                    <Link to={`/product_details/${product._id}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>
                  </div>
                  <div className="product__content text-center">
                    <div className="produc_desc_info">
                      <div className="product_title">
                        <h4>
                          <Link to={`/product_details/${product._id}`}>
                            {product.childCategory?.name}
                          </Link>
                        </h4>
                      </div>
                      <div className="product_price">
                        <p>₹{product.price}</p>
                      </div>
                    </div>
                    <div className="product__hover">
                      <ul>
                        <li>
                          <Link to="/">
                            <i className="ion-android-cart"></i>
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#my_modal"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedProduct(product);
                              setSelectedImage(product.image);
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>


    <Footer />

  </>)
}

export default Product_details;