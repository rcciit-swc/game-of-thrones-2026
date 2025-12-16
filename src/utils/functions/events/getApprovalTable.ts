import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

export interface EventData {
  serial_no: number;
  paymentstatus: 'Verified' | 'Not Verified';
  eventname: string;
  type: string;
  teamname: string;
  college: string;
  teamlead: string; // Team lead's full name (from the users table)
  teamleadphone: string; // Team lead's phone (from the users table)
  teamleademail: string;
  transactionid: string;
  transaction_screenshot: string;
  registeredat: string;
  team_id: string;
  teammembers: TeamMember[];
}

const get_approval_table_data = async (): Promise<EventData[] | null> => {
  try {
    const { data, error } = await supabase.rpc('get_approval_table_data');

    if (error) {
      console.error('Error fetching event table data:', error);
      return null;
    }

    return data as EventData[];
  } catch (err) {
    console.error('Unexpected error:', err);
    toast.error('Error fetching event table data');
    return null;
  }
};

export { get_approval_table_data };
