import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rkqwebalpemdsnduxidn.supabase.cox";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcXdlYmFscGVtZHNuZHV4aWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3ODg0ODksImV4cCI6MTk5MDM2NDQ4OX0.yYBMJRjb_2eA3lc46W0CyeHuPVWTm7dPKeyWksvB4sI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
