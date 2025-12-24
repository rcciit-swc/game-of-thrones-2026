'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { hallOfFameImages } from '@/lib/constants/images';

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
        className="z-3 translate-y-8 md:translate-y-12 relative overflow-hidden font-sans cursor-grab active:cursor-grabbing
      [--v-offset:80px] [--curve-height:120px] md:[--curve-height:140px]"
      >
        <motion.div
          ref={marqueeRef}
          className="flex w-max gap-3 md:gap-4"
          style={{ x: baseX }}
          drag="x"
          dragElastic={0.05}
          dragMomentum={false}
          dragTransition={{ power: 0 }}
          dragConstraints={{ left: -10000, right: 0 }}
        >
          {[...hallOfFameImages, ...hallOfFameImages].map((src, index) => (
            <div
              key={index}
              className="w-[280px] md:w-[320px] lg:w-[350px] shrink-0 relative"
            >
              <Image
                src={src}
                alt=""
                width={350}
                height={400}
                priority={index < 20}
                className="w-full h-[280px] md:h-[320px] lg:h-[360px] object-cover rounded-lg pointer-events-none"
              />
            </div>
          ))}
        </motion.div>

        {/* Top curve - matches EventContainer background */}
        <div
          className="border-6 md:border-8 border-red-700 pointer-events-none absolute z-[99]
        w-[calc(100vw+2*var(--v-offset))]
        h-[var(--curve-height)]
        rounded-[55%]
        left-[calc(-1*var(--v-offset))]
        top-[calc(-0.7*var(--curve-height))]"
          style={{
            backgroundImage: "url('/assets/events/bg.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Bottom curve - matches EventContainer background */}
        <div
          className="border-6 md:border-8 border-red-700 pointer-events-none absolute z-[99]
        w-[calc(100vw+2*var(--v-offset))]
        h-[var(--curve-height)]
        rounded-[55%]
        left-[calc(-1*var(--v-offset))]
        bottom-[calc(-0.7*var(--curve-height))]"
          style={{
            backgroundImage: "url('/assets/events/bg.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    </>
  );
}
