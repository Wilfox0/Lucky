import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg p-3 text-center">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-pink-700 font-bold">{product.price} ج.م</p>
      <div className="flex justify-center mt-2">
        {"⭐".repeat(product.rating)}
      </div>
      <div className="flex justify-between items-center mt-3">
        <Link
          to={`/product/${product.id}`}
          className="bg-pink-300 text-white px-3 py-1 rounded-lg hover:bg-pink-400"
        >
          التفاصيل
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600"
        >
          🛒
        </button>
      </div>
    </div>
  );
}
