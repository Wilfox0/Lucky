import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useCartStore } from "../store/cartStore";
import notify from "../components/ToastNotification";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCartStore();

  const fetchProduct = async () => {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) console.log(error);
    else setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.quantity <= 0) {
      notify.outOfStockLimit(product.name, 0);
      return;
    }
    addToCart({ ...product, selectedColor, selectedSize });
  };

  if (!product) return <div>جارٍ التحميل...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        {product.images && product.images.map((img, i) => (
          <img key={i} src={img} alt={product.name} className="w-full mb-2 rounded"/>
        ))}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="mb-2">{product.description}</p>
        <p className="mb-2 font-bold">السعر: {product.price} جنيه</p>
        <p className="mb-2 font-bold">
          {product.quantity > 0 ? `الكمية المتاحة: ${product.quantity}` : "تم انتهاء الكمية"}
        </p>

        {product.colors && product.colors.length > 0 && (
          <div className="mb-2">
            <label className="font-semibold">اللون: </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border p-1 rounded ml-2"
            >
              <option value="">اختر اللون</option>
              {product.colors.map((color, i) => (
                <option key={i} value={color}>{color}</option>
              ))}
            </select>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-2">
            <label className="font-semibold">المقاس: </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border p-1 rounded ml-2"
            >
              <option value="">اختر المقاس</option>
              {product.sizes.map((size, i) => (
                <option key={i} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}

        <button
          disabled={product.quantity <= 0}
          onClick={handleAddToCart}
          className={`px-4 py-2 rounded mt-4 ${product.quantity > 0 ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-400 cursor-not-allowed text-white'}`}
        >
          {product.quantity > 0 ? "أضف إلى السلة" : "تم انتهاء الكمية"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
