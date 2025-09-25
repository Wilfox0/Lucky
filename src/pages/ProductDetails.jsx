import React from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { supabase } from "../utils/supabase";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.log(error);
      else setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>جاري التحميل...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.price} جنيه</p>
      <p className="mt-2">{product.description}</p>

      {/* الألوان والمقاسات */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-3">
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
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          أضف إلى السلة
        </button>
      ) : (
        <button className="mt-4 bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed">
          تم انتهاء الكمية
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
