'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StackedCardsInteraction } from './EventsCard';
import EventCardsRes from './EventCardsRes';
import LoaderOverlay from './LoaderOverlay';
import { motion } from 'framer-motion';
import { useEvents } from '@/lib/stores';

const EventContainer = () => {
  const { eventsData, eventsLoading } = useEvents();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventClick = (eventId: string | number) => {
    setSelectedEventId(String(eventId));
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    if (selectedEventId) {
      router.push(`/events/${selectedEventId}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-8 md:pt-12 overflow-hidden">
      {/* Loader Overlay */}
      <LoaderOverlay
        isVisible={showLoader}
        onAnimationComplete={handleLoaderComplete}
      />

      {/* Animated gradient overlays */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-black via-black/80 to-transparent z-10"
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== 'undefined' ? window.innerWidth : 0),
              y:
                Math.random() *
                (typeof window !== 'undefined' ? window.innerHeight : 0),
            }}
            animate={{
              y: [
                null,
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 0),
              ],
              x: [
                null,
                Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 0),
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated glow effects */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/15 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Enhanced Title with better typography */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 mb-8 md:mb-12 lg:mb-16 px-4"
      >
        <motion.h1
          className="max-w-5xl text-white font-['Cinzel'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold tracking-tight"
          style={{
            textShadow:
              '0 0 40px rgba(255, 215, 0, 0.3), 0 0 80px rgba(255, 215, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            The Arena
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center text-gray-300 font-['Rajdhani'] text-base sm:text-lg md:text-xl lg:text-2xl font-medium mt-2 md:mt-3 tracking-wider"
          style={{
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          The Full Roster
        </motion.p>

        {/* Decorative underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mt-4 md:mt-6 h-1 w-32 md:w-48 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
        />
      </motion.div>

      {/* Mobile Cards - visible below 1150px breakpoint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full"
      >
        <EventCardsRes
          events={
            eventsData
              ? eventsData.map((event: any) => ({
                  id: event.event_id,
                  title: event.name,
                  image: event.image_url,
                  schedule: event.schedule,
                  registrationFee:
                    event.registration_fee ?? event.registration_fees,
                  registered: event.registered,
                }))
              : []
          }
          onCardClick={handleEventClick}
        />
      </motion.div>

      {/* Desktop Cards Grid */}
      <div className="w-full px-8 pb-20 hidden min-[1150px]:block relative z-10">
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
              <motion.div
                key={rowIdx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + rowIdx * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`grid ${colsClass} ${row.length === 2 ? 'mx-30' : 'gap-12'} justify-items-center mb-60 ${row.length === 1 ? 'justify-center' : ''}`}
              >
                {row.map((event: any, idx: number) => {
                  const mapped = {
                    id: event.event_id,
                    image: event.image_url || event.image,
                    title: event.name || event.title,
                    schedule: event.schedule || event.venue,
                    registrationFee:
                      event.registration_fee ??
                      event.registration_fees ??
                      event.entryPrice,
                    registered: event.registered,
                  };

                  return (
                    <motion.div
                      key={`${rowIdx}-${idx}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.6 + rowIdx * 0.15 + idx * 0.1,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <StackedCardsInteraction
                        cards={[mapped, mapped]}
                        onCardClick={handleEventClick}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default EventContainer;
