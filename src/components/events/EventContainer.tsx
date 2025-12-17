import React from 'react';
import { StackedCardsInteraction } from './EventsCard';
import EventCardsRes from './EventCardsRes';

const EventContainer = () => {
  const eventsData = [
    {
      title: 'Event 1',
      description: 'Join us for an epic tournament',
      image: 'https://picsum.photos/seed/event1/350',
      category: 'Tournament',
    },
    {
      title: 'Event 2',
      description: 'Experience the thrill of competition',
      image: 'https://picsum.photos/seed/event3/350',
      category: 'Competition',
    },
    {
      title: 'Event 3',
      description: 'Witness the battle of champions',
      image: 'https://picsum.photos/seed/event5/350',
      category: 'Championship',
    },
    {
      title: 'Event 4',
      description: 'The ultimate showdown awaits',
      image: 'https://picsum.photos/seed/event7/350',
      category: 'Showdown',
    },
    {
      title: 'Event 5',
      description: 'Glory and honor on the line',
      image: 'https://picsum.photos/seed/event9/350',
      category: 'Challenge',
    },
    {
      title: 'Event 6',
      description: 'Face your destiny in the arena',
      image: 'https://picsum.photos/seed/event11/350',
      category: 'Battle',
    },
    {
      title: 'Event 7',
      description: 'Prove your worth among the best',
      image: 'https://picsum.photos/seed/event13/350',
      category: 'Trial',
    },
    {
      title: 'Event 8',
      description: 'The final test begins here',
      image: 'https://picsum.photos/seed/event15/350',
      category: 'Finals',
    },
  ];

  return (
    <div className="relative bg-[url('/assets/events/bg.svg')] bg-cover bg-top bg-no-repeat min-h-screen flex flex-col items-center justify-center pt-20">
      {/* Bigger top black gradient */}
      <div
        className="
          pointer-events-none
          absolute
          top-0
          left-0
          w-full
          h-72
          bg-gradient-to-b
          from-black
          via-black/70
          to-transparent
          z-10
        "
      />

      <h1 className=" max-w-lg relative   z-20 text-white rajdhanifont text-6xl md:text-7xl text-center font-semibold underline decoration-4 underline-offset-6 mb-20">
        The Arena: The Full Roster
      </h1>

      {/* Mobile Cards - visible below 1150px breakpoint */}
      <EventCardsRes events={eventsData} />

      {/* Desktop Layout - hidden below 1150px breakpoint */}
      <div className="w-full px-8 pb-20 hidden min-[1150px]:block">
        {/* Row 1: 3 columns */}
        <div className="grid grid-cols-3 gap-12 justify-items-center mb-20">
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event1/350',
              },
              {
                image: 'https://picsum.photos/seed/event2/350',
              },
            ]}
          />
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event3/350',
              },
              {
                image: 'https://picsum.photos/seed/event4/350',
              },
            ]}
          />
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event5/350',
              },
              {
                image: 'https://picsum.photos/seed/event6/350',
              },
            ]}
          />
        </div>

        {/* Row 2: 2 columns */}
        <div className="mx-[12vw] grid grid-cols-2 gap-0 justify-items-center mb-20">
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event7/350',
              },
              {
                image: 'https://picsum.photos/seed/event8/350',
              },
            ]}
          />
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event9/350',
              },
              {
                image: 'https://picsum.photos/seed/event10/350',
              },
            ]}
          />
        </div>

        {/* Row 3: 3 columns */}
        <div className="grid grid-cols-3 gap-12 justify-items-center mb-20">
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event11/350',
              },
              {
                image: 'https://picsum.photos/seed/event12/350',
              },
            ]}
          />
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event13/350',
              },
              {
                image: 'https://picsum.photos/seed/event14/350',
              },
            ]}
          />
          <StackedCardsInteraction
            cards={[
              {
                image: 'https://picsum.photos/seed/event15/350',
              },
              {
                image: 'https://picsum.photos/seed/event16/350',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
