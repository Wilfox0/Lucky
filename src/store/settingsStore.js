import { create } from "zustand";

// 📌 هنا نخزن إعدادات عامة للمتجر: الاسم، الأقسام، روابط السوشيال
export const useSettingsStore = create((set) => ({
  storeName: "Lucky Store",
  storeLogo: "", // ✅ إضافة لوجو
  categories: ["لانجري", "بيجامات", "ملابس داخلية", "أطقم نوم"],
  provinces: ["القاهرة", "الجيزة", "الإسكندرية"], // ✅ إضافة المحافظات
  socialLinks: {
    facebook: "https://facebook.com/luckystore",
    instagram: "https://instagram.com/luckystore",
    whatsapp: "https://wa.me/201234567890",
  },

  // 🛠 تحديث أي إعداد
  updateSetting: (key, value) => {
    set((state) => {
      const newState = { ...state, [key]: value };
      return newState;
    });
  },

  // 🛠 تحديث اللوجو
  updateLogo: (fileUrl) => set({ storeLogo: fileUrl }),

  // 🛠 إضافة/حذف قسم
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (category) =>
    set((state) => ({ categories: state.categories.filter(c => c !== category) })),

  // 🛠 إضافة/حذف محافظة
  addProvince: (province) =>
    set((state) => ({ provinces: [...state.provinces, province] })),
  removeProvince: (province) =>
    set((state) => ({ provinces: state.provinces.filter(p => p !== province) })),

  // 🛠 تحديث روابط السوشيال
  updateSocialLink: (platform, url) =>
    set((state) => ({ socialLinks: { ...state.socialLinks, [platform]: url } })),
}));
