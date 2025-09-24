import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const SocialLinksManagement = () => {
  const [links, setLinks] = useState([]);
  const [platform, setPlatform] = useState("WhatsApp");
  const [url, setUrl] = useState("");

  const fetchLinks = async () => {
    const { data, error } = await supabase.from("social_links").select("*");
    if (error) console.log(error);
    else setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const addLink = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("social_links")
      .insert([{ platform, url }]);
    if (error) console.log(error);
    else {
      notify.added(platform);
      setUrl("");
      fetchLinks();
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">روابط التواصل</h2>
      <form onSubmit={addLink} className="mb-6">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option>WhatsApp</option>
          <option>Facebook</option>
          <option>Instagram</option>
        </select>
        <input
          type="text"
          placeholder="الرابط أو رقم الواتس"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">إضافة</button>
      </form>

      <ul>
        {links.map((l) => (
          <li key={l.id} className="mb-2 border p-2 rounded">
            {l.platform}: {l.url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinksManagement;
