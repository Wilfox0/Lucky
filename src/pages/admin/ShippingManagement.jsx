import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const ShippingManagement = () => {
  const [shippingZones, setShippingZones] = useState([]);
  const [province, setProvince] = useState("");
  const [price, setPrice] = useState("");

  const fetchShipping = async () => {
    const { data, error } = await supabase.from("shipping").select("*");
    if (error) {
      notify.error("فشل جلب بيانات الشحن");
    } else {
      setShippingZones(data);
    }
  };

  const addShipping = async () => {
    if (!province || !price) return;

    const { error } = await supabase.from("shipping").insert([
      { province, price: parseFloat(price) },
    ]);

    if (error) {
      notify.error("فشل إضافة الشحن");
    } else {
      notify.saved("تم إضافة الشحن بنجاح");
      setProvince("");
      setPrice("");
      fetchShipping();
    }
  };

  const deleteShipping = async (id) => {
    const { error } = await supabase.from("shipping").delete().eq("id", id);
    if (error) {
      notify.error("فشل حذف الشحن");
    } else {
      notify.saved("تم حذف الشحن بنجاح");
      fetchShipping();
    }
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">إدارة الشحن</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="اسم المحافظة"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="border p-2 col-span-1"
        />
        <input
          type="number"
          placeholder="سعر الشحن"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 col-span-1"
        />
        <button
          onClick={addShipping}
          className="bg-blue-500 text-white p-2 col-span-1"
        >
          إضافة الشحن
        </button>
      </div>

      <ul>
        {shippingZones.map((zone) => (
          <li key={zone.id} className="flex justify-between p-2 border-b">
            <span>
              {zone.province} - {zone.price} ج.م
            </span>
            <button
              onClick={() => deleteShipping(zone.id)}
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

export default ShippingManagement;
