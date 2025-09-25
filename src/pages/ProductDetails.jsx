import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      if (data) setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (quantity > product.quantity) {
      toast.error(`${product.name} أقصى كمية ممكنة ${product.quantity}`);
      return;
    }
    // هنا الربط مع السلة
  };

  if (!product) return <p>جارٍ التحميل...</p>;

  return (
    <div className="product-details p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.images[0]} alt={product.name} className="w-64 h-64 mb-4"/>
      <p className="mb-2">{product.description}</p>
      <p className="mb-2 font-bold">{product.price} جنيه</p>

      {product.quantity > 0 ? (
        <>
          {product.colors && (
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="border p-2 mr-2">
              <option value="">اختر اللون</option>
              {product.colors.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
            </select>
          )}
          {product.sizes && (
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border p-2">
              <option value="">اختر المقاس</option>
              {product.sizes.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
            </select>
          )}
          <input type="number" min="1" max={product.quantity} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border p-2 ml-2 w-20"/>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 ml-2">أضف إلى السلة</button>
        </>
      ) : (
        <p className="text-red-600 font-bold">تم انتهاء الكمية</p>
      )}
    </div>
  );
}
