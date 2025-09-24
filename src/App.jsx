import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import OrderReview from "./pages/OrderReview";
import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import ShippingManagement from "./pages/admin/ShippingManagement";
import SocialLinksManagement from "./pages/admin/SocialLinksManagement";
import SettingsManagement from "./pages/admin/SettingsManagement";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* صفحات عامة */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/order-review" element={<OrderReview />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* صفحات الأدمن */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
              <Route path="shipping" element={<ShippingManagement />} />
              <Route path="social" element={<SocialLinksManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
            </Route>

            {/* لو المسار غلط */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
