import React from "react";
import { useSettingsStore } from "../store/settingsStore";

const Contact = () => {
  const { socialLinks } = useSettingsStore();

  const openWhatsApp = () => {
    const whatsappNumber = socialLinks.whatsapp.replace(/\D/g, ""); // إزالة أي حروف
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">تواصل معنا</h1>
      <p className="mb-4">
        يمكنك التواصل معنا عبر الواتس اب مباشرة من خلال الزر أدناه:
      </p>
      <button
        onClick={openWhatsApp}
        className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200"
      >
        بدء المحادثة على واتساب
      </button>
    </div>
  );
};

export default Contact;
