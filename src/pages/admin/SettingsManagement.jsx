import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const SettingsManagement = () => {
  const [storeName, setStoreName] = useState("");
  const [categories, setCategories] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    whatsapp: "",
  });

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("settings").select("*").single();
    if (error) {
      notify.error("فشل جلب الإعدادات");
    } else if (data) {
      setStoreName(data.storeName);
      setCategories(data.categories || []);
      setSocialLinks(data.socialLinks || { facebook: "", instagram: "", whatsapp: "" });
    }
  };

  const saveSettings = async () => {
    const { error } = await supabase
      .from("settings")
      .upsert({
        id: 1,
        storeName,
        categories,
        socialLinks,
      });

    if (error) {
      notify.error("فشل حفظ الإعدادات");
    } else {
      notify.saved("تم حفظ الإعدادات بنجاح");
    }
  };

  const addCategory = () => {
    if (categories.includes("")) return;
    setCategories([...categories, ""]);
  };

  const updateCategory = (index, value) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const removeCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">إعدادات المتجر</h2>

      <div className="mb-4">
        <label>اسم المتجر:</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label>الأقسام:</label>
        {categories.map((cat, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={cat}
              onChange={(e) => updateCategory(index, e.target.value)}
              className="border p-2 flex-1"
            />
            <button onClick={() => removeCategory(index)} className="text-red-500">
              حذف
            </button>
          </div>
        ))}
        <button onClick={addCategory} className="bg-blue-500 text-white p-2">
          إضافة قسم
        </button>
      </div>

      <div className="mb-4">
        <label>روابط السوشيال:</label>
        <input
          type="text"
          placeholder="Facebook"
          value={socialLinks.facebook}
          onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Instagram"
          value={socialLinks.instagram}
          onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Whatsapp"
          value={socialLinks.whatsapp}
          onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <button onClick={saveSettings} className="bg-green-500 text-white p-2">
        حفظ الإعدادات
      </button>
    </div>
  );
};

export default SettingsManagement;
