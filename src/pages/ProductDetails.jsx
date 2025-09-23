import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from '../utils/supabase';

import { useCartStore } from "../store/cartStore";
import notify from "../components/ToastNotification";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProduct(data);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">جاري التحميل...</div>;
  }

  const handleAddToCart = () => {
    if (product.quantity <= 0) {
      notify.outOfStock(product.name, product.quantity);
      return;
    }
    addToCart({ ...product, maxQuantity: product.quantity });
    notify.addToCart(product.name, 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded-2xl mb-6"
      />
      <p className="text-xl text-pink-600 font-bold mb-4">{product.price} ج.م</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-gray-800 mb-4">
        {product.quantity > 0 ? (
          <>متاح: {product.quantity} قطعة</>
        ) : (
          <span className="text-red-500 font-bold">غير متوفر</span>
        )}
      </p>

      <button
        onClick={handleAddToCart}
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
  );
};

export default ProductDetails;
