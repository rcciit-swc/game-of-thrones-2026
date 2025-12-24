'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { htmlToLines } from '@/lib/utils';
import { Calendar, IndianRupee, MapPin } from 'lucide-react';

interface EventCardProps {
  id: string | number;
  title: string;
  image: string;
  schedule?: string;
  registrationFee?: string | number;
  registered?: boolean;
  description?: string;
  category?: string;
  date?: string;
  isActive: boolean;
  onClick: () => void;
}

const EventCardRes = ({
  id,
  title,
  description,
  image,
  category,
  date,
  isActive,
  schedule,
  registrationFee,
  registered,
  onClick,
}: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative w-full max-w-md mx-auto cursor-pointer overflow-hidden rounded-3xl',
        'border-2 transition-all duration-500',
        'group backdrop-blur-xl',
        isActive
          ? 'border-yellow-400/60 shadow-2xl shadow-yellow-600/40'
          : 'border-red-600/40 shadow-xl shadow-red-600/20 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-600/30'
      )}
    >
      {/* Image Section */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-contain transform-gpu transition-all duration-700 ease-out',
            isActive ? 'scale-105 brightness-110' : 'scale-100 brightness-100',
            'group-hover:scale-105 group-hover:brightness-110'
          )}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

        {/* Registered Badge */}
        {registered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="relative group/badge">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-75" />
              <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg border border-green-400/30">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-white font-bold text-sm rajdhanifont">
                  Registered
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-wide rajdhanifont text-white drop-shadow-2xl"
            style={{
              textShadow:
                '0 4px 12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.3)',
            }}
          >
            {title}
          </motion.h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative px-6 py-5 bg-gradient-to-br from-red-900/60 via-red-800/50 to-black/60 backdrop-blur-xl border-t border-red-600/30">
        {/* Schedule/Venue */}
        {schedule && (
          <div className="mb-4">
            <div className="flex items-start gap-3 text-sm">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/30 to-red-600/20 border border-red-400/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-red-300" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-red-200 mb-1.5 tracking-wide text-xs uppercase">
                  Schedule & Venue
                </div>
                <div className="text-gray-200 space-y-1 text-xs leading-relaxed">
                  {htmlToLines(schedule)
                    .slice(0, 2)
                    .map((line, i) => (
                      <div key={i} className="leading-snug">
                        {line}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Fee & Register Button */}
        <div className="flex items-center justify-between gap-4">
          {/* Registration Fee */}
          {typeof registrationFee !== 'undefined' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/20 border border-yellow-400/40 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-yellow-200/80 tracking-wide uppercase">
                  Registration Fees
                </span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                  {typeof registrationFee === 'number'
                    ? `₹${registrationFee}`
                    : registrationFee}
                </span>
              </div>
            </motion.div>
          )}

          {/* Register Now Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="relative px-6 py-3 bg-gradient-to-r from-[#B60302] to-[#8f0202] text-white font-['Irish_Grover'] text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#FF003C]/30 hover:border-[#FF003C]/60 overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
              Register
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

interface EventCardsResProps {
  events: Omit<EventCardProps, 'isActive' | 'onClick'>[];
  onCardClick?: (eventId: string | number) => void;
}

const EventCardsRes = ({ events, onCardClick }: EventCardsResProps) => {
  const [activeCardIndex, setActiveCardIndex] = React.useState<number | null>(
    null
  );
  const router = useRouter();

  return (
    <div
      className="grid grid-cols-1 gap-12 p-4 md:p-6 min-[1150px]:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveCardIndex(null);
        }
      }}
    >
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <EventCardRes
            id={event.id as any}
            title={event.title}
            image={event.image}
            schedule={event.schedule}
            registrationFee={event.registrationFee}
            registered={event.registered}
            isActive={activeCardIndex === index}
            onClick={() => {
              setActiveCardIndex(index);
              if (event.id !== undefined && event.id !== null) {
                const idString = String(event.id);
                if (onCardClick) {
                  onCardClick(event.id);
                } else {
                  router.push(`/events/${idString}`);
                }
              }
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EventCardsRes;
