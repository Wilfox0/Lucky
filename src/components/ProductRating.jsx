import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const ProductRating = ({ productId }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("product_id")
        .eq("product_id", productId);

      if (!error && data) {
        setRating(data.length); // عدد مرات الطلب = التقييم المبدئي
      }
    };

    fetchRating();
  }, [productId]);

  return (
    <div className="flex items-center mt-2">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < Math.min(rating, 5) ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating} تقييم</span>
    </div>
  );
};

export default ProductRating;
