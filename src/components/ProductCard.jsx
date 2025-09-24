import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-2 flex flex-col">
      <Link to={`/product/${product.id}`}>
        {product.images && product.images[0] && (
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-2"/>
        )}
        <h3 className="font-semibold">{product.name}</h3>
        <p className="font-bold">{product.price} جنيه</p>
      </Link>
      {product.quantity <= 0 && (
        <p className="text-red-500 font-bold mt-1">تم انتهاء الكمية</p>
      )}
    </div>
  );
};

export default ProductCard;
