'use client';

import React, { useEffect } from 'react';
import bg_eyes from '@/assets/events/backgrounds/bg_eyes.svg';
import { useEvents } from '@/lib/stores';
import EventContainer from './EventContainer';
import ImageMarquee from './ImageMarquee';

const EventsWrapper = () => {
  return (
    <>
      <div className="min-h-[50vh] md:min-h-[60vh] bg-[url('/assets/events/bg_res.svg')] lg:bg-[url('https://i.postimg.cc/Kj4ygcYw/bg-eyes-copy.png')]  bg-cover lg:bg-contain bg-no-repeat bg-top flex  lg:items-center justify-center">
        <h1 className="z-3 text-white rajdhanifont text-6xl md:text-8xl text-center translate-y-50  md:translate-y-22 ">
          <span className="text-5xl md:text-7xl text font-thin">
            CHOOSE YOUR
          </span>
          <span className="block font-bold">PLAYGROUND</span>
        </h1>
      </div>
      <ImageMarquee />
      <div className="flex justify-center items-center my-20 px-4 relative">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="block md:hidden top-20 relative w-96 h-96 bg-red-500/25 rounded-full blur-3xl"></div>
        </div>
        <h1 className=" rajdhanifont text-3xl max-w-4xl text-center tracking-wider text-[#CCA855] translate-y-20 relative z-10">
          “Every match here is a rift into the unknown. The rules are simple,
          but the pressure is immense. Forget the Long Night—the real enemy is
          the clock, the opponent, and the doubt in your own mind. This is where
          champions are forged in fire and ice, and where only the fittest
          escape the Upside Down.”
        </h1>
      </div>
      <EventContainer />
    </>
  );
};

export default EventsWrapper;
