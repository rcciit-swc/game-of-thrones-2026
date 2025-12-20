'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

/* ---------------------------
   Sports Images List
---------------------------- */

const sportsImages = [
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

const TOTAL_ITEMS = sportsImages.length;
const TOTAL_WIDTH = TOTAL_ITEMS * (ITEM_WIDTH + GAP);

/* ---------------------------
   Infinite Auto Carousel
---------------------------- */

export default function AutoCarousel() {
  const x = useMotionValue(-TOTAL_WIDTH);
  const containerRef = useRef<HTMLDivElement>(null);

  /* -------- Infinite Loop Fix -------- */
  useEffect(() => {
    return x.onChange((latest) => {
      if (latest <= -TOTAL_WIDTH * 2) x.set(-TOTAL_WIDTH);
      if (latest >= 0) x.set(-TOTAL_WIDTH);
    });
  }, [x]);

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
          height: MAX_HEIGHT, // 🔒 LOCKED HEIGHT
        }}
        drag="x"
        dragElastic={0.06}
        dragMomentum
      >
        {[...sportsImages, ...sportsImages, ...sportsImages].map(
          (item, index) => {
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
            const scale = useTransform(
              distance,
              [0, ITEM_WIDTH * 1.2],
              [1.04, 0.92]
            );

            const opacity = useTransform(
              distance,
              [0, ITEM_WIDTH * 1.6],
              [1, 0.45]
            );

            return (
              <motion.div
                key={`${item.id}-${index}`}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-black"
                style={{
                  width: ITEM_WIDTH,
                  height: MAX_HEIGHT, // 🔒 FIXED HEIGHT
                  scale,
                  scaleY, // ✅ VISUAL HEIGHT
                  opacity,
                  border: '6px solid white',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="190px"
                  className="object-cover"
                />
              </motion.div>
            );
          }
        )}
      </motion.div>
    </div>
  );
}
