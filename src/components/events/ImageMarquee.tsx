'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  'https://i.postimg.cc/NMZHyHjx/SAI-1477.jpg',
  'https://i.postimg.cc/7ZN0BhKP/SAM-6063.jpg',
  'https://i.postimg.cc/t4zWrJ2m/SUB3870.jpg',
  'https://i.postimg.cc/52mLPynR/SUB4149.jpg',
  'https://i.postimg.cc/SKN8H4PQ/SUB4798.jpg',
  'https://i.postimg.cc/GmZw53tv/SAI-1279-(1).jpg',
  'https://i.postimg.cc/h4JYHRF3/SAI-2633.jpg',
  'https://i.postimg.cc/3Nbb09D4/SAI-9676.jpg',
  'https://i.postimg.cc/5NKM8SVM/SAI-9700.jpg',
  'https://i.postimg.cc/W3zGqVmW/SAM-6049.jpg',
  'https://i.postimg.cc/fbZ5L1rR/SAM-6060.jpg',
  'https://i.postimg.cc/JhZVVwBn/SAM-6637.jpg',
  'https://i.postimg.cc/y8fWgZfC/SAM-6680.jpg',
  'https://i.postimg.cc/J4Ls9mDy/SAM-6726.jpg',
  'https://i.postimg.cc/BnhtLKhW/SAM-7148.jpg',
  'https://i.postimg.cc/YqYsCNCz/SAM-7160.jpg',
  'https://i.postimg.cc/XJPwwPQG/SAM-7409.jpg',
  'https://i.postimg.cc/HsRhpZm8/SUB1964.jpg',
  'https://i.postimg.cc/ZqBYWDBQ/SUB2044.jpg',
  'https://i.postimg.cc/PJmPPVcG/SUB2592.jpg',
  'https://i.postimg.cc/JzhzLh1M/SUB2630.jpg',
  'https://i.postimg.cc/HkPssCxx/SUB3705.jpg',
  'https://i.postimg.cc/3Rqggqnd/SUB4248.jpg',
  'https://i.postimg.cc/YCSCHStV/SUB4533.jpg',
  'https://i.postimg.cc/zGLY7HzK/SUB4784.jpg',
  'https://i.postimg.cc/T2kss2HY/SUB4818.jpg',
];

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
