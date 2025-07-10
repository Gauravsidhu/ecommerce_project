import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Register = () => {

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
                <li>Register</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    {/* Second section */}

    <div className="page_login_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="register_page_form">
              <form action="#">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="input_text">
                      <label htmlFor="R_N">First Name <span>*</span></label>
                      <input id="R_N" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="input_text">
                      <label htmlFor="R_N2">Last Name <span>*</span></label>
                      <input id="R_N2" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="R_N3">Company Name</label>
                      <input id="R_N3" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="input_text">
                      <label htmlFor="R_N4">Email Address <span>*</span></label>
                      <input id="R_N4" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="input_text">
                      <label htmlFor="R_N5">Phone<span>*</span></label>
                      <input id="R_N5" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="R_N6">Country<span>*</span></label>
                      <select id="R_N6">
                        <option value="1">Select a country</option>
                        <option value="2">bangladesh</option>
                        <option value="3">Algeria</option>
                        <option value="4">Afghanistan</option>
                        <option value="5">Ghana</option>
                        <option value="6">Albania</option>
                        <option value="7">Colombia</option>
                        <option value="8">Bahrain</option>
                        <option value="9">Dominican Republic</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="R_N7">Address<span>*</span></label>
                      <input id="R_N7" placeholder="Street address" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <input placeholder="Apartment, suite, unit etc. (optional)" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="R_N8">Town / City<span>*</span></label>
                      <input id="R_N8" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="input_text">
                      <label htmlFor="R_N9">State / County <span>*</span></label>
                      <input id="R_N9" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="input_text">
                      <label htmlFor="R_N10">Postcode / Zip<span>*</span></label>
                      <input id="R_N10" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="R_N11">Account password<span>*</span></label>
                      <input id="R_N11" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="R_N12">Confirm password<span>*</span></label>
                      <input id="R_N12" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <input id="rememberme" type="checkbox" />
                      <label htmlFor="rememberme">I agree Terms & Condition</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="login_submit">
                      <input value="register" type="submit" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

  </>)

}

export default Register;