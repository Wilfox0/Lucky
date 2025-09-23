import React, { useState } from "react";

// مكونات الإدمن
const Dashboard = () => <h2 className="text-xl">📊 الإحصائيات</h2>;
const Products = () => <h2 className="text-xl">🛒 إدارة المنتجات</h2>;
const Orders = () => <h2 className="text-xl">📦 إدارة الطلبات</h2>;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${activeTab === "dashboard" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            🏠 الرئيسية
          </li>
          <li
            className={`cursor-pointer ${activeTab === "products" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            🛒 المنتجات
          </li>
          <li
            className={`cursor-pointer ${activeTab === "orders" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📦 الطلبات
          </li>
        </ul>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 bg-gray-100">{renderContent()}</main>
    </div>
  );
};

export default Admin;
