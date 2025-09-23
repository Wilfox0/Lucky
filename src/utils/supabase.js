import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hetysfxvbbgunqxmcauu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhldHlzZnh2YmJndW5xeG1jYXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjI4MTMsImV4cCI6MjA3MzY5ODgxM30.o8v4wXJOzDkxsrhQQnVFlsaDAwJrdmlvpPwhD74HGdg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
