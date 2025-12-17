'use client';

import { cn, htmlToLines } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Card = ({
  className,
  image,
  title,
  venue,
  entryPrice,
  showDetails,
  isHovered,
  children,
  onClick,
}: {
  className?: string;
  image?: string;
  title?: string;
  venue?: string;
  entryPrice?: string | number;
  showDetails?: boolean;
  children?: React.ReactNode;
  isHovered?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-[350px] cursor-pointer  overflow-hidden rounded-2xl transition-shadow duration-300',
        isHovered
          ? 'shadow-2xl shadow-red-600/60'
          : 'shadow-lg shadow-red-600/20',
        className
      )}
    >
      {image && (
        <div
          className={` relative h-[350px] overflow-hidden w-full mt-0 ${showDetails === false ? 'rounded-2xl' : 'rounded-t-xl'}`}
        >
          <img
            src={image}
            alt="card"
            className={cn(
              'object-cover mt-0 w-full h-full object-center transform-gpu transition-transform duration-500 ease-out',
              isHovered ? 'scale-105' : 'scale-100'
            )}
          />
        </div>
      )}

      {showDetails !== false && (
        <div className=" px-4 py-3 flex flex-col gap-y-2 bg-red-700/30 backdrop-blur-md border border-red-600/30 text-white rounded-b-xl">
          {title && (
            <div className="text-xl font-bold tracking-wider rajdhanifont">
              {title}
            </div>
          )}
          {venue && (
            <div className="text-sm text-gray-200">
              <div className="font-medium">Venue:</div>
              <div className="mt-1 space-y-1">
                {htmlToLines(venue).map((line, i) => (
                  <div className="leading-snug" key={i}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
          {typeof entryPrice !== 'undefined' && (
            <div className="text-sm text-gray-200">
              Entry:{' '}
              {typeof entryPrice === 'number' ? `₹${entryPrice}` : entryPrice}
            </div>
          )}
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
  venue?: string;
  entryPrice?: string | number;
}

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 10,
  animationDelay = 0.1,
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
  animationDelay?: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const limitedCards = cards.slice(0, 2);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-[350px] h-[400px]"
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
                venue={card.venue}
                entryPrice={card.entryPrice}
                showDetails={isFirst}
                isHovered={isHovering}
                onClick={() => {
                  if (card.id !== undefined && card.id !== null) {
                    router.push(`/events/${card.id}`);
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
