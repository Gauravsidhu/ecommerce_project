import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <>

      <footer className="footer pt-90">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-xs-12">
              <div className="single_footer widget">
                <div className="single_footer_widget_inner">
                  <div className="footer_logo">
                    <Link to="#"><img src="frontend/assets/img/logo/logo_footer.png" alt="" /></Link>
                  </div>
                  <div className="footer_content">
                    <p>Address: Civil Lines Ludhiana Punjab.</p>
                    <p>Phone: +(91) 9877360616</p>
                    <p>Email: sidhugaurav69mail.com</p>
                  </div>
                  <div className="footer_social">
                    <h4>Get in Touch:</h4>
                    <div className="footer_social_icon">
                      <Link to="https://www.instagram.com/sidhu_aa_da_kaka001/"><i className="fa fa-instagram"></i></Link>
                      <Link to="https://www.linkedin.com/in/gaurav-sidhu/"><i className="fa fa-linkedin"></i></Link>
                      <Link to="https://github.com/Gauravsidhu"><i className="fa fa-github"></i></Link>
                      <Link to="https://www.facebook.com/gaurav.sidhu.5070/"><i className="fa fa-facebook"></i></Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-6 col-md-12 col-xs-12">
              <div className="footer_menu_list d-flex justify-content-between">

                {/* Quick Links */}
                <div className="single_footer widget">
                  <div className="single_footer_widget_inner">
                    <div className="footer_title">
                      <h2>Quick Links</h2>
                    </div>
                    <div className="footer_menu">
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Customer Service */}
                <div className="single_footer widget">
                  <div className="single_footer_widget_inner">
                    <div className="footer_title">
                      <h2>Customer Service</h2>
                    </div>
                    <div className="footer_menu">
                      <ul>
                        <li><Link to="#">Shipping Info</Link></li>
                        <li><Link to="#">Returns & Refunds</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms & Conditions</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* My Account */}
                <div className="single_footer widget">
                  <div className="single_footer_widget_inner">
                    <div className="footer_title">
                      <h2>My Account</h2>
                    </div>
                    <div className="footer_menu">
                      <ul>
                        <li><Link to="#">Login</Link></li>
                        <li><Link to="#">My Orders</Link></li>
                        <li><Link to="#">Wishlist</Link></li>
                        <li><Link to="#">Track Order</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-3 col-md-12 col-xs-12">
              <div className="footer_title">
                <h2> Join Our Newsletter Now </h2>
              </div>
              <div className="footer_news_letter">
                <p>Get E-mail updates about our latest shop and special offers.</p>
                <div className="newsletter_form">
                  <form action="#">
                    <input type="email" required placeholder="Your Email Address" />
                    <input type="submit" value="Subscribe" />
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-xs-12">
                <div className="copyright_text">
                  <p>Copyright 2025. All Rights Reserved</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12">
                <div className="footer_mastercard text-end">
                  <Link to="#"><img src="assets/img/brand/payment.png" alt="" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </footer>

    </>
  )
}

export default Footer;