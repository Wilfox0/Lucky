import React from "react";

const Contact = () => {
  const whatsappNumber = "+201234567890"; // رقم الواتساب
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+","")}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">تواصل معنا عبر واتساب</h1>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48a11.77 11.77 0 00-16.6 0 11.77 11.77 0 000 16.6l-1.52 5.53 5.53-1.52a11.77 11.77 0 0016.6-16.6zM12 20a8 8 0 110-16 8 8 0 010 16zm1-11h-2v4h2v-4zm0 6h-2v2h2v-2z"/>
        </svg>
        افتح المحادثة
      </a>
    </div>
  );
};

export default Contact;
