import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../pages/cart_content";
import Header from "../components/header";
import Footer from "../components/footer";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header />

      <div className="breadcrumb_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul>
                  <li><Link to="/">Home &gt;</Link></li>
                  <li>Cart</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="cart_main_area my-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form>
                <div className="table-content table-responsive">
                  <table className="table table-bordered text-center align-middle">
                    <thead>
                      <tr>
                        <th className="img-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <img
                                src={
                                  item.multipleImages && item.multipleImages.length > 0
                                    ? `http://localhost:5500/product_multiple_images/${item.multipleImages[0]}`
                                    : "http://localhost:5500/product_multiple_images/placeholder.jpg"
                                }
                                alt={item.name}
                                width="80"
                              />
                            </td>
                            <td className="product-name">
                              <Link to="#">
                                {item.childCategory?.name || item.name}
                              </Link>
                            </td>
                            <td className="product-price">
                              <span className="amount">₹{item.price}</span>
                            </td>
                            <td className="product-quantity">
                              <div className="quickview_plus_minus quick_cart">
                                <div className="quickview_plus_minus_inner">
                                  <div className="cart-plus-minus cart_page">
                                    <input
                                      type="text"
                                      name="qtybutton"
                                      value={item.quantity}
                                      readOnly
                                      className="cart-plus-minus-box"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              ₹{item.price * item.quantity}
                            </td>
                            <td className="product-remove">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(item._id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">Your cart is empty.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="row table-responsive_bottom mt-5">
                  <div className="col-lg-7 col-sm-7 col-md-7">
                    <div className="buttons-carts mb-3 d-flex gap-3 flex-wrap">
                      <Link to="/shop" className="btn btn-outline-success">
                        Continue Shopping
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-5 col-sm-5 col-md-5">
                    <div className="cart_totals text-end p-3 border rounded bg-light">
                      <h4>Cart Totals</h4>
                      <div className="cart-subtotal d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <div className="order-total d-flex justify-content-between fw-bold mt-2">
                        <span>Total</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                      <div className="wc-proceed-to-checkout mt-3">
                        <Link to="/checkout" className="btn btn-primary w-100">
                          Proceed to Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
