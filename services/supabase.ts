import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase initialized successfully.');
  } else {
    console.warn('Supabase URL or Anon Key missing. Auth and Database features are disabled.');
  }
} catch (error) {
  console.error('Supabase initialization failed:', error);
}

export { supabase };
