'use client';

import React, { useEffect, useState, useCallback } from 'react';
import bg_eyes from '@/assets/events/backgrounds/bg_eyes.svg';
import { useEvents } from '@/lib/stores';
import EventContainer from './EventContainer';
import ImageMarquee from './ImageMarquee';
import LoaderOverlay from './LoaderOverlay';

const EventsWrapper = () => {
  const { eventsData, eventsLoading } = useEvents();
  const [showLoader, setShowLoader] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  // Track when all critical images are loaded
  useEffect(() => {
    if (!eventsLoading && eventsData && eventsData.length > 0) {
      // Get all event image URLs
      const imageUrls = eventsData
        .map((event: any) => event.image_url)
        .filter(Boolean)
        .slice(0, 10); // Only preload first 10 images for performance

      if (imageUrls.length === 0) {
        setImagesLoaded(true);
        return;
      }

      let loadedCount = 0;
      const totalImages = imageUrls.length;

      // Preload images
      imageUrls.forEach((url: string) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = url;
      });

      // Fallback timeout - don't wait forever
      const timeout = setTimeout(() => {
        setImagesLoaded(true);
      }, 5000); // 5 second max wait

      return () => clearTimeout(timeout);
    }
  }, [eventsLoading, eventsData]);

  // Mark content as ready when both events and images are loaded
  useEffect(() => {
    if (!eventsLoading && imagesLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [eventsLoading, imagesLoaded]);

  // Hide loader when content is ready
  useEffect(() => {
    if (contentReady) {
      const hideTimer = setTimeout(() => {
        setShowLoader(false);
      }, 100);

      return () => clearTimeout(hideTimer);
    }
  }, [contentReady]);

  const handleLoaderComplete = () => {
    // Loader animation completed
  };

  return (
    <>
      {/* Loader Overlay - Shows until everything is ready */}
      <LoaderOverlay
        isVisible={showLoader}
        onAnimationComplete={handleLoaderComplete}
      />

      {/* Hero Section - Optimized for mobile */}
      <div className="min-h-[35vh] md:min-h-[45vh] bg-[url('/assets/events/bg_res.svg')] lg:bg-[url('https://i.postimg.cc/Kj4ygcYw/bg-eyes-copy.png')] bg-cover lg:bg-contain bg-no-repeat bg-top flex lg:items-center justify-center">
        <h1 className="z-3 text-white rajdhanifont text-5xl md:text-7xl text-center translate-y-32 md:translate-y-16">
          <span className="text-4xl md:text-6xl font-thin">CHOOSE YOUR</span>
          <span className="block font-bold">PLAYGROUND</span>
        </h1>
      </div>

      {/* EventContainer background starts here - wrapping ImageMarquee, Quote, and Events */}
      <div className="relative bg-[url('/assets/events/bg.svg')] bg-cover bg-top bg-no-repeat overflow-hidden">
        {/* Image Marquee - Lazy loaded */}
        {contentReady && <ImageMarquee />}

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

        {/* Event Container - Render when content is ready */}
        {contentReady && <EventContainer />}
      </div>
    </>
  );
};

export default EventsWrapper;
