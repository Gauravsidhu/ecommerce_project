import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5500/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
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

      <div className="organic_food_wrapper">
        <div className="slider_area">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div
                className="single_slide"
                style={{ backgroundImage: "url(/frontend/assets/img/slider/1.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="slider__content">
                        <p>Exclusive Offer -10% Off This Week</p>
                        <h2>Live <strong>healthy</strong> with a glass</h2>
                        <h3>of <strong>fruit juice</strong> every day</h3>
                        <h6>Starting at<span>₹79.99</span></h6>
                        <div className="slider_btn">
                          <Link to="/shop">Shopping now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="single_slide"
                style={{ backgroundImage: "url(/frontend/assets/img/slider/2.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="slider__content">
                        <p>Exclusive Offer -10% Off This Week</p>
                        <h2>We <strong>provide</strong> the best</h2>
                        <h3> product <strong> for you </strong></h3>
                        <h6>Starting at <span>₹59.99</span></h6>
                        <div className="slider_btn">
                          <Link to="/shop">Shopping now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Second section */}

        <div className="banner_area home1_banner mt-30">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single_banner">
                  <Link to="/">
                    <img src="frontend/assets/img/banner/1.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single_banner">
                  <Link to="/">
                    <img src="frontend/assets/img/banner/2.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single_banner banner_three">
                  <Link to="/">
                    <img src="frontend/assets/img/banner/3.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third section */}

        <div className="features_product pt-90">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="section_title text-center">
                  <h3>Featured Products</h3>
                </div>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={5}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
              }}
            >
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="single__product">
                    <div className="single_product__inner">
                      <span className="new_badge">new</span>

                      <div className="product_img">

                        <Link to={`/product_details/${item._id}`}>
                          <img src={item.image} alt={item.name} />
                        </Link>
                      </div>

                      <div className="product__content text-center">
                        <div className="produc_desc_info">
                          <div className="product_title">
                            <h4>
                              <Link to={`/product_details/${item._id}`}>
                                {item.childCategory?.name || item.name}
                              </Link>
                            </h4>
                          </div>

                          <div className="product_price">
                            <p>₹{item.price}</p>
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
                                  setSelectedProduct(item);
                                  setQuantity(1);
                                }}
                              >
                                <i className="ion-android-open"></i>
                              </a>
                            </li>
                            <li>
                              <Link to={`/product_details/${item._id}`}>
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

        {/* Quick View Modal */}
        {/* Quick View Modal */}
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
                        ${selectedProduct?.price}
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

        <div className="shipping_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="shipping_list d-flex justify-content-between flex-xs-column">
                  <div className="single_shipping_box d-flex">
                    <div className="shipping_icon">
                      <img src="frontend/assets/img/ship/1.png" alt="shipping icon" />
                    </div>
                    <div className="shipping_content">
                      <h6>Free Shipping On Order Over $120</h6>
                      <p>Free shipping on all order</p>
                    </div>
                  </div>
                  <div className="single_shipping_box one d-flex">
                    <div className="shipping_icon">
                      <img src="frontend/assets/img/ship/2.png" alt="shipping icon" />
                    </div>
                    <div className="shipping_content">
                      <h6>Money Return</h6>
                      <p>Back guarantee under 7 days</p>
                    </div>
                  </div>
                  <div className="single_shipping_box two d-flex">
                    <div className="shipping_icon">
                      <img src="frontend/assets/img/ship/3.png" alt="shipping icon" />
                    </div>
                    <div className="shipping_content">
                      <h6>Member Discount</h6>
                      <p>Support online 24 hours a day</p>
                    </div>
                  </div>
                  <div className="single_shipping_box three d-flex">
                    <div className="shipping_icon">
                      <img src="frontend/assets/img/ship/4.png" alt="shipping icon" />
                    </div>
                    <div className="shipping_content">
                      <h6>Online Support 24/7</h6>
                      <p>Free shipping on all order</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fifth section */}

        <div className="shop_product">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="shop_product_head d-flex justify-content-between mb-30">
                  <div className="section_title space_2 text-start">
                    <h3>shop</h3>
                  </div>

                </div>
              </div>
            </div>
            <div className="row">
              {/* Left Side Large Product */}
              <div className="col-lg-4 col-md-6">
                {products[0] && (
                  <div className="shop_larg_product">
                    <div className="single__product_2">
                      <div className="product_img">
                        <Link to={`/product_details/${products[0]._id}`}>
                          <img
                            src={
                              products[0].image.startsWith("http")
                                ? products[0].image
                                : `http://localhost:5500/product_single_images/${products[0].image.replace(/^\/+/, "")}`
                            }
                            alt={products[0].name}
                          />
                        </Link>
                      </div>
                      <div className="product__content text-center">
                        <div className="product_title mt-2">
                          <h4>
                            <Link to={`/product_details/${products[0]._id}`}>
                              {products[0].childCategory?.name}
                            </Link>
                          </h4>
                        </div>
                        <div className="product_price">
                          <p>₹{products[0].price}</p>
                        </div>
                        <div className="product-add-to-cart mb-5">
                          <Link to={`/product_details/${products[0]._id}`}>
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side Grid Products */}
              <div className="col-lg-8 col-md-6">
                <div className="tab-content">
                  <div className="tab-pane active show fade" id="fresh" role="tabpanel" aria-labelledby="fresh-tab">
                    <div className="row">
                      {products.slice(1, 9).map((product) => (
                        <div className="col-md-3" key={product._id}>
                          <div className="single__product">
                            <div className="single_product__inner">
                              <span className="new_badge">new</span>
                              <div className="product_img">
                                <Link to={`/product_details/${product._id}`}>
                                  <img
                                    src={
                                      product.image.startsWith("http")
                                        ? product.image
                                        : `http://localhost:5500/product_single_images/${product.image.replace(/^\/+/, "")}`
                                    }
                                    alt={product.name}
                                  />
                                </Link>
                              </div>
                              <div className="product__content text-center">
                                <div className="produc_desc_info">
                                  <div className="product_title mt-0">
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
                                          setSelectedImage(product.image); // Reset main image to default
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
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sixth section */}

        <div className="banner_area home1_banner2 pb-90">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="single_banner">
                  <Link to="#">
                    <img src="frontend/assets/img/banner/big-1.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="single_banner">
                  <Link to="#">
                    <img src="frontend/assets/img/banner/big-2.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seventh section */}

        {/* <div className="recommended_product">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="shop_product_head d-flex justify-content-between mb-30">
                  <div className="section_title space_2 text-start">
                    <h3>Recommended Products</h3>
                  </div>
                  <div className="home_shop_product text-end">
                    <ul className="product-tab-list nav d-flex flex-wrap justify-content-end" role="tablist">
                      <li role="presentation">
                        <button className="active" type="button" id="fresh_fruit-tab"
                          data-bs-target="#fresh_fruit" data-bs-toggle="tab" role="tab"
                          aria-selected="true" aria-controls="fresh_fruit">
                          Fresh Fruit
                        </button>
                      </li>
                      <li role="presentation">
                        <button type="button" id="cucumber-tab" data-bs-target="#fresh_fruit "
                          data-bs-toggle="tab" role="tab" aria-selected="false"
                          aria-controls="cucumber">
                          Cucumber
                        </button>
                      </li>
                      <li role="presentation">
                        <button type="button" id="tomato-tab" data-bs-target="#fresh_fruit"
                          data-bs-toggle="tab" role="tab" aria-selected="false"
                          aria-controls="tomato">
                          Tomato
                        </button>
                      </li>
                      <li role="presentation">
                        <button type="button" id="banana-tab" data-bs-target="#fresh_fruit"
                          data-bs-toggle="tab" role="tab" aria-selected="false"
                          aria-controls="banana">
                          Banana
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-content">
              <div className="tab-pane active show fade" id="fresh_fruit" role="tabpanel" aria-labelledby="fresh_fruit-tab">
                <div className="row">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      640: { slidesPerView: 2 },
                      992: { slidesPerView: 3 },
                      1200: { slidesPerView: 4 }
                    }}
                  >
                    {products.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="single__product">
                          <div className="single_product__inner">
                            <span className="new_badge">new</span>

                            <div className="product_img">
                              <a href="/">
                                <img src={item.image} alt={item.name} />
                              </a>
                            </div>

                            <div className="product__content text-center">
                              <div className="produc_desc_info">
                                <div className="product_title">
                                  <h4>
                                    <Link to={`/product_details/${item._id}`}>
                                      {item.childCategory?.name || item.name}
                                    </Link>
                                  </h4>
                                </div>

                                <div className="product_price">
                                  <p>${item.price}</p>
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
                                        setSelectedProduct(item);
                                        setQuantity(1);
                                      }}
                                    >
                                      <i className="ion-android-open"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <Link to={`/product_details/${item._id}`}>
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
            </div>
          </div>
        </div> */}

        {/* Eight section */}

        {/* <div className="new_product">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="section_title space_2 text-start">
                  <h3>New Product</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={5}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 }
                }}
              >
                {products.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="single__product">
                      <div className="single_product__inner">
                        <span className="new_badge">new</span>

                        <div className="product_img">
                          <a href="/">
                            <img src={item.image} alt={item.name} />
                          </a>
                        </div>

                        <div className="product__content text-center">
                          <div className="produc_desc_info">
                            <div className="product_title">
                              <h4>
                                <Link to={`/product_details/${item._id}`}>
                                  {item.childCategory?.name || item.name}
                                </Link>
                              </h4>
                            </div>

                            <div className="product_price">
                              <p>${item.price}</p>
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
                                    setSelectedProduct(item);
                                    setQuantity(1);
                                  }}
                                >
                                  <i className="ion-android-open"></i>
                                </a>
                              </li>
                              <li>
                                <Link to={`/product_details/${item._id}`}>
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
        </div> */}

        {/* Ninth Section */}
        {/* <div className="banner_area banner_area-2 pb-90">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="single_banner">
                  <Link to="#">
                    <img src="frontend/assets/img/banner/banner-4.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-4">
                <div className="single_banner">
                  <Link to="#">
                    <img src="frontend/assets/img/banner/banner-5.jpg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="single_banner">
                  <Link to="#">
                    <img src="frontend/assets/img/banner/banner-6.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Ten Section */}

        <div className="best_seller_product">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="section_title space_2 text-start">
                  <h3> Bestseller Products </h3>
                </div>
              </div>
            </div>
            <div className="row">
              {products.slice(4, 8).map((product, index) => (
                <div key={product._id || index} className="col-md-3">
                  <div className="single_small_product mb-4">
                    <div className="product_thumb">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="product_content">
                      <h5>{product.childCategory?.name || product.name}</h5>
                      <div className="product_ratting">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <div className="product_price">
                        <span className="regular_price">₹{product.price}</span>
                        {product.oldPrice && (
                          <span className="old_price ms-2 text-muted">
                            <del>₹{product.oldPrice}</del>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Home;
