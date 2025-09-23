import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';



export default function SocialLinksManagement() {
  const [links, setLinks] = useState({ facebook: "", instagram: "", whatsapp: "" });

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase.from("social_links").select("*").single();
      if (data) setLinks(data);
    };
    fetchLinks();
  }, []);

  const handleChange = (e) => setLinks({ ...links, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await supabase.from("social_links").upsert({ id: 1, ...links });
    alert("✅ تم حفظ الروابط!");
  };

  return (
    <div>
      <h2 className="text-xl mb-4">🔗 إدارة روابط التواصل</h2>

      <div className="mb-4">
        <label>🌐 فيسبوك</label>
        <input type="text" name="facebook" value={links.facebook} onChange={handleChange} className="border p-2 w-full rounded" />
      </div>

      <div className="mb-4">
        <label>📸 انستجرام</label>
        <input type="text" name="instagram" value={links.instagram} onChange={handleChange} className="border p-2 w-full rounded" />
      </div>

      <div className="mb-4">
        <label>💬 واتساب</label>
        <input type="text" name="whatsapp" value={links.whatsapp} onChange={handleChange} className="border p-2 w-full rounded" />
      </div>

      <button onClick={handleSave} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
        💾 حفظ
      </button>
    </div>
  );
}
