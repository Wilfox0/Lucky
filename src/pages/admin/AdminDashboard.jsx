import React, { useState } from "react";
import ProductsManagement from "./ProductsManagement";
import CategoriesManagement from "./CategoriesManagement";
import ShippingManagement from "./ShippingManagement";
import SettingsManagement from "./SettingsManagement";
import SocialLinksManagement from "./SocialLinksManagement";
import OrdersManagement from "./OrdersManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const renderContent = () => {
    switch (activeTab) {
      case "products": return <ProductsManagement />;
      case "categories": return <CategoriesManagement />;
      case "shipping": return <ShippingManagement />;
      case "settings": return <SettingsManagement />;
      case "social": return <SocialLinksManagement />;
      case "orders": return <OrdersManagement />;
      default: return <h2>اختر من القائمة</h2>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
        <ul className="space-y-4">
          <li className={`cursor-pointer ${activeTab === "products" ? "font-bold" : ""}`} onClick={() => setActiveTab("products")}>🛒 المنتجات</li>
          <li className={`cursor-pointer ${activeTab === "categories" ? "font-bold" : ""}`} onClick={() => setActiveTab("categories")}>📂 الأقسام</li>
          <li className={`cursor-pointer ${activeTab === "shipping" ? "font-bold" : ""}`} onClick={() => setActiveTab("shipping")}>🚚 الشحن</li>
          <li className={`cursor-pointer ${activeTab === "social" ? "font-bold" : ""}`} onClick={() => setActiveTab("social")}>🔗 روابط التواصل</li>
          <li className={`cursor-pointer ${activeTab === "orders" ? "font-bold" : ""}`} onClick={() => setActiveTab("orders")}>📦 الطلبات</li>
          <li className={`cursor-pointer ${activeTab === "settings" ? "font-bold" : ""}`} onClick={() => setActiveTab("settings")}>⚙️ الإعدادات</li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
