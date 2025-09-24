import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const ShippingManagement = () => {
  const [provinces, setProvinces] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProvinces = async () => {
    const { data, error } = await supabase.from("provinces").select("*");
    if (error) console.log(error);
    else setProvinces(data);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const addProvince = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("provinces")
      .insert([{ name, shipping_price: parseFloat(price) }]);
    if (error) console.log(error);
    else {
      notify.added(name);
      setName("");
      setPrice("");
      fetchProvinces();
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">إدارة الشحن</h2>
      <form onSubmit={addProvince} className="mb-6">
        <input
          type="text"
          placeholder="اسم المحافظة"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <input
          type="number"
          placeholder="سعر الشحن"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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

      <ul>
        {provinces.map((p) => (
          <li key={p.id} className="mb-2 border p-2 rounded">
            {p.name} - {p.shipping_price} جنيه
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingManagement;
