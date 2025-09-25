import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useSettingsStore } from "../store/settingsStore";

const Header = () => {
  const { cartItems } = useCartStore();
  const { storeName, categories } = useSettingsStore();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* الشعار والاسم */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png"
          alt={storeName}
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-xl font-bold">{storeName}</h1>
      </div>

      {/* البحث والأقسام */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="ابحث عن منتجات..."
          className="border p-2 rounded"
        />
        <nav>
          <ul className="flex space-x-2">
            {categories.map((cat, idx) => (
              <li key={idx}>
                <Link to={`/shop?category=${encodeURIComponent(cat)}`} className="hover:underline">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* أيقونة السلة */}
      <div>
        <Link to="/cart" className="relative">
          🛒
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
