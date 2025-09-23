import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("❌ كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">تسجيل دخول الأدمن</h2>
        <input
          type="password"
          placeholder="كلمة المرور"
          className="border rounded p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
        >
          دخول
        </button>
      </div>
    </div>
  );
}
