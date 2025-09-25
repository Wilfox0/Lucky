import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      </Link>
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500 mt-1">{product.price} جنيه</p>

      {/* الألوان والمقاسات */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold">الألوان: </span>
          {product.colors.join(", ")}
        </div>
      )}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-1">
          <span className="font-semibold">المقاسات: </span>
          {product.sizes.join(", ")}
        </div>
      )}

      {/* زر الإضافة للسلة */}
      {product.quantity > 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          أضف إلى السلة
        </button>
      ) : (
        <button className="mt-3 w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed">
          تم انتهاء الكمية
        </button>
      )}
    </div>
  );
};

export default ProductCard;
