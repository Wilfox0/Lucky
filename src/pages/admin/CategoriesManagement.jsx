import React, { useState } from "react";
import { useSettingsStore } from "../../store/settingsStore";
import notify from "../../components/ToastNotification";

const CategoriesManagement = () => {
  const { categories, updateSetting } = useSettingsStore();
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim() === "") return;
    const updatedCategories = [...categories, newCategory.trim()];
    updateSetting("categories", updatedCategories);
    setNewCategory("");
    notify.saved("تم إضافة القسم بنجاح");
  };

  const removeCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    updateSetting("categories", updatedCategories);
    notify.saved("تم حذف القسم بنجاح");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">إدارة الأقسام</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="أضف قسم جديد"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={addCategory} className="bg-blue-500 text-white p-2">
          إضافة
        </button>
      </div>

      <ul>
        {categories.map((cat, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <span>{cat}</span>
            <button
              onClick={() => removeCategory(index)}
              className="text-red-500"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManagement;
