import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { supabase } from '../utils/supabase';

import notify from "../components/ToastNotification";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (product.quantity <= 0) {
      notify.outOfStock(product.name, product.quantity);
      return;
    }
    addToCart({ ...product, maxQuantity: product.quantity });
    notify.addToCart(product.name, 1);
  };

  if (!products.length) {
    return <div className="text-center py-10">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">🛍️ منتجاتنا</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-pink-600 font-bold text-xl">{product.price} ج.م</p>

              <p className="text-sm text-gray-600">
                {product.quantity > 0 ? (
                  <>متاح: {product.quantity} قطعة</>
                ) : (
                  <span className="text-red-500 font-bold">غير متوفر</span>
                )}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.quantity <= 0}
                className={`w-full mt-3 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  product.quantity > 0
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                {product.quantity > 0 ? "إضافة إلى السلة 🛒" : "غير متاح ❌"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
