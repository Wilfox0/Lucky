import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const WhatsAppChat = () => {
  const [whatsappLink, setWhatsappLink] = useState("");

  useEffect(() => {
    const fetchWhatsapp = async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .eq("platform", "WhatsApp")
        .single();

      if (!error && data) {
        const phone = data.url.replace("+", "").trim();
        setWhatsappLink(`https://wa.me/${phone}`);
      }
    };
    fetchWhatsapp();
  }, []);

  if (!whatsappLink) return null;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-6 py-3 rounded-full text-lg flex items-center space-x-2 rtl:space-x-reverse hover:bg-green-600 transition"
      >
        <span>💬</span>
        <span>تواصل معنا عبر واتساب</span>
      </a>
    </div>
  );
};

export default WhatsAppChat;
