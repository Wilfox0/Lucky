import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useCartStore } from "../store/cartStore";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // جلب الأقسام من قاعدة البيانات
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error && data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* اللوجو */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          متجر التجربة
        </Link>

        {/* البحث */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            بحث
          </button>
        </form>

        {/* روابط */}
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-green-600">
            الرئيسية
          </Link>
          <Link to="/products" className="hover:text-green-600">
            المنتجات
          </Link>
          <Link to="/about" className="hover:text-green-600">
            من نحن
          </Link>
          <Link to="/contact" className="hover:text-green-600">
            اتصل بنا
          </Link>

          {/* السلة */}
          <Link to="/cart" className="relative">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* الأقسام */}
      {categories.length > 0 && (
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto flex space-x-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.name}`)}
                className="px-3 py-1 bg-white rounded shadow hover:bg-green-100"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
