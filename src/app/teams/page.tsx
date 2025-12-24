'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Users, Trophy, Calendar, Sparkles } from 'lucide-react';

export default function TeamsPage() {
  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/about/playerprofilebg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Coming Soon Section */}
          <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Animated Icons */}
              <motion.div
                className="flex items-center justify-center gap-6 mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Users size={48} className="text-[#CCA855]" />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  <Trophy size={56} className="text-[#FF003C]" />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                >
                  <Sparkles size={48} className="text-[#CCA855]" />
                </motion.div>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                style={{
                  fontFamily: 'Agency',
                  background:
                    'linear-gradient(90deg, #CCA855, #FF003C, #CCA855)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                }}
              >
                COMING SOON
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-8"
              >
                <h2
                  className="text-2xl md:text-4xl font-bold text-[#CCA855] mb-4"
                  style={{ fontFamily: 'Irish Grover' }}
                >
                  Team Profiles
                </h2>
                <p className="text-gray-300 text-lg md:text-xl rajdhanifont max-w-2xl mx-auto leading-relaxed">
                  Get ready to meet the incredible teams competing in Game of
                  Thrones 2026. Team profiles will be revealed soon!
                </p>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-[#CCA855]" />
                <Calendar size={32} className="text-[#FF003C] animate-pulse" />
                <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-[#CCA855]" />
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="inline-block bg-gradient-to-r from-transparent via-black/40 to-transparent px-8 py-4 rounded-lg backdrop-blur-sm border border-[#CCA855]/20"
              >
                <p className="text-[#CCA855] font-medium rajdhanifont text-base md:text-lg">
                  Stay tuned for updates on our official channels
                </p>
              </motion.div>

              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 -z-10 pointer-events-none"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF003C]/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#CCA855]/20 rounded-full blur-[80px]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
}
