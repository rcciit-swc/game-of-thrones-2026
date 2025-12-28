'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function TeamLoader() {
  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none" />

      {/* Flickering Lights */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-red-600/60 rounded-full"
          style={{ filter: 'blur(120px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-cyan-500/50 rounded-full"
          style={{ filter: 'blur(120px)' }}
        />
      </motion.div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center"
          style={{
            fontFamily: 'Agency',
            color: '#ef4444',
            textShadow: `
              0 0 10px rgba(239, 68, 68, 1),
              0 0 20px rgba(239, 68, 68, 0.8),
              0 0 30px rgba(239, 68, 68, 0.6)
            `,
          }}
        >
          LOADING TEAMS
        </motion.h2>

        {/* Animated Icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Zap
            className="w-16 h-16 text-red-500"
            style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 1))' }}
          />
        </motion.div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-black/50 rounded-full overflow-hidden border border-red-500/30">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-cyan-500"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
            }}
          />
        </div>

        {/* Loading Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
