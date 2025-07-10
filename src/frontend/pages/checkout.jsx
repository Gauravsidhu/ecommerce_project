import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useCart } from "../pages/cart_content";

const stripePromise = loadStripe("pk_test_51ReveiQ9dF0OmDH6eh8PAqbH6rl3yYafObNwgoei61NQmafrnKHqCxKKRVpPYPRAwzUVU6un7UeiPGp01fpFlHYM00LcFL5TMj");

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    country: '',
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [coupon, setCoupon] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get('status');
    const sessionId = query.get('session_id');
    const cleared = sessionStorage.getItem("cartCleared");

    if (status === 'success' && sessionId && !cleared) {
      setPaymentStatus("✅ Payment Successful!");
      sessionStorage.setItem("cartCleared", "true");
      clearCart();

      const fetchAndSavePaymentData = async () => {
        try {
          const sessionRes = await fetch(`http://localhost:5500/session-details?session_id=${sessionId}`);
          const session = await sessionRes.json();

          const formData = JSON.parse(localStorage.getItem("formData") || "{}");

          const fullData = {
            ...formData,
            transactionId: session.id,
            paymentIntentId: session.payment_intent,
            paymentStatus: session.payment_status,
            amountPaid: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency || 'INR'
          };

          await fetch("http://localhost:5500/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(fullData)
          });

          alert("✅ Payment and form data saved successfully!");
          localStorage.removeItem("formData");
        } catch (err) {
          console.error("❌ Error saving payment data:", err);
          alert("❌ Failed to save payment info.");
        }
      };

      fetchAndSavePaymentData();
    } else if (status === 'cancel') {
      setPaymentStatus("❌ Payment was cancelled.");
    }
  }, [location.search]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.country || form.country === '0') newErrors.country = 'Please select a country';
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.companyName) newErrors.companyName = 'Company name is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.state) newErrors.state = 'State is required';
    if (!form.zip) newErrors.zip = 'Zip code is required';
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    localStorage.setItem("formData", JSON.stringify(form)); // ✅ Save before redirect

    try {
      const response = await fetch("http://localhost:5500/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, form }),
      });

      const session = await response.json();
      const stripe = await stripePromise;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      alert("Error redirecting to payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  const submitFormDataToBackend = async (formData) => {
    try {
      const response = await fetch('http://localhost:5500/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Form submitted and data saved successfully!');
        setForm({
          country: '',
          firstName: '',
          lastName: '',
          companyName: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          email: '',
          phone: '',
        });
        setErrors({});
        setCoupon('');
        setMessage('');
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Server error during form submission.');
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (coupon.trim() !== '') {
      setMessage('This coupon code is expired, check another one.');
    } else {
      setMessage('');
    }
  };


  return (<>

    <Header />

    {/* First section */}

    <div className="breadcrumb_container ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home {'>'}</Link>
                </li>
                <li>checkout</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    {/* Success or Cancel Message */}
    {paymentStatus && (
      <div style={{ textAlign: "center", marginTop: "20px", color: paymentStatus.includes("Successful") ? "green" : "red" }}>
        {paymentStatus}
      </div>
    )}

    {/* Second section */}

    <div className="Checkout_page_section">
      <div className="container">
        <div className="checkout-form">
          <div className="row">
            <form className="row" onSubmit={handleSubmit}>
              {/* Left Column: Billing Details */}
              <div className="col-lg-6 col-md-6">
                <h3>Billing Details</h3>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="country">Country <span className="required">*</span></label>
                    <select
                      id="country"
                      className={`form-control ${errors.country ? 'error-border' : ''}`}
                      value={form.country}
                      onChange={handleChange}
                    >
                      <option value="0">Select a country</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                      <option value="BR">Brazil</option>
                      <option value="ZA">South Africa</option>
                      <option value="SG">Singapore</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="BD">Bangladesh</option>
                    </select>
                    {errors.country && <div className="error-text">{errors.country}</div>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="firstName">First Name <span>*</span></label>
                    <input
                      id="firstName"
                      type="text"
                      className={`form-control ${errors.firstName ? 'error-border' : ''}`}
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="error-text">{errors.firstName}</div>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="lastName">Last Name <span>*</span></label>
                    <input
                      id="lastName"
                      type="text"
                      className={`form-control ${errors.lastName ? 'error-border' : ''}`}
                      value={form.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="error-text">{errors.lastName}</div>}
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      id="companyName"
                      type="text"
                      className={`form-control ${errors.companyName ? 'error-border' : ''}`}
                      value={form.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && <div className="error-text">{errors.companyName}</div>}
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="address">Address <span>*</span></label>
                    <input
                      id="address"
                      type="text"
                      className={`form-control ${errors.address ? 'error-border' : ''}`}
                      value={form.address}
                      onChange={handleChange}
                    />
                    {errors.address && <div className="error-text">{errors.address}</div>}
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="city">City <span>*</span></label>
                    <input
                      id="city"
                      type="text"
                      className={`form-control ${errors.city ? 'error-border' : ''}`}
                      value={form.city}
                      onChange={handleChange}
                    />
                    {errors.city && <div className="error-text">{errors.city}</div>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="state">State / County <span>*</span></label>
                    <input
                      id="state"
                      type="text"
                      className={`form-control ${errors.state ? 'error-border' : ''}`}
                      value={form.state}
                      onChange={handleChange}
                    />
                    {errors.state && <div className="error-text">{errors.state}</div>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="zip">Postcode / Zip <span>*</span></label>
                    <input
                      id="zip"
                      type="text"
                      className={`form-control ${errors.zip ? 'error-border' : ''}`}
                      value={form.zip}
                      onChange={handleChange}
                    />
                    {errors.zip && <div className="error-text">{errors.zip}</div>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="email">Email <span>*</span></label>
                    <input
                      id="email"
                      type="text"
                      className={`form-control ${errors.email ? 'error-border' : ''}`}
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="error-text">{errors.email}</div>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="phone">Phone <span>*</span></label>
                    <input
                      id="phone"
                      type="text"
                      className={`form-control ${errors.phone ? 'error-border' : ''}`}
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="error-text">{errors.phone}</div>}
                  </div>
                </div>
              </div>

              {/* Right Column: Coupon and Order Summary */}
              <div className="col-lg-6 col-md-6">
                <div className="coupon-form-two mb-30">
                  <h3>Coupon Code</h3>
                  <p>Enter your coupon code if you have one</p>
                  <input
                    placeholder="Coupon code"
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
                </div>

                <div className="order-wrapper">
                  <h3>Your order</h3>
                  <div className="order-table table-responsive mb-30">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.length === 0 ? (
                          <tr>
                            <td colSpan="2">No items in cart</td>
                          </tr>
                        ) : (
                          cartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="product-name">
                                {item.childCategory?.name || item.name}{" "}
                                <strong> × {item.quantity}</strong>
                              </td>
                              <td className="amount">₹{item.price * item.quantity}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Cart Subtotal</th>
                          <td>₹{calculateTotal()}</td>
                        </tr>
                        <tr>
                          <th>Order Total</th>
                          <td><strong>₹{calculateTotal()}</strong></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* Single Button for Submitting Everything */}
              <div className="col-12 mt-4">
                <div className="order-button text-center">
                  <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>

                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

    <Footer />

  </>)
}

export default Checkout;