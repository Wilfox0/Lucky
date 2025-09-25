import React from "react";
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="hover:text-pink-400">
              🏠 الرئيسية
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="hover:text-pink-400">
              🛒 المنتجات
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders" className="hover:text-pink-400">
              📦 الطلبات
            </Link>
          </li>
          <li>
            <Link to="/dashboard/categories" className="hover:text-pink-400">
              📂 الأقسام
            </Link>
          </li>
          <li>
            <Link to="/dashboard/social" className="hover:text-pink-400">
              🔗 روابط التواصل
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className="hover:text-pink-400">
              ⚙️ الإعدادات
            </Link>
          </li>
        </ul>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
