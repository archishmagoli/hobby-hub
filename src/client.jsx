import { createClient } from '@supabase/supabase-js';
const VITE_PROJECT_URL = `${import.meta.env.VITE_PROJECT_URL}`;
const VITE_API_KEY = `${import.meta.env.VITE_API_KEY}`;

export const supabase = createClient(VITE_PROJECT_URL, VITE_API_KEY);
