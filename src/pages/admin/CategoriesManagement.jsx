import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import notify from "../../components/ToastNotification";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) console.log(error);
    else setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("categories").insert([{ name }]);
    if (error) console.log(error);
    else {
      notify.added(name);
      setName("");
      fetchCategories();
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">إدارة الأقسام</h2>
      <form onSubmit={addCategory} className="mb-6">
        <input
          type="text"
          placeholder="اسم القسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          إضافة قسم
        </button>
      </form>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="mb-2 border p-2 rounded">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManagement;
