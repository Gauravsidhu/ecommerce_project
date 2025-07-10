import React from "react";
import { Link } from "react-router-dom";

const Prc = () => {

  return (<>
    
    <div className="organic_food_wrapper">
      <header className="header sticky-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header_wrapper_inner">

                <div className="logo col-xs-12">
                  <Link to="#">
                    <img src="frontend/assets/img/logo/logo.png" alt="" />
                  </Link>
                </div>


                <div className="main_menu_inner">

                  <div className="menu">
                    <nav>
                      <ul>
                        <li className="active"><Link to="/">Home <i
                          className="fa fa-angle-down"></i></Link>
                          <ul className="sub_menu">
                            <li><Link to="#">Home Version 1</Link></li>
                            <li><Link to="#">Home Version 2</Link></li>
                            <li><Link to="#">Home Version 3</Link></li>
                            <li><Link to="#">Home Version 4</Link></li>
                          </ul>
                        </li>
                        <li><Link to="#">about us </Link> </li>
                        <li><Link to="#">shop</Link></li>
                        <li><Link to="#">Blog </Link>
                        </li>
                        <li className="mega_parent"><Link to="#">Pages <i
                          className="fa fa-angle-down"></i></Link>
                          <ul className="mega_menu">
                            <li className="mega_item">
                              <a className="mega_title" href="#">Column 1</a>
                              <ul>

                                <li><Link to="#">Shop page</Link></li>
                                <li><Link to="#">Shop Right sidebar</Link>
                                </li>
                                <li><Link to="#">shop Left Sidebar</Link></li>
                                <li><Link to="#">product Details</Link></li>
                                <li><Link to="#">My account</Link></li>
                              </ul>
                            </li>
                            <li className="mega_item">
                              <a className="mega_title" href="#">Column 2</a>
                              <ul>
                                <li><Link to="#">Wishlist</Link></li>
                                <li><Link to="#">Cart</Link></li>
                                <li><Link to="#">Checkout</Link></li>
                                <li><Link to="#">login</Link></li>
                                <li><Link to="#">Register</Link></li>
                              </ul>
                            </li>
                            <li className="mega_item">
                              <a className="mega_title" href="#">Column 3</a>
                              <ul>

                                <li><Link to="#">About us</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">blog Page</Link></li>
                                <li><Link to="#">blog Details</Link></li>
                                <li><Link to="#">Error pages</Link></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li><Link to="#">vegetable</Link></li>
                      </ul>
                    </nav>
                  </div>

                  <div className="mobile-menu d-lg-none">
                    <nav>
                      <ul>
                        <li className="active"><Link to="#">Home</Link>
                          <ul>
                            <li><Link to="#">Home Version 1</Link></li>
                            <li><Link to="#">Home Version 2</Link></li>
                            <li><Link to="#">Home Version 3</Link></li>
                            <li><Link to="#">Home Version 4</Link></li>
                          </ul>
                        </li>
                        <li><Link to="#">about us </Link></li>
                        <li><Link to="#">shop</Link></li>
                        <li><Link to="#">Blog</Link>
                        </li>
                        <li><Link to="#">Pages</Link>
                          <ul>
                            <li>
                              <Link to="#">Column 1</Link>
                              <ul>

                                <li><Link to="#">Shop page</Link></li>
                                <li><Link to="#">Shop Right sidebar</Link>
                                </li>
                                <li><Link to="#">shop Left Sidebar</Link></li>
                                <li><Link to="#">product Details</Link></li>
                                <li><Link to="#">My account</Link></li>
                              </ul>
                            </li>
                            <li>
                              <Link to="#">Column 2</Link>
                              <ul>
                                <li><Link to="#">Wishlist</Link></li>
                                <li><Link to="#">Cart</Link></li>
                                <li><Link to="#">Checkout</Link></li>
                                <li><Link to="#">login</Link></li>
                                <li><Link to="#">Register</Link></li>
                              </ul>
                            </li>
                            <li>
                              <Link to="#">Column 3</Link>
                              <ul>

                                <li><Link to="#">About us</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">blog Page</Link></li>
                                <li><Link to="#">blog Details</Link></li>
                                <li><Link to="#">Error pages</Link></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li><Link to="#">vegetable</Link></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="header_right_info d-flex">
                  <div className="search_box">
                    <div className="search_inner">
                      <form action="#">
                        <input type="text" placeholder="Search our catalog" />
                        <button type="submit"><i className="ion-ios-search"></i></button>
                      </form>
                    </div>
                  </div>
                  <div className="mini__cart">
                    <div className="mini_cart_inner">
                      <div className="cart_icon">
                        <Link to="#">
                          <span className="cart_icon_inner">
                            <i className="ion-android-cart"></i>
                            <span className="cart_count">2</span>
                          </span>
                          <span className="item_total">$65.00</span>
                        </Link>
                      </div>
                      <div className="mini_cart_box cart_box_one">
                        <div className="mini_cart_item">
                          <div className="mini_cart_img">
                            <Link to="#">
                              <img src="frontend/assets/img/cart/1.jpg" alt="" />
                              <span className="cart_count">1</span>
                            </Link>
                          </div>
                          <div className="cart_info">
                            <h5><Link to="#">Mushroom Burger</Link></h5>
                            <span className="cart_price">$75.99</span>
                          </div>
                          <div className="cart_remove">
                            <Link to="#"><i className="zmdi zmdi-delete"></i></Link>
                          </div>
                        </div>
                        <div className="mini_cart_item">
                          <div className="mini_cart_img">
                            <Link to="#">
                              <img src="frontend/assets/img/cart/2.jpg" alt="" />
                              <span className="cart_count">1</span>
                            </Link>
                          </div>
                          <div className="cart_info">
                            <h5><Link to="#">Country Burger</Link></h5>
                            <span className="cart_price">$48.99</span>
                          </div>
                          <div className="cart_remove">
                            <Link to="#"><i className="zmdi zmdi-delete"></i></Link>
                          </div>
                        </div>

                        <div className="price_content">
                          <div className="cart_subtotals">
                            <div className="price_inline">
                              <span className="label">Subtotal </span>
                              <span className="value">$143.49 </span>
                            </div>
                            <div className="price_inline">
                              <span className="label">Shipping </span>
                              <span className="value">$7.00</span>
                            </div>
                            <div className="price_inline">
                              <span className="label">Taxes </span>
                              <span className="value">$0.00</span>
                            </div>
                          </div>
                          <div className="cart-total-price">
                            <span className="label">Total </span>
                            <span className="value">$85.99</span>
                          </div>
                        </div>
                        <div className="min_cart_checkout">
                          <Link to="#">Checkout</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header_account">
                    <div className="account_inner">
                      <Link to="#"><i className="ion-gear-b"></i></Link>
                    </div>
                    <div className="content-setting-dropdown">
                      <div className="language-selector-wrapper">
                        <div className="language-selector">
                          <ul>
                            <li><Link to="#"><img src="frontend/assets/img/1.jpg" alt="English" /><span
                              className="expand-more">English</span></Link></li>

                            <li><Link to="#"><img src="frontend/assets/img/banner/frances2.jpg"
                              alt="Language" /><span className="expand-more">Français</span>
                            </Link></li>

                          </ul>

                        </div>
                        <div className="currency-selector-wrapper">
                          <ul>
                            <li><Link to="#">EUR $</Link></li>
                            <li><Link to="#">USD $</Link></li>
                          </ul>
                        </div>
                        <div className="user_info_top">
                          <ul>
                            <li><Link to="#">my account</Link></li>
                            <li><Link to="#">Checkout</Link></li>
                            <li><Link to="#">Sign in</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

  </>)

}

export default Prc;