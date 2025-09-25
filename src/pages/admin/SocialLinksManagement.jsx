import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const SocialLinksManagement = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    whatsapp: "",
  });

  const fetchLinks = async () => {
    const { data, error } = await supabase.from("settings").select("socialLinks").single();
    if (error) {
      notify.error("فشل جلب روابط السوشيال");
    } else if (data) {
      setSocialLinks(data.socialLinks || { facebook: "", instagram: "", whatsapp: "" });
    }
  };

  const saveLinks = async () => {
    const { error } = await supabase
      .from("settings")
      .upsert({
        id: 1,
        socialLinks,
      });

    if (error) {
      notify.error("فشل حفظ الروابط");
    } else {
      notify.saved("تم حفظ الروابط بنجاح");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">إدارة روابط السوشيال</h2>
      <div className="mb-4">
        <label>Facebook:</label>
        <input
          type="text"
          value={socialLinks.facebook}
          onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <label>Instagram:</label>
        <input
          type="text"
          value={socialLinks.instagram}
          onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <label>Whatsapp:</label>
        <input
          type="text"
          value={socialLinks.whatsapp}
          onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={saveLinks} className="bg-green-500 text-white p-2">
        حفظ الروابط
      </button>
    </div>
  );
};

export default SocialLinksManagement;
