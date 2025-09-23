import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';



const SettingsManagement = () => {
  const [storeName, setStoreName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*").single();
      if (data) {
        setStoreName(data.store_name || "");
        setLogoUrl(data.logo_url || "");
      }
    };
    fetchSettings();
  }, []);

  const uploadLogo = async () => {
    if (!logoFile) return null;
    const fileName = `logo_${Date.now()}.${logoFile.name.split(".").pop()}`;
    const { data, error } = await supabase.storage.from("logos").upload(fileName, logoFile);
    if (error) { alert("خطأ في رفع الصورة"); return null; }
    const { data: urlData } = supabase.storage.from("logos").getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSave = async () => {
    let finalLogoUrl = logoUrl;
    if (logoFile) {
      const uploadedUrl = await uploadLogo();
      if (uploadedUrl) finalLogoUrl = uploadedUrl;
    }
    await supabase.from("settings").upsert({ id: 1, store_name: storeName, logo_url: finalLogoUrl });
    setLogoUrl(finalLogoUrl);
    alert("✅ تم تحديث الإعدادات بنجاح");
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">إعدادات المتجر</h2>
      <div className="mb-4">
        <label className="block mb-1">اسم المتجر:</label>
        <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} className="border p-2 w-full rounded"/>
      </div>
      <div className="mb-4">
        <label className="block mb-1">اللوجو الحالي:</label>
        {logoUrl ? <img src={logoUrl} alt="Logo" className="w-20 h-20 mb-2 rounded"/> : <p>لا يوجد لوجو بعد</p>}
        <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} className="mt-2"/>
      </div>
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg">💾 حفظ الإعدادات</button>
    </div>
  );
};

export default SettingsManagement;
