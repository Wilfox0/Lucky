import { createClient } from "@supabase/supabase-js";

// القيم دي لازم تكون موجودة في ملف .env
// REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
// REACT_APP_SUPABASE_ANON_KEY=your-anon-key

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ خطأ: تأكد من وضع بيانات Supabase داخل ملف .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
