'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderOverlayProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const LoaderOverlay = ({
  isVisible,
  onAnimationComplete,
}: LoaderOverlayProps) => {
  const [showLoader, setShowLoader] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShowLoader(true);

      // Animation duration
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isVisible, onAnimationComplete]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Loader Background Container - Optimized for Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
              backgroundImage: "url('/assets/loader_bg2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'opacity',
            }}
          >
            {/* Simplified overlay for better performance */}
            <div className="w-full h-full px-4 md:px-32 lg:px-56 py-8 md:py-24 lg:py-32 bg-gradient-to-br from-black/25 to-red-950/25 md:backdrop-blur-md flex flex-col justify-center items-center gap-2.5">
              {/* Loader Container - Centered */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center pointer-events-none"
              >
                {/* Loader Image - Optimized animation with CSS for rotation */}
                {showLoader && (
                  <motion.div
                    initial={{
                      scale: 2.2,
                      opacity: 1,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.3,
                      ease: 'easeInOut',
                    }}
                    className="relative flex items-center justify-center loader-spin-container"
                    style={{
                      willChange: 'transform',
                    }}
                  >
                    <img
                      src="/assets/loader.png"
                      alt="Loading..."
                      className="h-32 w-32 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain loader-spin-image"
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Global CSS for smooth hardware-accelerated rotation */}
          <style jsx global>{`
            @keyframes loaderSpin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(540deg);
              }
            }

            .loader-spin-image {
              animation: loaderSpin 1.3s ease-in-out forwards;
              will-change: transform;
              filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.8));
            }

            @media (min-width: 768px) {
              .loader-spin-image {
                filter: drop-shadow(0 0 40px rgba(220, 38, 38, 1));
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoaderOverlay;
