import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">الصفحة غير موجودة</p>
      <Link to="/" className="text-pink-500 hover:text-pink-600 transition">العودة للصفحة الرئيسية</Link>
    </div>
  );
};

export default NotFound;
