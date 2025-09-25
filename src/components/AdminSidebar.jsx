import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">لوحة التحكم</h2>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/admin/dashboard/products" className="hover:text-pink-500 transition">
            إدارة المنتجات
          </Link>
        </li>
        <li>
          <Link to="/admin/dashboard/categories" className="hover:text-pink-500 transition">
            إدارة الأقسام
          </Link>
        </li>
        <li>
          <Link to="/admin/dashboard/social-links" className="hover:text-pink-500 transition">
            روابط التواصل
          </Link>
        </li>
        <li>
          <Link to="/admin/dashboard/settings" className="hover:text-pink-500 transition">
            إعدادات المتجر
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
