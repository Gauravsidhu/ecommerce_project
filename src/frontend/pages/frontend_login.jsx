import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";

const Frontend_login = () => {

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
                <li>login</li>
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
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
            <div className="login_page_form">
              <form action="#">
                <div className="row">
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="name">Username or email <span>*</span></label>
                      <input id="name" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input_text">
                      <label htmlFor="password">Passwords <span>*</span></label>
                      <input id="password" type="password" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="login_submit">
                      <input className="inline" value="Login" name="Login" type="submit" />
                      <label className="inline" htmlFor="rememberme">
                        <input id="rememberme" type="checkbox" />
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>)

}

export default Frontend_login;