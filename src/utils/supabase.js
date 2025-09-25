


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ دوال مساعدة لإرسال واسترجاع بيانات المنتجات والأقسام والطلبات
export async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) console.error("Error fetching products:", error);
  return data || [];
}

export async function fetchCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.error("Error fetching categories:", error);
  return data || [];
}

export async function fetchOrders() {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) console.error("Error fetching orders:", error);
  return data || [];
}

export async function updateProductStock(id, quantity) {
  const { data, error } = await supabase
    .from("products")
    .update({ stock: quantity })
    .eq("id", id);
  if (error) console.error("Error updating stock:", error);
  return data;
}

export async function insertOrder(order) {
  const { data, error } = await supabase.from("orders").insert([order]);
  if (error) console.error("Error inserting order:", error);
  return data;
}
