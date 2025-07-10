import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Account = () => {

  return (<>

    <Header />

    {/* First section */}

    <div className="breadcrumb_container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <nav>
              <ul>
                <li><Link to="/">Home</Link> {'>'}</li>
                <li>My account</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    {/* Second section */}

    <section className="main-content-area my-account ptb-100">
      <div className="container">
        <div className="account-dashboard">
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3">
              <ul role="tablist" class="nav flex-column dashboard-list">
                <li role="presentation">
                  <button type="button" class="nav-link active" id="dashboard-tab" data-bs-target="#dashboard" data-bs-toggle="tab" role="tab" aria-controls="dashboard" aria-selected="true">
                    Dashboard
                  </button>
                </li>
                <li role="presentation">
                  <button type="button" className="nav-link" id="orders-tab" data-bs-target="#orders" data-bs-toggle="tab" role="tab" aria-controls="orders" aria-selected="false">
                    Orders
                  </button>
                </li>
                <li role="presentation">
                  <button type="button" className="nav-link" id="downloads-tab" data-bs-target="#downloads" data-bs-toggle="tab" role="tab" aria-controls="downloads" aria-selected="false">
                    Downloads
                  </button>
                </li>
                <li role="presentation">
                  <button type="button" className="nav-link" id="address-tab" data-bs-target="#address" data-bs-toggle="tab" role="tab" aria-controls="address" aria-selected="false">
                    Addresses
                  </button>
                </li>
                <li role="presentation">
                  <button type="button" className="nav-link" id="account-tab" data-bs-target="#account-details" data-bs-toggle="tab" role="tab" aria-controls="account-details" aria-selected="false">
                    Account details
                  </button>
                </li>
                <li><a href="login.html" className="nav-link">logout</a></li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-9 col-lg-9">
              <div className="tab-content dashboard-content">
                <div className="tab-pane fade show active" id="dashboard" aria-labelledby="dashboard-tab">
                  <h3>Dashboard </h3>
                  <p>From your account dashboard. you can easily check &amp; view your <a href="#">recent orders</a>, manage your <a href="#">shipping and billing addresses</a> and <a href="#">Edit your password and account details.</a></p>
                </div>
                <div className="tab-pane fade" id="orders" aria-labelledby="orders-tab">
                  <h3>Orders</h3>
                  <div className="organic-table-area table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>May 10, 2018</td>
                          <td><span class="success">Completed</span></td>
                          <td>$25.00 for 1 item </td>
                          <td><Link to="cart.html" className="view">view</Link></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>May 10, 2018</td>
                          <td>Processing</td>
                          <td>$17.00 for 1 item </td>
                          <td><Link to="cart.html" className="view">view</Link></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="downloads" aria-labelledby="downloads-tab">
                  <h3>Downloads</h3>
                  <div class="organic-table-area table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Downloads</th>
                          <th>Expires</th>
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Shopnovilla - Free Real Estate PSD Template</td>
                          <td>May 10, 2018</td>
                          <td><span class="danger">Expired</span></td>
                          <td><Link to="#" className="view">Click Here To Download Your File</Link> </td>
                        </tr>
                        <tr>
                          <td>Organic - ecommerce html template</td>
                          <td>Sep 11, 2018</td>
                          <td>Never</td>
                          <td><Link to="#" className="view">Click Here To Download Your File</Link> </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane" id="address" aria-labelledby="address-tab">
                  <p>The following addresses will be used on the checkout page by default.</p>
                  <h4 className="billing-address">Billing address</h4>
                  <Link to="#" class="view">Edit</Link>
                  <p><strong>Bobby Jackson</strong></p>
                  <address>
                    House #15<br />
                    Road #1<br />
                    Block #C <br />
                    Banasree <br />
                    Dhaka <br />
                    1212
                  </address>
                  <p>Bangladesh</p>
                </div>
                <div className="tab-pane fade" id="account-details" aria-labelledby="account-tab">
                  <h3>Account details </h3>
                  <div className="login">
                    <div className="login-form-container">
                      <div className="account-login-form">
                        <form action="#">
                          <p>Already have an account? <Link to="#">Log in instead!</Link></p>
                          <div className="input-radio">
                            <span className="custom-radio"><input type="radio" value="1" name="id_gender" /> Mr.</span>
                            <span className="custom-radio"><input type="radio" value="1" name="id_gender" /> Mrs.</span>
                          </div> <br />
                          <label>First Name</label>
                          <input type="text" name="first-name" />
                          <label>Last Name</label>
                          <input type="text" name="last-name" />
                          <label>Email</label>
                          <input type="text" name="email-name" />
                          <label>Password</label>
                          <input type="password" name="user-password" />
                          <label>Birthdate</label>
                          <input type="text" placeholder="MM/DD/YYYY" value="" name="birthday" />
                          <span class="example">
                            (E.g.: 05/31/1970)
                          </span>
                          <span className="custom-checkbox">
                            <input type="checkbox" value="1" name="optin" />
                            <label>Receive offers from our partners</label>
                          </span>
                          <span className="custom-checkbox">
                            <input type="checkbox" value="1" name="newsletter" />
                            <label>Sign up for our newsletter<br /><em>You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</em></label>
                          </span>
                          <div class="save-button primary-btn default-button">
                            <a href="#">Save</a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />


  </>)

}

export default Account;