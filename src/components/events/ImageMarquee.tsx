'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const images = Array.from(
  { length: 20 },
  (_, i) => `https://picsum.photos/seed/picsum${i}/400`
);

export default function ImageMarquee() {
  const [mounted, setMounted] = useState(false);
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseSpeed = 340;

  useAnimationFrame((t, delta) => {
    if (!mounted || !marqueeRef.current) return;

    baseX.set(baseX.get() - (baseSpeed * delta) / 1000);

    const marqueeWidth = marqueeRef.current.scrollWidth / 2;

    if (baseX.get() <= -marqueeWidth) {
      baseX.set(0);
    }
  });

  if (!mounted) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="z-3 translate-y-15 relative overflow-hidden font-sans cursor-grab active:cursor-grabbing
      [--v-offset:100px] [--curve-height:170px]"
      >
        <motion.div
          ref={marqueeRef}
          className="flex w-max gap-4"
          style={{ x: baseX }}
          drag="x"
          dragElastic={0.05}
          dragMomentum={false}
          dragTransition={{ power: 0 }}
          dragConstraints={{ left: -10000, right: 0 }}
        >
          {[...images, ...images].map((src, index) => (
            <div key={index} className="w-[350px] shrink-0 relative">
              <Image
                src={src}
                alt=""
                width={350}
                height={450}
                priority={index < 20}
                className="w-full h-[400px] xl:h-[450px] object-cover rounded-lg pointer-events-none"
              />
            </div>
          ))}
        </motion.div>

        {/* Top curve */}
        <div
          className="border-8  border-red-700 pointer-events-none absolute z-[99] bg-black
        w-[calc(100vw+2*var(--v-offset))]
        h-[var(--curve-height)]
        rounded-[55%]
        left-[calc(-1*var(--v-offset))]
        top-[calc(-0.7*var(--curve-height))]"
        />

        {/* Bottom curve */}
        <div
          className="border-8 border-red-700 pointer-events-none absolute z-[99] bg-black
        w-[calc(100vw+2*var(--v-offset))]
        h-[var(--curve-height)]
        rounded-[55%]
        left-[calc(-1*var(--v-offset))]
        bottom-[calc(-0.7*var(--curve-height))]"
        />
      </div>
    </>
  );
}
