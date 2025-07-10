import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    const desktopParents = document.querySelectorAll('.menu .mega_parent');
    const mobileParents = document.querySelectorAll('.mobile-menu .mega_parent > a');

    const handleMouseEnter = (e) => {
      const submenu = e.currentTarget.querySelector('.mega_menu');
      if (submenu) submenu.classList.add('open');
    };

    const handleMouseLeave = (e) => {
      const submenu = e.currentTarget.querySelector('.mega_menu');
      if (submenu) submenu.classList.remove('open');
    };

    const handleMobileClick = (e) => {
      e.preventDefault();
      const submenu = e.currentTarget.nextElementSibling;
      if (submenu) submenu.classList.toggle('open');
      e.currentTarget.classList.toggle('open');
    };

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuContainer = document.querySelector('.mobile-menu');

    const toggleMobileMenu = () => {
      mobileMenuContainer.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    };

    desktopParents.forEach(parent => {
      parent.addEventListener('mouseenter', handleMouseEnter);
      parent.addEventListener('mouseleave', handleMouseLeave);
    });

    mobileParents.forEach(anchor => {
      anchor.addEventListener('click', handleMobileClick);
    });

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    return () => {
      desktopParents.forEach(parent => {
        parent.removeEventListener('mouseenter', handleMouseEnter);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      });

      mobileParents.forEach(anchor => {
        anchor.removeEventListener('click', handleMobileClick);
      });

      if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener('click', toggleMobileMenu);
      }
    };
  }, []);

  return (
    <div className="organic_food_wrapper">
      <header className="header sticky-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header_wrapper_inner">

                <div className="logo col-xs-12">
                  <Link to="/">
                    <h3 style={{ fontFamily: 'Arial, sans-serif' }}>
                      <span style={{ color: '#6d9e31', fontWeight: 'bold' }}>Zesty</span>
                      <span style={{ color: '#2e3640', fontWeight: 'bold' }}>Cart</span>
                    </h3>
                  </Link>
                </div>

                <button className="mobile-menu-toggle d-lg-none" aria-label="Toggle Menu">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </button>

                {/* Desktop Menu */}
                <div className="main_menu_inner d-none d-lg-block">
                  <div className="menu">
                    <nav>
                      <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        {/* <li className="mega_parent">
                          <Link to="#">Pages</Link>
                          <ul className="mega_menu">
                            <li><Link to="/account">Account</Link></li>
                            <li><Link to="/wishlist">Wishlist</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/checkout">Checkout</Link></li>
                            <li><Link to="/frontend_login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                          </ul>
                        </li> */}
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="mobile-menu d-lg-none">
                  <nav>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/shop">Shop</Link></li>
                      {/* <li className="mega_parent">
                        <Link to="#">Pages</Link>
                        <ul className="mega_menu">
                          <li><Link to="/account">Account</Link></li>
                          <li><Link to="/wishlist">Wishlist</Link></li>
                          <li><Link to="/cart">Cart</Link></li>
                          <li><Link to="/checkout">Checkout</Link></li>
                          <li><Link to="/frontend_login">Login</Link></li>
                          <li><Link to="/register">Register</Link></li>
                        </ul>
                      </li> */}
                      <li><Link to="/contact">Contact</Link></li>
                    </ul>
                  </nav>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
