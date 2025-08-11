import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://ebwfctksgihlcqtzzfff.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid2ZjdGtzZ2lobGNxdHp6ZmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MjAxODAsImV4cCI6MjA2OTI5NjE4MH0.ISCdf0P3ysLHo4svC8VCN71Ct3p2EH_KpbP9PkPmp1A";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
