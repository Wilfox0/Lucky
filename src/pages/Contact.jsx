import React from "react";

export default function Contact() {
  return (
    <div className="contact p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">تواصل معنا</h1>
      <a
        href="https://wa.me/201234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
      >
        تواصل عبر واتساب
      </a>
    </div>
  );
}
