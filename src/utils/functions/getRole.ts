import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function getUserRoles() {
  // Create an instance of the Supabase client
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  // Query the roles table with nested event_categories and fests
  const { data: userRoles, error } = await supabase
    .from('roles')
    .select(
      `
      role,
      event_categories (
        name,
        fests (
          name,
          year
        )
      )
      `
    )
    .eq('user_id', data.user?.id)
    .eq('event_categories.fests.name', 'Game Of Thrones')
    .eq('event_categories.fests.year', 2025)
    .single();

  // If there's an error, log it and throw an error
  if (error) {
    console.error('Error fetching user roles:', error);
    throw new Error('Failed to fetch user roles');
  }

  // Return the retrieved user roles data
  console.log('User roles:', userRoles.role);
  return userRoles.role;
}
