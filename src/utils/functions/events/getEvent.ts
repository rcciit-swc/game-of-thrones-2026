import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import type { events } from '@/lib/types';

const getEventByName = async (name: string): Promise<events | null> => {
  const cookieStore = cookies();
  const supabaseServer = await createClient(cookieStore);
  const p_event_name = name;

  const { data, error } = await supabaseServer.rpc(
    'get_event_by_name_with_registration',
    {
      p_event_name,
    }
  );

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  // Return the first result, since the RPC returns a table (array)
  return data && data.length > 0 ? data[0] : null;
};

export { getEventByName };
