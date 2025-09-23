import { create } from "zustand";

// 📌 هنا نخزن إعدادات عامة للمتجر: الاسم، الأقسام، روابط السوشيال
export const useSettingsStore = create((set) => ({
  storeName: "Lucky Store",

  categories: ["لانجري", "بيجامات", "ملابس داخلية", "أطقم نوم"],

  socialLinks: {
    facebook: "https://facebook.com/luckystore",
    instagram: "https://instagram.com/luckystore",
    whatsapp: "https://wa.me/201234567890",
  },

  // 🛠 تحديث أي إعداد
  updateSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
