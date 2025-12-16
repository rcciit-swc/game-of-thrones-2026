import { supabase } from '@/lib/supabase/client';
import { events } from '@/lib/types/events';

export async function addEvent(event: Omit<events, 'id' | 'reg_status'>) {
  const { data, error } = await supabase.from('events').insert([
    {
      ...event,
      reg_status: true,
      event_category_id: '46ea4f76-36ba-469d-aed6-3bf72d1beb87',
    },
  ]);

  if (error) throw error;
  return data;
}
