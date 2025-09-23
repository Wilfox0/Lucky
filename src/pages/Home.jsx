import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from '../utils/supabase';


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").limit(4); 
      if (!error && data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 space-y-10">
      {/* بانر ترحيبي */}
      <div className="bg-pink-100 rounded-2xl p-10 text-center shadow-md">
        <h1 className="text-3xl font-bold text-pink-700 mb-4">
          مرحباً بك في Lucky Store 🛍️
        </h1>
        <p className="text-gray-700 text-lg">
          وجهتك الأولى للموضة والراحة والجمال. اكتشفي تشكيلتنا الآن ✨
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          تصفح المتجر
        </Link>
      </div>

      {/* عرض بعض المنتجات */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">أحدث المنتجات</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={p.images?.[0] || "/assets/sample1.jpg"}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-pink-600 font-bold">{p.price} ج.م</p>
                <p className="text-sm text-gray-500">
                  الكمية المتاحة: {p.quantity}
                </p>
                <Link
                  to={`/product/${p.id}`}
                  className="mt-auto bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-center transition"
                >
                  عرض التفاصيل
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">لا توجد منتجات حالياً</p>
        )}
      </section>
    </div>
  );
}
