'use client';

import { cn, htmlToLines } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Card = ({
  className,
  image,
  title,
  schedule,
  registrationFee,
  showDetails,
  isHovered,
  children,
  onClick,
  isRegistered,
}: {
  className?: string;
  image?: string;
  title?: string;
  schedule?: string;
  registrationFee?: string | number;
  showDetails?: boolean;
  children?: React.ReactNode;
  isHovered?: boolean;
  onClick?: () => void;
  isRegistered?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-87.5 cursor-pointer  overflow-hidden rounded-2xl transition-shadow duration-300',
        isHovered
          ? 'shadow-2xl shadow-red-600/60'
          : 'shadow-lg shadow-red-600/20',
        className
      )}
    >
      {image && (
        <div
          className={`relative h-87.5 overflow-hidden w-full mt-0 bg-linear-to-br from-gray-900 via-black to-gray-900 ${showDetails === false ? 'rounded-2xl' : 'rounded-t-xl'}`}
        >
          <img
            src={image}
            alt="card"
            className={cn(
              'object-contain mt-0 w-full h-full transform-gpu transition-all duration-500 ease-out',
              isHovered
                ? 'scale-105 brightness-110'
                : 'scale-100 brightness-100'
            )}
          />

          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Already Registered Badge */}
          {isRegistered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute top-3 right-3 z-20"
            >
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badge content */}
                <div className="relative flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 rounded-full shadow-lg backdrop-blur-sm border border-green-400/30">
                  {/* Checkmark icon */}
                  <svg
                    className="w-5 h-5 text-white animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                  {/* Text */}
                  <span className="text-white font-bold text-sm tracking-wide whitespace-nowrap rajdhanifont">
                    Registered
                  </span>
                </div>

                {/* Subtle pulse animation ring */}
                <div className="absolute inset-0 rounded-full border-2 border-green-300 animate-ping opacity-20"></div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {showDetails !== false && (
        <div className="px-4 py-4 flex flex-col gap-y-3 bg-linear-to-br from-red-700/40 via-red-800/30 to-red-900/40 backdrop-blur-lg border border-red-600/40 text-white rounded-b-xl shadow-xl min-h-45">
          {title && (
            <motion.div
              className="text-xl font-bold tracking-wider rajdhanifont bg-linear-to-r from-red-200 to-orange-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.div>
          )}

          {/* Combined Schedule and Fee Section */}
          <div className="flex flex-col gap-3 flex-1">
            {/* Schedule */}
            {schedule && (
              <motion.div
                className="flex items-start gap-2.5 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Calendar Icon */}
                <div className="shrink-0 w-9 h-9 rounded-lg bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-red-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-red-200 mb-1.5 tracking-wide">
                    Schedule & Venue
                  </div>
                  <div className="text-gray-200 space-y-0.5 text-xs leading-relaxed">
                    {htmlToLines(schedule).map((line, i) => (
                      <div className="leading-snug" key={i}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Registration Fee */}
            {typeof registrationFee !== 'undefined' && (
              <motion.div
                className="flex items-center gap-2.5 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {/* Rupee Icon Container */}
                <div className="shrink-0 w-9 h-9 rounded-lg bg-linear-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.66 7H16l-3.47 4.87c2.75.53 5.47 2.24 5.47 5.13 0 2.76-2.24 5-5 5s-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3H8v-2h5.66L17 7h-3.34L17 3h2l-5.34 4z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-yellow-200 tracking-wide text-xs">
                    Registration Fees
                  </span>
                  <span className="text-2xl font-extrabold text-transparent bg-linear-to-r from-yellow-200 via-yellow-100 to-orange-200 bg-clip-text">
                    {typeof registrationFee === 'number'
                      ? `₹${registrationFee}`
                      : registrationFee}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Register Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className="relative w-full mt-3 px-6 py-3 bg-gradient-to-r from-[#B60302] to-[#8f0202] text-white font-['Irish_Grover'] text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#FF003C]/30 hover:border-[#FF003C]/60 overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Register Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.button>

          {children}
        </div>
      )}
    </div>
  );
};

interface CardData {
  id: string | number;
  image: string;
  title?: string;
  schedule?: string;
  registrationFee?: string | number;
  registered?: boolean;
}

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 10,
  animationDelay = 0.1,
  onCardClick,
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
  onCardClick?: (cardId: string) => void;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const limitedCards = cards.slice(0, 2);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-87.5 h-100"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {limitedCards.map((card, index) => {
          const isFirst = index === 0;

          let xOffset = 0;
          let rotation = 0;

          if (limitedCards.length > 1) {
            if (index === 0) {
              xOffset = spreadDistance;
              rotation = rotationAngle;
            } else if (index === 1) {
              xOffset = -spreadDistance;
              rotation = -rotationAngle;
            }
          }

          return (
            <motion.div
              key={index}
              className={cn('absolute', isFirst ? 'z-10' : 'z-0')}
              initial={{ x: 0, rotate: 0 }}
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                zIndex: isFirst ? 10 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: index * animationDelay,
                type: 'spring',
              }}
            >
              <Card
                className={isFirst ? 'z-10 cursor-pointer' : 'z-0'}
                image={card.image}
                title={card.title}
                schedule={card.schedule}
                isRegistered={card.registered}
                registrationFee={card.registrationFee}
                showDetails={isFirst}
                isHovered={isHovering}
                onClick={() => {
                  if (card.id !== undefined && card.id !== null) {
                    const idString = String(card.id);
                    if (onCardClick) {
                      onCardClick(idString);
                    } else {
                      router.push(`/events/${idString}`);
                    }
                  }
                }}
              ></Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { StackedCardsInteraction, Card };
