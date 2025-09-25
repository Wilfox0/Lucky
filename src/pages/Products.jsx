import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*");
      if (data) setCategories(data);
    };

    const fetchProducts = async () => {
      let query = supabase.from("products").select("*");
      if (selectedCategory) query = query.eq("category", selectedCategory);
      if (search) query = query.ilike("name", `%${search}%`);
      const { data } = await query;
      if (data) setProducts(data);
    };

    fetchCategories();
    fetchProducts();
  }, [search, selectedCategory]);

  return (
    <div className="products p-6">
      <h1 className="text-3xl font-bold mb-4">المنتجات</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-4 border rounded p-2"
        >
          <option value="">كل الأقسام</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
