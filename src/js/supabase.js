import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://edwqqabppkvtsadgulfa.supabase.co'
const supabaseKey = 'sb_publishable_MIuIRSe1HjZoLTfLNPAfAg_8qh-PD6I'

export const supabase = createClient(supabaseUrl, supabaseKey)