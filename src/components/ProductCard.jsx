import React from "react";
import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";

const ProductCard = ({ product }) => {
  const isOutOfStock = product.quantity <= 0;

  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 relative">
      {/* صورة المنتج */}
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.price} ج.م</p>

      {/* التقييم */}
      <ProductRating productId={product.id} />

      {/* حالة المخزون */}
      {isOutOfStock ? (
        <span className="text-red-500 font-bold block mt-2">
          تم انتهاء الكمية
        </span>
      ) : (
        <Link
          to={`/product/${product.id}`}
          className="block mt-2 bg-green-600 text-white text-center py-2 rounded hover:bg-green-700"
        >
          عرض التفاصيل
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
