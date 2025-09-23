import React, { useEffect, useState } from "react";
import { supabase } from '../../utils/supabase';



const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  const handleAddOrUpdate = async () => {
    if (newCategory.trim() === "") return;

    if (editId) {
      await supabase.from("categories").update({ name: newCategory }).eq("id", editId);
    } else {
      await supabase.from("categories").insert([{ name: newCategory }]);
    }

    setNewCategory("");
    setEditId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setNewCategory(cat.name);
    setEditId(cat.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  return (
    <div>
      <h2 className="text-xl mb-4">📂 إدارة الأقسام</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="قسم جديد..."
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleAddOrUpdate}
          className="ml-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          {editId ? "تعديل" : "➕ إضافة"}
        </button>
      </div>

      <ul className="list-disc pl-6">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center mb-1">
            <span>{cat.name}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cat)} className="bg-yellow-500 text-white px-2 py-1 rounded">تعديل</button>
              <button onClick={() => handleDelete(cat.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManagement;
