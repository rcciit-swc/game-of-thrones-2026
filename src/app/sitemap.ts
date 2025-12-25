import { MetadataRoute } from 'next';
import { createServer } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://got.rcciit.org.in';
  const supabase = await createServer();

  // Fetch all events for dynamic routes
  const { data: events } = await supabase
    .from('events')
    .select('id, updated_at')
    .order('updated_at', { ascending: false });

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Dynamic event routes
  const eventRoutes: MetadataRoute.Sitemap = events
    ? events.map((event) => ({
        url: `${baseUrl}/events/${event.id}`,
        lastModified: event.updated_at
          ? new Date(event.updated_at)
          : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    : [];

  return [...staticRoutes, ...eventRoutes];
}
