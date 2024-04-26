import { createClient } from '@supabase/supabase-js';
const VITE_PROJECT_URL = 'https://qpodusqalxtpvhoqofcz.supabase.co';
const VITE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb2R1c3FhbHh0cHZob3FvZmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMzcyMDUsImV4cCI6MjAyOTcxMzIwNX0.r0zYGjMSTZSMZmKQOQaJib1nOSWdGw8xnpON9_AEgT4';

export const supabase = createClient(VITE_PROJECT_URL, VITE_API_KEY);
