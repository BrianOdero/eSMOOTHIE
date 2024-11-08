import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey: string = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase