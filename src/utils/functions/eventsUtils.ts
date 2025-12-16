import { supabase } from '@/lib/supabase/client';
import { getRoles } from './userUtils';

export const getEventsData = async (all: boolean = true) => {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    const p_user_id = sessionData?.session?.user?.id || null;
    const p_fest_id = 'a4bc08e4-9af9-4212-8d32-cd88d2437f18';
    const rolesData: {
      role: string;
      event_category_id?: string;
      event_id?: string;
    }[] = (await getRoles()) || [];

    let data, error;

    if (all || !rolesData || rolesData.length === 0) {
      ({ data, error } = await supabase.rpc('get_events_by_fest', {
        p_fest_id,
        p_user_id,
      }));
    } else {
      const roles = rolesData.map((role: { role: string }) => role.role);
      if (roles.includes('super_admin') || roles.includes('registrar')) {
        ({ data, error } = await supabase.rpc('get_events_by_fest', {
          p_fest_id,
          p_user_id,
        }));
      } else if (roles.includes('convenor')) {
        const eventCategoryIds = rolesData
          .filter(
            (role: { role: string; event_category_id?: string }) =>
              role.role === 'convenor'
          )
          .map(
            (role: { role: string; event_category_id?: string }) =>
              role.event_category_id
          );

        ({ data, error } = await supabase
          .from('events')
          .select('*')
          .in('event_category_id', eventCategoryIds));
      } else if (roles.includes('coordinator')) {
        const eventIds = rolesData
          .filter(
            (role: { role: string; event_id?: string }) =>
              role.role === 'coordinator'
          )
          .map((role: { event_id?: string | null }) => role.event_id);

        ({ data, error } = await supabase
          .from('events')
          .select('*')
          .in('id', eventIds));
      } else {
        throw new Error('Invalid role');
      }
    }

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};
