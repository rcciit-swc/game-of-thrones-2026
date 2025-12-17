'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface EventCardProps {
  title: string;
  description: string;
  image: string;
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
        'h-[280px]',
        isActive
          ? 'shadow-2xl shadow-red-600/80'
          : 'shadow-lg shadow-red-600/20 hover:shadow-2xl hover:shadow-red-600/60'
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-4 rajdhanifont">
          {title}
        </h3>

        <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-xs">
          {description}
        </p>
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
      className="grid grid-cols-1 gap-6 p-4 min-[1150px]:hidden"
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
            {...event}
            isActive={activeCardIndex === index}
            onClick={() => setActiveCardIndex(index)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EventCardsRes;
