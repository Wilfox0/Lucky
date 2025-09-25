import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';


const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*");
    setOrders(data || []);
  };

  const handleStatusChange = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 إدارة الطلبات</h2>
      <div className="space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="border p-2 rounded bg-white flex justify-between items-center">
            <div>
              <p><span className="font-bold">الاسم:</span> {o.customer_name}</p>
              <p><span className="font-bold">الهاتف:</span> {o.phone}</p>
              <p><span className="font-bold">الإجمالي:</span> {o.total} جنيه</p>
              <p><span className="font-bold">الحالة:</span> {o.status}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleStatusChange(o.id, "قيد المعالجة")} className="bg-yellow-500 text-white px-3 py-1 rounded">قيد المعالجة</button>
              <button onClick={() => handleStatusChange(o.id, "تم التوصيل")} className="bg-green-600 text-white px-3 py-1 rounded">تم التوصيل</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersManagement;
