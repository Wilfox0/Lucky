import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';


import { useCartStore } from "../../store/cartStore";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const handleAddOrUpdateProduct = async () => {
    const productData = {
      name,
      description,
      price,
      quantity,
      colors: colors.split(",").map(c => c.trim()),
      sizes: sizes.split(",").map(s => s.trim()),
      category,
      images
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("products").update(productData).eq("id", editId));
    } else {
      ({ error } = await supabase.from("products").insert([productData]));
    }

    if (error) {
      alert("حدث خطأ عند حفظ المنتج");
      return;
    }

    alert(editId ? "تم تعديل المنتج بنجاح" : "تمت إضافة المنتج بنجاح");
    setName(""); setDescription(""); setPrice(0); setQuantity(0);
    setColors(""); setSizes(""); setCategory(""); setImages([]); setEditId(null);
    fetchProducts();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(imgs => setImages(imgs));
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setColors(product.colors.join(", "));
    setSizes(product.sizes.join(", "));
    setCategory(product.category);
    setImages(product.images || []);
  };

  const handleDelete = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة المنتجات</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="اسم المنتج" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded"/>
        <input placeholder="الوصف" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded"/>
        <input type="number" placeholder="السعر" value={price} onChange={e => setPrice(Number(e.target.value))} className="border p-2 rounded"/>
        <input type="number" placeholder="الكمية" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border p-2 rounded"/>
        <input placeholder="الألوان (فاصلة)" value={colors} onChange={e => setColors(e.target.value)} className="border p-2 rounded"/>
        <input placeholder="المقاسات (فاصلة)" value={sizes} onChange={e => setSizes(e.target.value)} className="border p-2 rounded"/>
        <input placeholder="القسم" value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded"/>
        <input type="file" multiple onChange={handleImageChange} className="border p-2 rounded"/>
        <button onClick={handleAddOrUpdateProduct} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
          {editId ? "تعديل" : "إضافة"}
        </button>
      </div>

      <div className="space-y-2 mt-4">
        {products.map(p => (
          <div key={p.id} className="border p-2 flex justify-between items-center rounded hover:shadow-lg transition-shadow">
            <div>
              <span className="font-bold">{p.name}</span> - {p.price} جنيه
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors">تعديل</button>
              <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors">حذف</button>
              <button
                onClick={() => addToCart(p)}
                disabled={p.quantity <= 0}
                className={`px-2 py-1 rounded transition-colors ${
                  p.quantity > 0
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                {p.quantity > 0 ? "أضف للسلة" : "غير متوفر"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;
