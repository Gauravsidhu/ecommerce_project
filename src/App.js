import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './frontend/pages/cart_content';

// Backend Imports
import Login from './backend/pages/login';
import Signup from './backend/pages/signup';
import Dashboard from './backend/pages/dashboard';
import Addcategories from './backend/pages/add_categories';
import EditCategory from './backend/pages/edit_categories';
import DeleteCategory from './backend/pages/delete_categories';
import Products from './backend/pages/products';
import Addproducts from './backend/pages/add_products';
import EditProducts from './backend/pages/edit_products';
import DeleteProducts from './backend/pages/delete_products';

// Frontend Imports
import Header from './frontend/components/header';
import Footer from './backend/components/footer';
import Home from './frontend/pages/index';
import About from './frontend/pages/about';
import Shop from './frontend/pages/shop';
import Contact from './frontend/pages/contact';
import Product_details from './frontend/pages/product_details';
import Account from './frontend/pages/account';
import Wishlist from './frontend/pages/wishlist';
import Cart from './frontend/pages/cart';
import Checkout from './frontend/pages/checkout';
import Frontend_login from './frontend/pages/frontend_login';
import Register from './frontend/pages/register';
import Prc from './frontend/pages/prc';
import CategoryProducts from './frontend/pages/category_products';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Frontend Paths */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product_details/:id" element={<Product_details />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/Frontend_login" element={<Frontend_login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/prc" element={<Prc />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />

          {/* Admin Paths */}
          <Route path="/admin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add_categories" element={<Addcategories />} />
          <Route path="/edit_categories/:id" element={<EditCategory />} />
          <Route path="/delete_categories/:id" element={<DeleteCategory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add_products" element={<Addproducts />} />
          <Route path="/edit_products/:id" element={<EditProducts />} />
          <Route path="/delete_products/:id" element={<DeleteProducts />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
