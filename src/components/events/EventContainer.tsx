'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleEventClick = (eventId: string | number) => {
    setSelectedEventId(String(eventId));
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    if (selectedEventId) {
      router.push(`/events/${selectedEventId}`);
    }
  };

  // Define the desired event order
  const eventOrder = [
    '67aa6c4d-09b5-4fd0-bb56-b8571e77a515',
    '8aaee6a6-8d99-4938-a811-d59fb0602655',
    '0fe473ff-73f6-41a9-a0f0-03aac9289d6f',
    '34855c5e-2d7e-4609-a9e9-8aa24a6f13b2',
    '69eea79f-aa25-4482-9c5e-856481bdd682',
    '5c4fc0c7-93ef-4d8a-aa35-a4cf0ffd4ee9',
    '6166770d-b367-4c5d-8acd-fed4c6de7256',
    'd7b8ee6a-6dbe-4bf1-821d-7901e9f05447',
    '835a4447-9ca4-49ee-bb15-d5db412be779',
    '64e192a8-a316-4781-8c58-cdb556543459',
    'c419da97-8980-4dde-b086-76103ee110ed',
    'ef673113-dec9-4e51-b994-a43d186ea947',
    'bf1953ca-4303-4062-a349-9d88fa035afa',
    'e5a51398-d586-4b33-bac3-637f70bd3a81',
    '3bfc938d-71e9-4d7d-a824-c613cf5bebf5',
    '49920bc5-0691-46d4-9e91-40c67b00a183',
    '71fa6f13-6467-46e9-802d-b08c6755346b',
    '0a66b38a-0b89-4a5d-9ebd-b434d598cd72',
  ];

  // Filter and sort events based on search query and custom order
  const filteredEvents = eventsData
    ? eventsData
        .filter((event: any) =>
          event.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a: any, b: any) => {
          const indexA = eventOrder.indexOf(a.event_id);
          const indexB = eventOrder.indexOf(b.event_id);

          // If both events are in the order list, sort by their position
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }

          // If only A is in the order list, it comes first
          if (indexA !== -1) return -1;

          // If only B is in the order list, it comes first
          if (indexB !== -1) return 1;

          // If neither is in the order list, maintain original order
          return 0;
        })
    : [];

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

      {/* Compact Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-20 mb-8 md:mb-10 px-4 w-full max-w-md mx-auto"
      >
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-yellow-400/60 group-focus-within:text-yellow-400 transition-colors duration-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-white placeholder:text-gray-400 text-sm md:text-base focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all duration-300 hover:border-white/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      {/* No Results Message */}
      {searchQuery && filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 text-center py-12 px-4"
        >
          <p className="text-gray-400 text-lg md:text-xl font-['Rajdhani']">
            No events found for "{searchQuery}"
          </p>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Try a different search term
          </p>
        </motion.div>
      )}

      {/* Mobile Cards - visible below 1150px breakpoint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full"
      >
        <EventCardsRes
          events={
            filteredEvents
              ? filteredEvents.map((event: any) => ({
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
          const events = filteredEvents || [];
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
