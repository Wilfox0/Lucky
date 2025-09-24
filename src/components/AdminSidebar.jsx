import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="hover:text-yellow-400">
            الرئيسية
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="hover:text-yellow-400">
            إدارة المنتجات
          </Link>
        </li>
        <li>
          <Link to="/admin/categories" className="hover:text-yellow-400">
            إدارة الأقسام
          </Link>
        </li>
        <li>
          <Link to="/admin/shipping" className="hover:text-yellow-400">
            إدارة الشحن
          </Link>
        </li>
        <li>
          <Link to="/admin/social-links" className="hover:text-yellow-400">
            روابط التواصل
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="hover:text-yellow-400">
            إدارة الطلبات
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="hover:text-yellow-400">
            إعدادات المتجر
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
