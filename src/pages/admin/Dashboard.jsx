import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    categories: 0,
    shipping: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // جلب عدد المنتجات
        const { count: productsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        // جلب عدد الطلبات
        const { count: ordersCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true });

        // جلب عدد الأقسام
        const { count: categoriesCount } = await supabase
          .from("categories")
          .select("*", { count: "exact", head: true });

        // جلب عدد المحافظات للشحن
        const { count: shippingCount } = await supabase
          .from("shipping")
          .select("*", { count: "exact", head: true });

        setStats({
          products: productsCount || 0,
          orders: ordersCount || 0,
          categories: categoriesCount || 0,
          shipping: shippingCount || 0,
        });
      } catch (err) {
        console.error("خطأ أثناء جلب الإحصائيات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h2 className="text-xl">⏳ جاري تحميل الإحصائيات...</h2>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 إحصائيات المتجر</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg">🛒 المنتجات</h3>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg">📦 الطلبات</h3>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg">📂 الأقسام</h3>
          <p className="text-2xl font-bold">{stats.categories}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg">🚚 الشحن</h3>
          <p className="text-2xl font-bold">{stats.shipping}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
