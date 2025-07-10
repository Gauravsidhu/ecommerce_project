import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/products/category/${categoryId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <>
      <Header />

      <div className="breadcrumb_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home {'>'}</Link>

                  </li>
                  <li>Category</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-4 pb-5">
        <h4 className="mb-4 text-center fw-bold text-uppercase text-success">Products in this Category</h4>

        {products.length === 0 ? (
          <p className="text-center text-muted">No products found in this category.</p>
        ) : (
          <div className="row g-4">
            {products.map(product => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6" key={product._id}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="position-relative">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "220px", objectFit: "cover", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
                    />
                    <span className="badge bg-danger position-absolute top-0 end-0 m-2">NEW</span>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title text-truncate">{product.name}</h5>
                    <p className="card-text text-success fw-semibold fs-5">₹{product.price}</p>
                    <Link
                      to={`/product_details/${product._id}`}
                      className="btn btn-outline-primary btn-sm mt-auto w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CategoryProducts;
