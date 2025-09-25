import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="home p-6">
      <h1 className="text-3xl font-bold mb-6">أحدث المنتجات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
