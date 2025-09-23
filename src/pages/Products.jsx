// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import supabase from "../utils/supabase";

export default function Products() {
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) setProducts(data);
    };
    fetchProducts();
  }, []);

  if (!products.length) {
    return <p className="text-center mt-10 text-gray-600">لا توجد منتجات حالياً</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-8 text-pink-600">
        جميع المنتجات 🛍️
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {/* صورة المنتج */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images?.[0] || "/assets/placeholder.png"}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
            </Link>

            {/* تفاصيل المنتج */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-pink-600 font-semibold mt-1">
                {product.price} ج.م
              </p>

              {/* الكمية */}
              <p
                className={`mt-1 text-sm ${
                  product.quantity > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.quantity > 0
                  ? `متوفر: ${product.quantity}`
                  : "غير متوفر"}
              </p>

              {/* الأزرار */}
              <div className="mt-auto flex gap-2 pt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg text-center hover:bg-gray-200 transition"
                >
                  التفاصيل
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.quantity <= 0}
                  className={`flex-1 py-2 rounded-lg text-center transition ${
                    product.quantity > 0
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  أضف للسلة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
