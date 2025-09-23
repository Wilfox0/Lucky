import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';
import { sendTelegramMessage } from "../../utils/telegram"; // المسار حسب موقع الملف

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) throw error;

      setOrders(data || []);

      // إرسال إشعار تليجرام لكل أوردر جديد
      if (data && data.length > 0) {
        data.forEach(async (orderData) => {
          const message = `✅ تم استلام طلب جديد:
العميل: ${orderData.customer_name}
المجموع: ${orderData.total_price} جنيه`;
          await sendTelegramMessage(message);
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
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
              <p><span className="font-bold">الإجمالي:</span> {o.total_price} جنيه</p>
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
