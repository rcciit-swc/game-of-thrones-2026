'use client';

import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ---------------------------
   Fallback Sports Images
---------------------------- */

const fallbackImages = [
  {
    id: 1,
    src: 'https://i.postimg.cc/3RrHP65P/table-tennis.webp',
    alt: 'Table Tennis',
  },
  {
    id: 2,
    src: 'https://i.postimg.cc/90nVPBkx/tug-of-war.jpg',
    alt: 'Tug of War',
  },
  { id: 3, src: 'https://i.postimg.cc/pdZwYZhn/running.jpg', alt: 'Running' },
  { id: 4, src: 'https://i.postimg.cc/WzQCbYCL/kabadi.jpg', alt: 'Kabaddi' },
  {
    id: 5,
    src: 'https://i.postimg.cc/hGSwjdyb/volleball.webp',
    alt: 'Volleyball',
  },
  {
    id: 6,
    src: 'https://i.postimg.cc/sfk32Tpj/football.avif',
    alt: 'Football',
  },
  { id: 7, src: 'https://i.postimg.cc/tgvjGkXf/chess.webp', alt: 'Chess' },
  { id: 8, src: 'https://i.postimg.cc/zvKZW1nv/cricket.jpg', alt: 'Cricket' },
  {
    id: 9,
    src: 'https://i.postimg.cc/hPRqnfB8/uber-games-carrom.jpg',
    alt: 'Carrom',
  },
];

/* ---------------------------
   Constants
---------------------------- */

const ITEM_WIDTH = 260;
const GAP = 24;
const MAX_HEIGHT = 400;

/* ---------------------------
   Carousel Item Component
   (Isolated to fix hooks issue)
---------------------------- */

interface CarouselItemProps {
  item: any;
  index: number;
  x: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  TOTAL_WIDTH: number;
}

function CarouselItem({
  item,
  index,
  x,
  containerRef,
  TOTAL_WIDTH,
}: CarouselItemProps) {
  const itemCenter = index * (ITEM_WIDTH + GAP) + ITEM_WIDTH / 2;

  /* Distance from container center */
  const distance = useTransform(x, (v) => {
    const containerCenter =
      (containerRef.current?.offsetWidth ?? TOTAL_WIDTH) / 2;

    const position = (itemCenter + v + TOTAL_WIDTH * 3) % TOTAL_WIDTH;
    return Math.abs(position - containerCenter);
  });

  /* 🔑 SCALE Y — center tallest, sides smaller */
  const scaleY = useTransform(
    distance,
    [0, ITEM_WIDTH * 0.8, ITEM_WIDTH * 1.8],
    [1, 0.9, 0.8]
  );

  /* 🔑 SCALE X — subtle depth */
  const scale = useTransform(distance, [0, ITEM_WIDTH * 1.2], [1.08, 0.94]);

  const opacity = useTransform(distance, [0, ITEM_WIDTH * 1.6], [1, 0.5]);

  const cardContent = (
    <motion.div
      className="relative flex-shrink-0 rounded-3xl overflow-hidden bg-black group"
      style={{
        width: ITEM_WIDTH,
        height: MAX_HEIGHT,
        scale,
        scaleY,
        opacity,
        border: '8px solid transparent',
        backgroundImage:
          'linear-gradient(black, black), linear-gradient(135deg, #B60302, #FF003C, #CCA855)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow:
          '0 20px 60px rgba(182, 3, 2, 0.4), 0 0 40px rgba(204, 168, 85, 0.2)',
      }}
      whileHover={{
        boxShadow:
          '0 30px 80px rgba(182, 3, 2, 0.6), 0 0 60px rgba(204, 168, 85, 0.4)',
      }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={item.src || item.image_url || fallbackImages[0].src}
        alt={item.alt || item.name || 'Event'}
        fill
        sizes="260px"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {/* Impressive hover overlay */}
      {item.name && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#B60302]/85 to-black/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center px-6 transform scale-75 group-hover:scale-100 transition-transform duration-500">
            <p className="text-white text-xl md:text-2xl font-bold leading-tight mb-3 animate-pulse rajdhanifont">
              {item.name}
            </p>
            <div className="h-1.5 w-20 mx-auto bg-gradient-to-r from-transparent via-[#CCA855] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
          </div>
          {/* Animated corner accents */}
          <div className="absolute top-3 left-3 w-10 h-10 border-l-[3px] border-t-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-tl-lg"></div>
          <div className="absolute top-3 right-3 w-10 h-10 border-r-[3px] border-t-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-tr-lg"></div>
          <div className="absolute bottom-3 left-3 w-10 h-10 border-l-[3px] border-b-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-bl-lg"></div>
          <div className="absolute bottom-3 right-3 w-10 h-10 border-r-[3px] border-b-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-br-lg"></div>
        </div>
      )}
    </motion.div>
  );

  return item.id && typeof item.id === 'string' ? (
    <Link href={`/events/${item.id}`}>{cardContent}</Link>
  ) : (
    <>{cardContent}</>
  );
}

/* ---------------------------
   Infinite Auto Carousel
---------------------------- */

interface AutoCarouselProps {
  events?: any[];
  loading?: boolean;
}

export default function AutoCarousel({ events, loading }: AutoCarouselProps) {
  const displayImages = events && events.length > 0 ? events : fallbackImages;
  const TOTAL_ITEMS = displayImages.length;
  const TOTAL_WIDTH = TOTAL_ITEMS * (ITEM_WIDTH + GAP);

  const x = useMotionValue(-TOTAL_WIDTH);
  const containerRef = useRef<HTMLDivElement>(null);

  /* -------- Infinite Loop Fix -------- */
  useEffect(() => {
    return x.onChange((latest) => {
      if (latest <= -TOTAL_WIDTH * 2) x.set(-TOTAL_WIDTH);
      if (latest >= 0) x.set(-TOTAL_WIDTH);
    });
  }, [x, TOTAL_WIDTH]);

  // Show loading state without early return to maintain hook order
  if (loading) {
    return (
      <div className="w-full overflow-hidden py-20 flex items-center justify-center">
        <p className="text-white text-lg">Loading events...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-20"
      style={{ transform: 'translateY(-120px)' }}
    >
      <motion.div
        className="flex items-center cursor-grab active:cursor-grabbing"
        style={{
          x,
          gap: GAP,
          height: MAX_HEIGHT,
        }}
        drag="x"
        dragElastic={0.06}
        dragMomentum
      >
        {[...displayImages, ...displayImages, ...displayImages].map(
          (item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              x={x}
              containerRef={containerRef}
              TOTAL_WIDTH={TOTAL_WIDTH}
            />
          )
        )}
      </motion.div>
    </div>
  );
}
