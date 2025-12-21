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

const ITEM_WIDTH = 190;
const GAP = 20;
const MAX_HEIGHT = 320;

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
    [1, 0.88, 0.78]
  );

  /* 🔑 SCALE X — subtle depth */
  const scale = useTransform(distance, [0, ITEM_WIDTH * 1.2], [1.04, 0.92]);

  const opacity = useTransform(distance, [0, ITEM_WIDTH * 1.6], [1, 0.45]);

  const cardContent = (
    <motion.div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-black group"
      style={{
        width: ITEM_WIDTH,
        height: MAX_HEIGHT,
        scale,
        scaleY,
        opacity,
        border: '6px solid transparent',
        backgroundImage:
          'linear-gradient(black, black), linear-gradient(135deg, #B60302, #FF003C, #CCA855)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      <Image
        src={item.src || item.image_url || fallbackImages[0].src}
        alt={item.alt || item.name || 'Event'}
        fill
        sizes="190px"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {/* Impressive hover overlay */}
      {item.name && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#B60302]/80 to-black/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center px-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
            <p className="text-white text-base md:text-lg font-bold leading-tight mb-2 animate-pulse">
              {item.name}
            </p>
            <div className="h-1 w-16 mx-auto bg-gradient-to-r from-transparent via-[#CCA855] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
          </div>
          {/* Animated corner accents */}
          <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
          <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
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
