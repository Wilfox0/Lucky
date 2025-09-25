import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';



const ShippingManagement = () => {
  const [shippingList, setShippingList] = useState([]);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchShipping();
  }, []);

  const fetchShipping = async () => {
    const { data } = await supabase.from("shipping").select("*");
    setShippingList(data || []);
  };

  const handleAddOrUpdate = async () => {
    if (!city || price <= 0) {
      alert("يرجى إدخال اسم المحافظة وسعر الشحن بشكل صحيح");
      return;
    }

    if (editId) {
      await supabase.from("shipping").update({ city, price }).eq("id", editId);
    } else {
      await supabase.from("shipping").insert([{ city, price }]);
    }

    setCity(""); setPrice(0); setEditId(null);
    fetchShipping();
  };

  const handleEdit = (s) => {
    setCity(s.city);
    setPrice(s.price);
    setEditId(s.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("shipping").delete().eq("id", id);
    fetchShipping();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة الشحن</h2>
      <div className="mb-4 flex gap-2">
        <input placeholder="اسم المحافظة" value={city} onChange={e => setCity(e.target.value)} className="border p-2"/>
        <input type="number" placeholder="سعر الشحن" value={price} onChange={e => setPrice(Number(e.target.value))} className="border p-2"/>
        <button onClick={handleAddOrUpdate} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
          {editId ? "تعديل" : "إضافة"}
        </button>
      </div>

      <div className="space-y-2 mt-4">
        {shippingList.map(s => (
          <div key={s.id} className="border p-2 flex justify-between items-center">
            <span>{s.city}: {s.price} جنيه</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white px-2 py-1 rounded">تعديل</button>
              <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingManagement;
