import React, { useState } from "react";
import { useSettingsStore } from "../../store/settingsStore";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { categories } = useSettingsStore();

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    if (data) setProducts(data);
  };

  const addProduct = async () => {
    if (!name || !price || !quantity || !category || !imageFile) return;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("products")
      .upload(`images/${imageFile.name}`, imageFile);

    if (uploadError) {
      notify.error("فشل رفع الصورة");
      return;
    }

    const imageUrl = supabase.storage
      .from("products")
      .getPublicUrl(`images/${imageFile.name}`).publicUrl;

    const { error } = await supabase.from("products").insert([
      {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category,
        image: imageUrl,
      },
    ]);

    if (error) {
      notify.error("فشل إضافة المنتج");
    } else {
      notify.saved("تم إضافة المنتج بنجاح");
      setName("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setImageFile(null);
      fetchProducts();
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      notify.error("فشل حذف المنتج");
    } else {
      notify.saved("تم حذف المنتج بنجاح");
      fetchProducts();
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">إدارة المنتجات</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 col-span-1"
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 col-span-1"
        />
        <input
          type="number"
          placeholder="الكمية"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 col-span-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 col-span-1"
        >
          <option value="">اختر القسم</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 col-span-1"
        />
      </div>
      <button
        onClick={addProduct}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        إضافة المنتج
      </button>

      <ul>
        {products.map((prod) => (
          <li key={prod.id} className="flex justify-between p-2 border-b">
            <span>{prod.name}</span>
            <button
              onClick={() => deleteProduct(prod.id)}
              className="text-red-500"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsManagement;
