'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface EventCardProps {
  name: string;
  image_url: string;
  registration_fees: number;
  registered?: boolean;
  schedule: string;
  eventID: string;
}

const EventCard = ({ name, image_url, schedule }: EventCardProps) => {
  // Helper to strip HTML tags (Regex based for SSR safety)
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  // Clean the schedule string first
  const cleanSchedule = schedule ? stripHtml(schedule) : '';

  // Improved Logic: Isolate the actual "Venue : Date , Place" section
  const scheduleParts = cleanSchedule.split(/Venue\s*:/i);
  const eventInfo =
    scheduleParts.length > 1
      ? scheduleParts[scheduleParts.length - 1].trim()
      : cleanSchedule;

  // Extract venue from the isolated event info (format: "DATE, VENUE")
  const venueMatch = eventInfo.match(/,\s*(.+)$/);
  const venue = venueMatch
    ? venueMatch[1].trim().replace(/DISTRICTSPORTS/i, 'DISTRICT SPORTS')
    : 'RCCIIT';

  // Extract date from the event info
  const dateMatch = eventInfo.match(/^([^,]+)/);
  const rawDate = dateMatch ? dateMatch[1].trim() : '';

  let formattedDate = rawDate;
  try {
    // Attempt to parse date string.
    const datePattern =
      /(\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*)/i;
    const extractedDate =
      rawDate.match(datePattern) || eventInfo.match(datePattern);

    if (extractedDate) {
      const dateObj = new Date(
        extractedDate[1].replace(/(\d+)(st|nd|rd|th)/, '$1')
      );
      if (!isNaN(dateObj.getTime())) {
        const day = dateObj.getDate();
        const month = dateObj
          .toLocaleString('default', { month: 'short' })
          .toUpperCase();
        formattedDate = `${day} ${month}`;
      }
    }
  } catch (e) {
    console.warn('Date parsing failed', e);
  }

  // Refined Title Logic: Remove "Tournament", "League", championship, etc, but keep "Table Tennis"
  // Refined Title Logic: Remove "Tournament", "League" suffixes AND category keywords to extract just the Sport Name
  const title = name
    ? name
        .replace(
          /\s+(Tournament|League|Championship|Competition|Match|202[0-9]).*$/i,
          ''
        ) // Remove suffixes
        .replace(
          /\b(Singles|Doubles|Men|Women|Male|Female|Mixed|Boys|Girls)\b/gi,
          ''
        ) // Remove categories
        .replace(/\s+/g, ' ') // Clean up double spaces
        .trim()
    : 'EVENT';

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[25px] w-full max-w-[398px] h-[344px] md:h-[480px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[25px] overflow-hidden">
        <Image
          src={image_url || '/placeholder.svg'}
          alt={name || 'Event image'}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          priority={true}
        />
      </div>

      {/* Hazy Blur Overlay */}
      <div
        className="absolute inset-0 rounded-[24px] backdrop-blur-[7.5px]"
        style={{
          backgroundImage:
            'linear-gradient(140deg, rgba(0, 0, 0, 0.15) 5%, rgba(255, 255, 255, 0.15) 95%)',
        }}
      />

      {/* Content Overlay - Game Name and Venue */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mb-16">
        {/* Game Name */}
        <h3 className="rajdhanifont font-bold text-white text-[24px] md:text-[32px] uppercase tracking-wide drop-shadow-lg leading-none">
          {title}
        </h3>

        {/* Categories (Singles, Doubles, etc) */}
        {(() => {
          // keywords to look for
          const validCategories = [
            'Singles',
            'Doubles',
            'Men',
            'Women',
            'Male',
            'Female',
            'Mixed',
            'Boys',
            'Girls',
          ];
          const foundCategories = validCategories
            .filter((cat) => new RegExp(`\\b${cat}\\b`, 'i').test(name))
            .map((cat) => cat.toUpperCase());

          if (foundCategories.length > 0) {
            return (
              <p className="rajdhanifont font-bold text-white text-[14px] md:text-[18px] uppercase tracking-wider mt-1">
                {foundCategories.join(' • ')}
              </p>
            );
          }
          return null;
        })()}

        {/* Venue Info */}
        <p className="rajdhanifont text-[#f2efe9] text-[16px] md:text-[20px] mt-2 md:mt-3 uppercase">
          <span className="font-bold">
            VENUE: {formattedDate} , {venue}
          </span>
        </p>
      </div>

      {/* Registered Button at Bottom - Styled like Edit button */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2">
        <button
          className="h-[45px] w-[150px] md:h-[50px] md:w-[160px] bg-[#f2efe9] rounded-[15px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rajdhanifont font-semibold text-black text-[20px] md:text-[21px] uppercase cursor-default"
          tabIndex={-1}
        >
          REGISTERED
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;
