'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';
import { htmlToLines } from '@/lib/utils';

interface EventCardProps {
  title: string;
  image: string;
  venue?: string;
  entryPrice?: string | number;
  description?: string;
  category?: string;
  date?: string;
  isActive: boolean;
  onClick: () => void;
}

const EventCardRes = ({
  title,
  description,
  image,
  category,
  date,
  isActive,
  venue,
  entryPrice,
  onClick,
}: EventCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative w-full max-w-sm mx-auto cursor-pointer overflow-hidden rounded-2xl',
        'border-4 border-red-600',
        'transition-all duration-300',
        '',
        'group',
        isActive
          ? 'shadow-2xl shadow-red-600/80'
          : 'shadow-lg shadow-red-600/20'
      )}
    >
      <div className="relative w-full overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out',
            isActive ? 'scale-105' : 'scale-100',
            'group-hover:scale-105'
          )}
        />
      </div>
      <div className="px-4 py-3 flex flex-col gap-y-2 bg-red-700/30 backdrop-blur-md border border-red-600/30 text-white rounded-b-xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold tracking-wider rajdhanifont">
          {title}
        </h3>

        {venue && (
          <div className="text-sm md:text-base text-white leading-relaxed max-w-xs mx-auto">
            <div className="font-medium">Venue:</div>
            <div className="mt-1 space-y-1">
              {htmlToLines(venue).map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        )}

        {typeof entryPrice !== 'undefined' && (
          <p className="text-sm md:text-base text-white leading-relaxed max-w-xs mt-1 mx-auto">
            Entry:{' '}
            {typeof entryPrice === 'number' ? `₹${entryPrice}` : entryPrice}
          </p>
        )}
      </div>
    </motion.div>
  );
};

interface EventCardsResProps {
  events: Omit<EventCardProps, 'isActive' | 'onClick'>[];
}

const EventCardsRes = ({ events }: EventCardsResProps) => {
  const [activeCardIndex, setActiveCardIndex] = React.useState<number | null>(
    null
  );

  return (
    <div
      className="grid grid-cols-1 gap-20 p-4 min-[1150px]:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveCardIndex(null);
        }
      }}
    >
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EventCardRes
            title={event.title}
            image={event.image}
            venue={event.venue}
            entryPrice={event.entryPrice}
            isActive={activeCardIndex === index}
            onClick={() => setActiveCardIndex(index)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EventCardsRes;
