import { createClient } from '@supabase/supabase-js';
const VITE_PROJECT_URL = process.env.VITE_PROJECT_URL;
const VITE_API_KEY = process.env.VITE_API_KEY;

export const supabase = createClient(VITE_PROJECT_URL, VITE_API_KEY);
