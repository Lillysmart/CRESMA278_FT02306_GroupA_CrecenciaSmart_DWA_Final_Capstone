import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://tfveayogekgovdymsmqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmdmVheW9nZWtnb3ZkeW1zbXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExODMxMjYsImV4cCI6MjAxNjc1OTEyNn0.E67T6R5t2n8DL1cmwVXYMa-IIi5up00B3OLc_VQQy04"
);
export function createSupabaseClient() {
  return supabase;
}