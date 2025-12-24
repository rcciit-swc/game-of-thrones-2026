'use client';

import React, { useEffect } from 'react';
import bg_eyes from '@/assets/events/backgrounds/bg_eyes.svg';
import { useEvents } from '@/lib/stores';
import EventContainer from './EventContainer';
import ImageMarquee from './ImageMarquee';

const EventsWrapper = () => {
  return (
    <>
      {/* Hero Section - Reduced height */}
      <div className="min-h-[35vh] md:min-h-[45vh] bg-[url('/assets/events/bg_res.svg')] lg:bg-[url('https://i.postimg.cc/Kj4ygcYw/bg-eyes-copy.png')] bg-cover lg:bg-contain bg-no-repeat bg-top flex lg:items-center justify-center">
        <h1 className="z-3 text-white rajdhanifont text-5xl md:text-7xl text-center translate-y-32 md:translate-y-16">
          <span className="text-4xl md:text-6xl font-thin">CHOOSE YOUR</span>
          <span className="block font-bold">PLAYGROUND</span>
        </h1>
      </div>

      {/* EventContainer background starts here - wrapping ImageMarquee, Quote, and Events */}
      <div className="relative bg-[url('/assets/events/bg.svg')] bg-cover bg-top bg-no-repeat overflow-hidden">
        {/* Image Marquee - now on EventContainer background */}
        <ImageMarquee />

        {/* Quote Section - Compact and responsive */}
        <div className="flex justify-center items-center my-6 md:my-8 px-4 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="block md:hidden top-8 relative w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
          </div>
          <h1 className="rajdhanifont text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl lg:max-w-4xl text-center tracking-wide leading-relaxed text-[#CCA855] translate-y-6 md:translate-y-8 relative z-10 px-2">
            "Every match here is a rift into the unknown. The rules are simple,
            but the pressure is immense. Forget the Long Night—the real enemy is
            the clock, the opponent, and the doubt in your own mind. This is
            where champions are forged in fire and ice, and where only the
            fittest escape the Upside Down."
          </h1>
        </div>

        {/* Event Container - without its own background now */}
        <EventContainer />
      </div>
    </>
  );
};

export default EventsWrapper;
