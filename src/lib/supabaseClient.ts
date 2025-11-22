import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxieptjaxyfcxwzzygov.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4aWVwdGpheHlmY3h3enp5Z292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjQwMjUsImV4cCI6MjA3OTQwMDAyNX0.OchOiLM_obdL89axnxppHI0EWTib-zItNhFhPPo7jnI";
export const supabase = createClient(supabaseUrl, supabaseKey);
