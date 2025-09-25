import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { supabase } from '../utils/supabase';
import notify from "./ToastNotification"; // ✅ استدعاء Notify مضبوط

const Header = () => {
  const cart = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const [storeName, setStoreName] = useState("المتجر");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from("settings").select("*").single();
      if (!error && data) {
        setStoreName(data.store_name || "المتجر");
        setLogo(data.logo_url || null);
      }
    };
    fetchSettings();
  }, []);

  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleClearCart = () => {
    clearCart();
    notify.cartCleared(); // ✅ استخدام دالة Toast بشكل صحيح
  };

  return (
    <header className="bg-pink-200 text-gray-900 p-4 flex justify-between items-center shadow-md">
      {/* لوجو واسم المتجر */}
      <Link
        to="/"
        className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
      >
        {logo ? (
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
            🏬
          </div>
        )}
        <h1 className="text-xl font-bold hover:text-pink-600 transition-colors duration-200">
          {storeName}
        </h1>
      </Link>

      {/* روابط التنقل */}
      <nav className="flex gap-6">
        <Link
          to="/"
          className="relative text-gray-900 hover:text-pink-600 transition-colors duration-200 
                     after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 
                     after:bg-pink-600 after:transition-all after:duration-200 hover:after:w-full"
        >
          الرئيسية
        </Link>
        <Link
          to="/shop"
          className="relative text-gray-900 hover:text-pink-600 transition-colors duration-200 
                     after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 
                     after:bg-pink-600 after:transition-all after:duration-200 hover:after:w-full"
        >
          المتجر
        </Link>
        <Link
          to="/about"
          className="relative text-gray-900 hover:text-pink-600 transition-colors duration-200 
                     after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 
                     after:bg-pink-600 after:transition-all after:duration-200 hover:after:w-full"
        >
          من نحن
        </Link>
        <Link
          to="/contact"
          className="relative text-gray-900 hover:text-pink-600 transition-colors duration-200 
                     after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 
                     after:bg-pink-600 after:transition-all after:duration-200 hover:after:w-full"
        >
          تواصل معنا
        </Link>
      </nav>

      {/* سلة المشتريات */}
      <div className="flex items-center gap-3">
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 transition-colors duration-200 shadow-md"
        >
          <span>🛒</span>
          <span>سلة</span>
          <span className="bg-white text-pink-500 px-2 py-1 rounded-full text-sm font-bold">
            {cartCount}
          </span>
        </Link>

        {cartCount > 0 && (
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
          >
            تفريغ السلة 🗑️
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
