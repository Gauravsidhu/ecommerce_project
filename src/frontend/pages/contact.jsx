import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message field cannot be empty.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5500/api/contact", formData);
        if (res.status === 201) {
          setSuccessMessage("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
        }
      } catch (error) {
        console.error("Submission Error:", error);
        alert("There was an error submitting the form.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="breadcrumb_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul>
                  <li><Link to="/">Home {'>'}</Link></li>
                  <li>Contact</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_area ptb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="contact_map_wrapper">
                <div className="contact_map mb-40">
                  <div className="mapouter" style={{ position: "relative", textAlign: "right", width: "100%", height: "400px" }}>
                    <div className="gmap_canvas" style={{ overflow: "hidden", background: "none!important", width: "100%", height: "400px" }}>
                      <iframe
                        className="gmap_iframe"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        title="Google Map"
                        src="https://maps.google.com/maps?width=600&height=400&hl=en&q=ludhiana&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                      ></iframe>
                    </div>
                  </div>

                </div>

                <div className="contact-message">
                  <div className="contact_title">
                    <h4>Contact Information</h4>
                  </div>

                  <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="contact_n">Name<span>*</span></label>
                        <input
                          name="name"
                          id="contact_n"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? "input-error" : ""}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="contact_n2">Email<span>*</span></label>
                        <input
                          name="email"
                          id="contact_n2"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="contact_n3">Telephone</label>
                        <input
                          name="phone"
                          id="contact_n3"
                          type="text"
                          value={formData.phone}
                          onChange={handleChange}
                          className={errors.phone ? "input-error" : ""}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="contact_n4">Subject</label>
                        <input
                          name="subject"
                          id="contact_n4"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          className={errors.subject ? "input-error" : ""}
                        />
                        {errors.subject && <span className="error-text">{errors.subject}</span>}
                      </div>

                      <div className="col-12">
                        <div className="contact-textarea">
                          <label>Comment<span>*</span></label>
                          <textarea
                            name="message"
                            className={`form-control2 ${errors.message ? "input-error" : ""}`}
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                          {errors.message && <span className="error-text">{errors.message}</span>}
                        </div>
                        <button type="submit">Send Message</button>
                      </div>
                    </div>
                    {successMessage && (
                      <p className="form-success" style={{ color: "green", marginTop: "15px" }}>
                        {successMessage}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-5">
              <div className="contact_info_wrapper">
                <div className="contact_title"><h4>Location & Details</h4></div>
                <div className="contact_info mb-15">
                  <div className="contact_info_icone">
                    <Link to="#"><i className="icofont icofont-location-pin"></i></Link>
                  </div>
                  <div className="contact_info_text">
                    <p><span>Address:</span> Civil Lines <br /> Ludhiana. Punjab</p>
                  </div>
                </div>
                <div className="contact_info mb-15">
                  <div className="contact_info_icone">
                    <Link to="#"><i className="icofont icofont-email"></i></Link>
                  </div>
                  <div className="contact_info_text">
                    <p><span>Email: </span> sidhugaurav69mail.com </p>
                  </div>
                </div>
                <div className="contact_info mb-15">
                  <div className="contact_info_icone">
                    <Link to="#"><i className="icofont icofont-phone"></i></Link>
                  </div>
                  <div className="contact_info_text">
                    <p><span>Phone:</span> (+91) 9877360616 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
