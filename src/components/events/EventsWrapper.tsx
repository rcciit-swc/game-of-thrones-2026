import React from 'react';
import bg_eyes from '@/assets/events/backgrounds/bg_eyes.svg';

const EventsWrapper = () => {
  return (
    <>
      <div
        className="
          pointer-events-none
          absolute
          bottom-30
          rotate-180
          left-0
          w-full
          h-185
          bg-gradient-to-b
          from-black
          via-black/20
          to-transparent
          z-2
        "
      />
      <div className="min-h-[50vh] md:min-h-[60vh] bg-[url('/assets/events/bg_res.svg')] lg:bg-[url('/assets/events/bg_eyes_copy.png')]  bg-cover lg:bg-contain bg-no-repeat bg-top flex  lg:items-center justify-center">
        <h1 className="z-3 text-white rajdhanifont text-6xl md:text-8xl text-center translate-y-50  md:translate-y-22 ">
          <span className="text-5xl md:text-7xl text font-thin">
            CHOOSE YOUR
          </span>
          <span className="block font-bold">PLAYGROUND</span>
        </h1>
      </div>
    </>
  );
};

export default EventsWrapper;
