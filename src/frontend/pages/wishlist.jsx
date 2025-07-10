import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

const Wishlist = () => {

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
                <li>Wishlist </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    {/* Second section */}

    <div className="cart_main_area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form action="#">
              <div className="table-content table-responsive table-wishlist">
                <table>
                  <thead>
                    <tr>
                      <th className="product-remove one">Remove</th>
                      <th className="img-thumbnail">Image</th>
                      <th className="product-name">Product Name</th>
                      <th className="product-price four">Unit Price </th>
                      <th className="product-stock-stauts">Stock Status </th>
                      <th className="product-add-cart wishlist">Add To Cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-remove"><Link to="#">X</Link></td>
                      <td className="product-thumbnail"><img src="assets/img/product/6.jpg" alt="" /></td>
                      <td className="product-name"><Link to="#">Vestibulum suscipit</Link></td>
                      <td className="product-price"><span className="amount">£165.00</span></td>
                      <td className="product-stock-stauts">In Stock</td>
                      <td className="product-add-cart wishlist"><Link to="#">Add to Cart</Link></td>
                    </tr>
                    <tr>
                      <td className="product-remove"><Link to="#">X</Link></td>
                      <td className="product-thumbnail"><img src="assets/img/product/7.jpg" alt="" /></td>
                      <td className="product-name"><Link to="#">Vestibulum dictum magna</Link></td>
                      <td className="product-price"><span className="amount">£165.00</span></td>
                      <td className="product-stock-stauts">In Stock</td>
                      <td className="product-add-cart wishlist"><Link to="#">Add to Cart</Link></td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </form>
          </div>
          <div className="col-12">
            <div className="wishlist-share">
              <h4>Share on:</h4>
              <div className="social-icon">
                <ul>
                  <li><Link to="#"><i className="zmdi zmdi-rss"></i></Link></li>
                  <li><Link to="#"><i className="zmdi zmdi-vimeo"></i></Link></li>
                  <li><Link to="#"><i className="zmdi zmdi-tumblr"></i></Link></li>
                  <li><Link to="#"><i className="zmdi zmdi-pinterest"></i></Link></li>
                  <li><Link to="#"><i className="zmdi zmdi-linkedin"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </>)

}

export default Wishlist;