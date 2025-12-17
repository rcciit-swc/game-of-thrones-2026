'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ---------------------------
   Sports Images List
---------------------------- */

const sportsImages = [
  { id: 1, src: '/assest/pics/Ellipse 7.svg', alt: 'Sport 1' },
  { id: 2, src: '/assest/pics/Ellipse 8.svg', alt: 'Sport 2' },
  { id: 3, src: '/assest/pics/Ellipse 3.svg', alt: 'Sport 3' },
  { id: 4, src: '/assest/pics/Ellipse 4.svg', alt: 'Sport 4' },
  { id: 5, src: '/assest/pics/Ellipse 9.svg', alt: 'Sport 5' },
  { id: 6, src: '/assest/pics/Ellipse 10.svg', alt: 'Sport 6' },
  { id: 7, src: '/assest/pics/Ellipse 11.svg', alt: 'Sport 7' },
  { id: 8, src: '/assest/pics/Ellipse 12.svg', alt: 'Sport 8' },
  { id: 9, src: '/assest/pics/Ellipse 5.svg', alt: 'Sport 9' },
  { id: 10, src: '/assest/pics/Ellipse 6.svg', alt: 'Sport 10' },
];

/* ---------------------------
   Auto Carousel Component
---------------------------- */

const Autocarousel = () => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const ITEM_WIDTH = 180;
  const MIN_HEIGHT = 140;
  const MAX_HEIGHT = 280;
  const GAP = 16;
  const TOTAL_WIDTH = (ITEM_WIDTH + GAP) * sportsImages.length;

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const controls = animate(x, [-TOTAL_WIDTH, 0], {
      ease: 'linear',
      duration: 25,
      repeat: Infinity,
    });

    const unsub = x.on('change', (v) => setCurrentX(v));

    return () => {
      controls.stop();
      unsub();
    };
  }, [x, TOTAL_WIDTH]);

  const calculateHeight = (xPos: number, index: number) => {
    if (!containerWidth) return MIN_HEIGHT;

    const centerX = containerWidth / 2;
    const itemCenterX = (ITEM_WIDTH + GAP) * index + ITEM_WIDTH / 2;

    let actualItemX = (xPos % TOTAL_WIDTH) + itemCenterX;
    if (actualItemX < 0) actualItemX += TOTAL_WIDTH;

    let distance = Math.abs(actualItemX - centerX);
    distance = Math.min(
      distance,
      Math.abs(actualItemX - TOTAL_WIDTH - centerX),
      Math.abs(actualItemX + TOTAL_WIDTH - centerX)
    );

    const normalized = Math.min(distance / (containerWidth / 2), 1);
    const heightFactor = Math.cos((normalized * Math.PI) / 2);

    return MIN_HEIGHT + heightFactor * (MAX_HEIGHT - MIN_HEIGHT);
  };

  const calculateOpacity = (xPos: number, index: number) => {
    if (!containerWidth) return 0.5;

    const centerX = containerWidth / 2;
    const itemCenterX = (ITEM_WIDTH + GAP) * index + ITEM_WIDTH / 2;

    let actualItemX = (xPos % TOTAL_WIDTH) + itemCenterX;
    if (actualItemX < 0) actualItemX += TOTAL_WIDTH;

    let distance = Math.abs(actualItemX - centerX);
    distance = Math.min(
      distance,
      Math.abs(actualItemX - TOTAL_WIDTH - centerX),
      Math.abs(actualItemX + TOTAL_WIDTH - centerX)
    );

    const normalized = Math.min(distance / (containerWidth / 2), 1);
    return 0.4 + (1 - normalized) * 0.6;
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden -mt-24 pb-12"
      style={{ cursor: 'grab' }}
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: `${GAP}px`,
          x,
          height: MAX_HEIGHT + 40,
          touchAction: 'pan-y',
        }}
        drag="x"
        dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {[...sportsImages, ...sportsImages, ...sportsImages].map(
          (item, index) => {
            const height = calculateHeight(currentX, index);
            const opacity = calculateOpacity(currentX, index);

            return (
              <motion.div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 rounded-xl overflow-hidden shadow-2xl"
                style={{
                  width: ITEM_WIDTH,
                  height,
                  opacity,
                  userSelect: 'none',
                  border: '9px solid rgba(234, 228, 228, 0.6)',
                }}
                animate={{
                  scale: height > (MIN_HEIGHT + MAX_HEIGHT) / 2 ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              </motion.div>
            );
          }
        )}
      </motion.div>
    </div>
  );
};

export default Autocarousel;
