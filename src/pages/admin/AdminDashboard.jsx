import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import CategoriesManagement from "./CategoriesManagement";
import ProductsManagement from "./ProductsManagement";
import OrdersManagement from "./OrdersManagement";
import SettingsManagement from "./SettingsManagement";
import ShippingManagement from "./ShippingManagement";
import SocialLinksManagement from "./SocialLinksManagement";

const AdminDashboard = () => {
  // تحقق بسيط، يمكن إضافة حالة تسجيل الدخول الحقيقية لاحقًا
  const isAdminLoggedIn = true; // يجب ربطه بعملية تسجيل الدخول

  if (!isAdminLoggedIn) return <Navigate to="/admin/login" />;

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="shipping" element={<ShippingManagement />} />
        <Route path="social-links" element={<SocialLinksManagement />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
