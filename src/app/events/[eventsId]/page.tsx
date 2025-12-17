import EventRegistration from '@/components/events/EventRegistration';

interface EventPageProps {
  params: Promise<{
    eventsId: string;
  }>;
}

export default async function Page({ params }: EventPageProps) {
  const { eventsId } = await params;
  return <EventRegistration eventName={eventsId} />;
}
