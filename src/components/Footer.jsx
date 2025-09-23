import React from "react";
import { useSettingsStore } from "../store/settingsStore";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const { socialLinks } = useSettingsStore();

  return (
    <footer className="bg-pink-50 p-6 text-center mt-8 border-t border-gray-200 shadow-inner">
      <div className="flex justify-center gap-6 mb-4">
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-pink-600 font-semibold hover:text-pink-800 transition-colors duration-200"
          >
            <FaFacebook /> فيسبوك
          </a>
        )}
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-pink-600 font-semibold hover:text-pink-800 transition-colors duration-200"
          >
            <FaInstagram /> إنستجرام
          </a>
        )}
        {socialLinks.whatsapp && (
          <a
            href={`https://wa.me/${socialLinks.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-pink-600 font-semibold hover:text-pink-800 transition-colors duration-200"
          >
            <FaWhatsapp /> واتساب
          </a>
        )}
      </div>
      <p className="text-gray-600 text-sm">
        © جميع الحقوق محفوظة - <span className="font-bold">Lingerie Store</span>
      </p>
    </footer>
  );
}
