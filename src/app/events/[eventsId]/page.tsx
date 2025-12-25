import EventRegistration from '@/components/events/EventRegistration';
import { createServer } from '@/lib/supabase/server';
import type { Metadata } from 'next';

interface EventPageProps {
  params: Promise<{
    eventsId: string;
  }>;
}

// Helper function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate metadata for the event page
export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { eventsId } = await params;
  const supabase = await createServer();

  // Fetch event data
  const { data: event } = await supabase
    .from('events')
    .select('name, description, image_url')
    .eq('id', eventsId)
    .single();

  if (!event) {
    return {
      title: 'Event Not Found | Game of Thrones 2026',
      description: 'The event you are looking for could not be found.',
    };
  }

  const plainDescription = event.description
    ? stripHtml(event.description).substring(0, 160)
    : 'Join us for an exciting event at Game of Thrones 2026 sports fest.';

  const title = `${event.name} | Game of Thrones 2026`;
  const imageUrl = event.image_url || '/assets/events/default-event.jpg';

  return {
    title,
    description: plainDescription,
    openGraph: {
      title,
      description: plainDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
      type: 'website',
      siteName: 'Game of Thrones 2026',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: plainDescription,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: EventPageProps) {
  const { eventsId } = await params;
  return <EventRegistration eventId={eventsId} />;
}
