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

  useEffect(() => {
    if (isVisible) {
      setShowLoader(true);

      // Total animation duration: backdrop fade in (0.3s) + loader zoom animation (1.8s) + pause (0.7s)
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, 2800);

      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isVisible, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Loader Background Container - Full Screen Responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
              backgroundImage: "url('/assets/loader_bg2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay with specified styling */}
            <div className="w-full h-full px-4 md:px-32 lg:px-56 py-8 md:py-24 lg:py-32 bg-linear-to-br from-black/25 to-red-950/25 backdrop-blur-md flex flex-col justify-center items-center gap-2.5">
              {/* Loader Container - Centered */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center pointer-events-none"
              >
                {/* Loader Image - Vigorous Zoom out + Fast Rotation animation */}
                {showLoader && (
                  <motion.div
                    initial={{
                      height: 'clamp(200px, 60vh, 90vh)',
                      rotate: 0,
                      opacity: 1,
                    }}
                    animate={{
                      height: 'clamp(120px, 25vh, 40vh)',
                      rotate: 720,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                    className="relative flex items-center justify-center"
                  >
                    <img
                      src="/assets/loader.png"
                      alt="Loading..."
                      className="w-auto h-full object-contain drop-shadow-2xl"
                      style={{
                        filter: 'drop-shadow(0 0 40px rgba(220, 38, 38, 1))',
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoaderOverlay;
