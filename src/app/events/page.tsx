'use client';
import EventContainer from '@/components/events/EventContainer';
import EventsWrapper from '@/components/events/EventsWrapper';
import ImageMarquee from '@/components/events/ImageMarquee';
import { useEvents } from '@/lib/stores/events';

import React, { useEffect } from 'react';

const page = () => {
  return <EventsWrapper />;
};

export default page;
