import React from "react";

const Contact = () => {
  const phoneNumber = "+201234567890"; // رقم الواتساب
  const whatsappLink = `https://wa.me/${phoneNumber.replace("+","")}`;

  return (
    <div className="flex justify-center items-center h-full p-8">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full text-xl shadow-lg transition duration-300"
      >
        تواصل معنا على واتساب
      </a>
    </div>
  );
};

export default Contact;
