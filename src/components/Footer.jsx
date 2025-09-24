import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const Footer = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase.from("social_links").select("*");
      if (!error && data) {
        setLinks(data);
      }
    };
    fetchLinks();
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-4">© {new Date().getFullYear()} متجر التجربة</p>

        {/* روابط السوشيال */}
        <div className="flex justify-center space-x-4 rtl:space-x-reverse">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
