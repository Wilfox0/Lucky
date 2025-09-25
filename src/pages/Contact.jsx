import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabase';
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from("settings").select("*").single();
      if (!error && data) {
        setSettings(data);
      }
    };
    fetchSettings();
  }, []);

  if (!settings) {
    return <div className="text-center py-10">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">📞 تواصل معنا</h1>

      {/* بيانات التواصل */}
      <div className="bg-pink-100 rounded-2xl shadow-md p-6 mb-8">
        <p className="text-lg mb-3">📧 البريد: {settings.email}</p>
        <p className="text-lg mb-3">📱 الهاتف: {settings.phone}</p>
        <p className="text-lg">📍 العنوان: {settings.address}</p>
      </div>

      {/* روابط السوشيال ميديا */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">تابعنا على</h2>
      <div className="flex justify-center gap-6">
        {settings.facebook_url && (
          <a
            href={settings.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaFacebook size={28} />
          </a>
        )}
        {settings.instagram_url && (
          <a
            href={settings.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaInstagram size={28} />
          </a>
        )}
        {settings.whatsapp_url && (
          <a
            href={`https://wa.me/${settings.whatsapp_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <FaWhatsapp size={28} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Contact;
