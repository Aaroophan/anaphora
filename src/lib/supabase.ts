import  { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'public-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
 