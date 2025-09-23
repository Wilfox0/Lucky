import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">مرحباً بك في Lucky Store 🛍️</h1>
      <Link to="/admin" className="bg-pink-500 text-white px-4 py-2 rounded">
        دخول لوحة التحكم
      </Link>
    </div>
  );
};

export default HomePage;
