import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const About = () => {
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
                <li>About Us</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    {/* Second section */}

    <div className="about_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 col-md-12 text-center">
            <div className="about_section_one">
              <h2>Welcome To ZestyCart food Store</h2>
              <p>At ZestyCart, we bring you the freshest ingredients and the finest flavors, all in one place. Discover a wide range of quality food products that add taste, health, and joy to your everyday meals. Whether you're cooking at home or planning a feast, ZestyCart is your go-to destination for delicious choices delivered with care.</p>

            </div>
            <div className="about__store__btn">
              <Link to="/contact">contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Third section */}

    <div className="about_chooseUs_area pb-90">
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-xl-6 col-lg-12 col-md-12">
            <div className="video__wrape__area" style={{ backgroundImage: 'url("frontend/assets/img/banner/about1.jpg")' }}
            >
              <div className="video__inner">
                <a className="video__trigger" href="https://youtu.be/0fX4N1u5gCM?si=eqMeFbesrMnMnbYc"><i className="zmdi zmdi-play"></i></a>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12">
            <div className="about_choose_content">
              <h3>Why Choose Us?</h3>
              <div className="choose_content_inner">
                <div className="single_choose_us">
                  <div className="choose_us mb-50">
                    <div className="choose_icone">
                      <i className="zmdi zmdi-favorite-outline"></i>
                    </div>
                    <div className="choose_details">
                      <h4>Free Gift Box</h4>
                      <p>Lorem ipsum dolor sit amet consect adipisic elit sed do. </p>
                    </div>
                  </div>
                  <div className="choose_us">
                    <div className="choose_icone">
                      <i className="zmdi zmdi-truck"></i>
                    </div>
                    <div className="choose_details">
                      <h4>Free Delivery</h4>
                      <p>Lorem ipsum dolor sit amet consect adipisic elit sed do. </p>
                    </div>
                  </div>
                </div>
                <div className="single_choose_us">
                  <div className="choose_us  mb-50">
                    <div className="choose_icone">
                      <i className="zmdi zmdi-refresh-alt"></i>
                    </div>
                    <div className="choose_details">
                      <h4>Money Back</h4>
                      <p>Lorem ipsum dolor sit amet consect adipisic elit sed do. </p>
                    </div>
                  </div>
                  <div className="choose_us">
                    <div className="choose_icone"><i className="zmdi zmdi-time"></i>  </div>
                    <div className="choose_details">
                      <h4>Support 24/7</h4>
                      <p>Lorem ipsum dolor sit amet consect adipisic elit sed do. </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Fourth section */}

    {/* <div className="about_team_area ptb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="about_section_title">
              <h2>Our Staff</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labo.</p>
            </div>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="single_team">
              <div className="team__imge">
                <Link to="#"><img src="frontend/assets/img/banner/team1.jpg" alt="" /></Link>
              </div>
              <div className="team_hover_inpo">
                <div className="team_hover_action">
                  <h2><Link to="#">Grace Porter</Link></h2>
                  <ul>
                    <li><Link to="#"><i className="zmdi zmdi-twitter"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-instagram"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-facebook"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-google-plus"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="single_team">
              <div className="team__imge">
                <Link to="#"><img src="frontend/assets/img/banner/team2.jpg" alt="" /></Link>
              </div>
              <div className="team_hover_inpo">
                <div className="team_hover_action">
                  <h2><Link to="#">Larry Martin</Link></h2>
                  <ul>
                    <li><Link to="#"><i className="zmdi zmdi-twitter"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-instagram"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-facebook"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-google-plus"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="single_team team__three">
              <div className="team__imge">
                <Link to="#"><img src="frontend/assets/img/banner/team4.jpg" alt="" /></Link>
              </div>
              <div className="team_hover_inpo">
                <div className="team_hover_action">
                  <h2><Link to="#">Tiffany Fowler</Link></h2>
                  <ul>
                    <li><Link to="#"><i className="zmdi zmdi-twitter"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-instagram"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-facebook"></i></Link></li>
                    <li><Link to="#"><i className="zmdi zmdi-google-plus"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}

    {/* Fifth section */}

    <div
      className="about_testimonial_area mb-45"
      style={{
        backgroundImage: 'url("/frontend/assets/img/banner/testimonial4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // padding: '60px 0',
      }}
    >
      <div className="about_testimonial_inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 offset-xl-2 col-lg-12 col-md-12">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                className="testimonial___wrapper"
              >
                {/* Testimonial 1 */}
                <SwiperSlide>
                  <div className="single___testimonial text-center">
                    <div className="testimonial__image">
                      <img src="/frontend/assets/img/banner/testi1.png" alt="Testimonial 1" />
                    </div>
                    <div className="testimonial__details">
                      <p>
                        ZestyCart is my go-to store for all things food. Their quality and delivery service
                        are unmatched. I love the freshness they offer!
                      </p>
                    </div>
                    <div className="testimonial__info">
                      <Link to="#">Riya Sharma</Link>
                      <span> - </span>
                      <span>Customer</span>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Testimonial 2 */}
                <SwiperSlide>
                  <div className="single___testimonial text-center">
                    <div className="testimonial__image">
                      <img src="/frontend/assets/img/banner/testi2.png" alt="Testimonial 2" />
                    </div>
                    <div className="testimonial__details">
                      <p>
                        Amazing variety and fast service! ZestyCart has really changed the way I shop for
                        groceries online. Highly recommended!
                      </p>
                    </div>
                    <div className="testimonial__info">
                      <Link to="#">Anita Verma</Link>
                      <span> - </span>
                      <span>Customer</span>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Testimonial 3 */}
                <SwiperSlide>
                  <div className="single___testimonial text-center">
                    <div className="testimonial__image">
                      <img src="/frontend/assets/img/banner/testi3.png" alt="Testimonial 3" />
                    </div>
                    <div className="testimonial__details">
                      <p>
                        The products I receive are always fresh and the prices are great. ZestyCart has become
                        a part of my weekly routine.
                      </p>
                    </div>
                    <div className="testimonial__info">
                      <Link to="#">Sneha Kulkarni</Link>
                      <span> - </span>
                      <span>Customer</span>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>



    <Footer />


  </>)

}

export default About;