'use client';
import React, { use } from 'react';
import { StackedCardsInteraction } from './EventsCard';
import EventCardsRes from './EventCardsRes';

import { useEvents } from '@/lib/stores';

const EventContainer = () => {
  const { eventsData, eventsLoading } = useEvents();
  console.log('Events Data:', eventsData);
  return (
    <div className="relative bg-[url('/assets/events/bg.svg')] bg-cover bg-top bg-no-repeat min-h-screen flex flex-col items-center justify-center pt-20">
      {/* Bigger top black gradient */}
      <div className="opointer-events-none absolute top-0 left-0 w-full h-72 bg-linear-to-b from-black via-black/70 to-transparent z-10" />

      <h1 className=" max-w-lg relative   z-20 text-white rajdhanifont text-6xl md:text-7xl text-center font-semibold underline decoration-4 underline-offset-6 mb-28">
        The Arena: The Full Roster
      </h1>

      {/* Mobile Cards - visible below 1150px breakpoint */}
      <EventCardsRes
        events={
          eventsData
            ? eventsData.map((event: any) => ({
                id: event.id,
                title: event.name,
                image: event.image_url,
                schedule: event.schedule,
                registrationFee: event.registration_fee,
                registered: event.registered,
                // add other required fields here if needed
              }))
            : []
        }
      />

      <div className="w-full  px-8 pb-20 hidden min-[1150px]:block">
        {(() => {
          const pattern = [3, 2, 3, 2];
          const events = (eventsData || []).slice(0, 14);
          const rows: any[] = [];
          let i = 0;
          while (i < events.length) {
            for (let p = 0; p < pattern.length && i < events.length; p++) {
              const count = pattern[p];
              rows.push(events.slice(i, i + count));
              i += count;
            }
          }

          return rows.map((row, rowIdx) => {
            const colsClass =
              row.length === 1
                ? 'grid-cols-1'
                : row.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-3';
            return (
              <div
                key={rowIdx}
                className={`grid ${colsClass} ${row.length === 2 ? 'mx-30' : 'gap-12'} justify-items-center mb-60 ${row.length === 1 ? 'justify-center' : ''}`}
              >
                {row.map((event: any, idx: number) => {
                  const mapped = {
                    id: event.id,
                    image: event.image_url || event.image,
                    title: event.name || event.title,
                    schedule: event.schedule || event.venue,
                    registrationFee: event.registration_fee ?? event.entryPrice,
                    registered: event.registered,
                  };

                  return (
                    <StackedCardsInteraction
                      key={`${rowIdx}-${idx}`}
                      cards={[mapped, mapped]}
                    />
                  );
                })}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default EventContainer;
