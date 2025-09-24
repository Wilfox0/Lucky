import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useSettingsStore = create((set) => ({
  storeName: "Lucky Store",
  logo: "https://via.placeholder.com/150",
  categories: [],
  socialLinks: {},
  fetchSettings: async () => {
    const { data: settings } = await supabase.from("settings").select().single();
    const { data: categories } = await supabase.from("categories").select();
    const { data: socialLinks } = await supabase.from("social_links").select();

    set({
      storeName: settings?.storeName || "Lucky Store",
      logo: settings?.logo || "https://via.placeholder.com/150",
      categories: categories || [],
      socialLinks: socialLinks || {},
    });
  },
  updateSetting: async (key, value) => {
    if(key === "logo") {
      await supabase.from("settings").update({ logo: value }).eq("id", 1);
    }
    if(key === "storeName") {
      await supabase.from("settings").update({ storeName: value }).eq("id", 1);
    }
    set((state) => ({ ...state, [key]: value }));
  },
}));
