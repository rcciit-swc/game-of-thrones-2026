import { supabase } from '@/lib/supabase/client';

export async function getVerified(teamId: string) {
  const { data, error } = await supabase
    .from('teams')
    .update({ transaction_verified: new Date().toISOString() })
    .eq('team_id', teamId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
