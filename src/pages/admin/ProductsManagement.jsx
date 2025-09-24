import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log(error);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category,
          images: images.split(",").map((img) => img.trim()),
        },
      ]);

    if (error) console.log(error);
    else {
      notify.added(name);
      setName("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setImages("");
      fetchProducts();
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">إدارة المنتجات</h2>
      <form onSubmit={addProduct} className="mb-6">
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="number"
          placeholder="الكمية"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          placeholder="القسم"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="text"
          placeholder="روابط الصور (, مفصولة)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          إضافة
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">الاسم</th>
            <th className="border px-2 py-1">السعر</th>
            <th className="border px-2 py-1">الكمية</th>
            <th className="border px-2 py-1">القسم</th>
            <th className="border px-2 py-1">صور</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.quantity}</td>
              <td className="border px-2 py-1">{p.category}</td>
              <td className="border px-2 py-1">
                {p.images && p.images.map((img, i) => (
                  <img key={i} src={img} alt={p.name} className="w-12 h-12 inline-block mr-1"/>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsManagement;
