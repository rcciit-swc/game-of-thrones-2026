'use client';
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Phone,
  User,
  Trophy,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEvents, useUser } from '@/lib/stores';
import { login } from '@/utils/functions/auth/login';
import { SoloEventRegistration } from '@/components/events/EventRegistrationDialog';
import { TeamEventRegistration } from '@/components/events/TeamEventRegistration';
import eventBackgrounds from '@/lib/eventBackgrounds.json';
import Link from 'next/link';

type EventRegistrationProps = {
  eventId?: string;
};

function getBackgroundForEvent(eventId?: string): string | undefined {
  if (!eventId) return undefined;
  return eventBackgrounds[eventId as keyof typeof eventBackgrounds];
}

function parseRulesHtml(html?: string): string[] {
  if (!html) return [];
  if (typeof document === 'undefined') {
    return html
      .split(/\r?\n|\u2022|\*/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const div = document.createElement('div');
  div.innerHTML = html;

  let nodes: Element[] = Array.from(div.querySelectorAll('li'));
  if (nodes.length === 0) {
    nodes = Array.from(div.querySelectorAll('p'));
  }

  const raw = nodes
    .map((n) => (n.textContent || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const cleaned: string[] = [];

  for (let i = 0; i < raw.length; i++) {
    let text = raw[i];
    if (!text) continue;

    while (i + 1 < raw.length) {
      const nextRaw = raw[i + 1];
      if (!nextRaw) {
        i++;
        continue;
      }

      const endsWithPunct = /[.?!:]$/.test(text);
      const nextStartsWithLower = /^[a-z]/.test(nextRaw);
      const nextIsShort = nextRaw.length < 6;

      if (!endsWithPunct && (nextStartsWithLower || nextIsShort)) {
        text = `${text} ${nextRaw}`;
        i++;
        continue;
      }

      const nextLooksLikeContinuation =
        /^[a-z0-9]/i.test(nextRaw) && !/^[0-9]+\./.test(nextRaw);
      if (!endsWithPunct && nextLooksLikeContinuation) {
        text = `${text} ${nextRaw}`;
        i++;
        continue;
      }

      break;
    }
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/the(?=raid)/gi, 'the ');
    text = text.replace(/theraid/gi, 'the raid');
    text = text.replace(/\s+\./g, '.');
    cleaned.push(text);
  }

  if (cleaned.length === 0) {
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .split(/\r?\n+/)
      .map((s) => s.replace(/<[^>]*>/g, '').trim())
      .filter(Boolean);
  }

  return cleaned;
}

type TabType = 'description' | 'rules';

const EventRegistration: React.FC<EventRegistrationProps> = ({ eventId }) => {
  const { eventsData, eventsLoading } = useEvents();
  const { userData, userLoading } = useUser();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [isSoloOpen, setIsSoloOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const selectedEvent =
    eventsData && eventId
      ? eventsData.find((e: any) => String(e.event_id) === String(eventId))
      : undefined;
  const bg = getBackgroundForEvent(eventId);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'rules', label: 'Rules' },
  ];

  let rulesFromEvent: string[] = [];
  const r = (selectedEvent as any)?.rules;

  if (!r) {
    rulesFromEvent = [];
  } else if (Array.isArray(r)) {
    const out: string[] = [];
    for (const item of r) {
      if (!item) continue;
      if (typeof item !== 'string') {
        out.push(String(item).trim());
        continue;
      }
      if (/<\/?\s*(li|p|ul|br)/i.test(item)) {
        out.push(...parseRulesHtml(item));
      } else {
        out.push(item.replace(/\s+/g, ' ').trim());
      }
    }

    const merged: string[] = [];
    for (let i = 0; i < out.length; i++) {
      let text = out[i];
      if (!text) continue;
      while (i + 1 < out.length) {
        const next = out[i + 1];
        if (!next) {
          i++;
          continue;
        }
        const endsWithPunct = /[.?!:]$/.test(text);
        const nextStartsWithLower = /^[a-z]/.test(next);
        const nextIsShort = next.length < 6;
        if (!endsWithPunct && (nextStartsWithLower || nextIsShort)) {
          text = `${text} ${next}`.replace(/\s+/g, ' ').trim();
          i++;
          continue;
        }
        break;
      }
      merged.push(text);
    }

    rulesFromEvent = merged.length ? merged : out;
  } else if (typeof r === 'string') {
    if (/<li\b/i.test(r) || /<ul\b/i.test(r) || /<p\b/i.test(r)) {
      rulesFromEvent = parseRulesHtml(r);
    } else {
      rulesFromEvent = r
        .split(/\r?\n|\u2022|\*/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  const coordinatorsFromEvent: { name: string; phone: string }[] =
    Array.isArray((selectedEvent as any)?.coordinators)
      ? ((selectedEvent as any)?.coordinators as any[])
      : [];

  const descriptionFromEvent =
    (selectedEvent as any)?.description || 'Not available at the moment.';

  const registrationFees =
    (selectedEvent as any)?.registration_fees ??
    (selectedEvent as any)?.registration_fee ??
    '—';

  const prizePool =
    (selectedEvent as any)?.prize_pool ?? (selectedEvent as any)?.prizes ?? '—';

  const scheduleText = (selectedEvent as any)?.schedule || '';

  function parseScheduleLines(html?: string): string[] {
    if (!html) return [];
    if (typeof document === 'undefined') {
      return html
        .replace(/<br\s*\/?\>/gi, '\n')
        .split(/\r?\n+/)
        .map((s) => s.replace(/<[^>]*>/g, '').trim())
        .filter(Boolean);
    }
    const div = document.createElement('div');
    div.innerHTML = html;
    const ps = Array.from(div.querySelectorAll('p'))
      .map((p) => (p.textContent || '').trim())
      .filter(Boolean);
    if (ps.length) return ps;
    const text = (div.textContent || '').replace(/\u00A0/g, ' ').trim();
    return text
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const scheduleLines = parseScheduleLines(scheduleText);

  if (isRedirecting) return null;

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <motion.div
            key="description"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div
              className="text-gray-200 leading-relaxed text-sm md:text-base prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: descriptionFromEvent || '' }}
            />

            {/* Schedule Section */}
            {scheduleLines.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  Schedule & Venue
                </h3>
                <div className="space-y-2 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-4 border border-white/20">
                  {scheduleLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="text-gray-200 text-sm md:text-base flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                    >
                      <span className="text-yellow-400 font-bold text-base mt-0.5">
                        →
                      </span>
                      <span className="flex-1">{line}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Event Coordinators */}
            {coordinatorsFromEvent.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-yellow-400" />
                  Event Coordinators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {coordinatorsFromEvent.map((coord, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 cursor-pointer group"
                    >
                      <p className="font-bold text-white text-base group-hover:text-yellow-300 transition-colors">
                        {coord.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-gray-300 group-hover:text-gray-100 transition-colors">
                        <Phone className="w-4 h-4 text-yellow-400" />
                        <Link
                          href={'tel:' + coord.phone}
                          className="text-sm font-medium"
                        >
                          {coord.phone}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      case 'rules':
        return (
          <motion.div
            key="rules"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="space-y-3">
              {rulesFromEvent.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-gray-200 text-sm md:text-base flex items-start gap-3 group"
                >
                  <span className="text-yellow-400 font-bold mt-1 group-hover:scale-110 transition-transform">
                    •
                  </span>
                  <span className="flex-1">{rule}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleRegister = async () => {
    if (userLoading) {
      toast.info('Please wait while we check your login status');
      return;
    }

    if (!userData) {
      await login();
      return;
    }

    if (
      !userData.phone ||
      !userData.name ||
      userData.phone.trim() === '' ||
      userData.name.trim() === ''
    ) {
      router.push(
        `/profile?onboarding=true&callback=${encodeURIComponent(
          `/events/${selectedEvent?.id}`
        )}`
      );
      return;
    }

    if (selectedEvent?.max_team_size === 1) {
      setIsSoloOpen(true);
    } else {
      setIsTeamOpen(true);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full relative overflow-x-hidden rajdhanifont pt-20 md:pt-28 pb-10">
        {/* Lazy-loaded background image */}
        {bg && (
          <Image
            src={bg}
            alt="Event background"
            fill
            className="object-cover"
            loading="lazy"
            priority={false}
            quality={75}
            sizes="100vw"
          />
        )}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />
        {/* Animated Background glow effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]"
        />

        {/* Header with animated title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 flex justify-center rajdhanifont text-white font-bold items-center px-4 sm:px-6 md:px-8 py-4"
        >
          <h1
            className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              WebkitTextStroke: '1px rgba(0,0,0,0.85)',
              textShadow: '0 1px 1px rgba(0,0,0,0.6)',
            }}
          >
            {selectedEvent?.name || 'Event'}
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-3xl mt-5 w-full max-w-[95vw] md:max-w-[90vw] xl:max-w-[80vw] mx-auto backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border-2 border-white/30 relative z-10 px-3 sm:px-4 md:px-8 lg:px-12 pb-6 shadow-2xl hover:shadow-3xl transition-shadow duration-500"
        >
          <div className="z-0 backdrop-blur-sm bg-black/50 h-full w-[60%] rounded-r-3xl right-0 top-0 absolute hidden min-[1150px]:block" />

          <div className="flex justify-between mx-4 my-6 md:m-5 relative z-20">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#CCA855] to-[#D4B76A] hover:from-[#CCA855]/90 hover:to-[#D4B76A]/90 text-white px-2 sm:px-3 sm:pr-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#CCA855]/30"
              onClick={() => router.back()}
            >
              <Image
                src="/assets/arrow-left.svg"
                alt="Back"
                width={20}
                height={20}
                className="rounded-full bg-gradient-to-br from-[#FF003C] to-[#C70030] p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 shadow-md"
              />
              <span className="hidden sm:inline font-bold text-sm md:text-base">
                BACK
              </span>
            </motion.button>

            {selectedEvent?.event_id &&
              (!selectedEvent.reg_status ? (
                // Registration Closed Button
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  animate={{
                    boxShadow: [
                      '0 8px 16px rgba(239, 68, 68, 0.3)',
                      '0 10px 24px rgba(239, 68, 68, 0.5)',
                      '0 8px 16px rgba(239, 68, 68, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  type="button"
                  disabled
                  className="relative px-7 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 text-[18px] md:text-[20px] cursor-not-allowed font-['Irish_Grover'] rounded-[50px] transition-all duration-300 text-center border-2 border-red-500/50 overflow-hidden opacity-75"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🔒
                    </motion.span>
                    Register Soon
                  </span>
                  {/* Diagonal strike-through effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-red-500/20"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />
                  {/* Pulsing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-[50px] border-2 border-red-500"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.button>
              ) : selectedEvent.registered ? (
                // Already Registered Button
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      '0 8px 16px rgba(34, 197, 94, 0.3)',
                      '0 10px 24px rgba(34, 197, 94, 0.4)',
                      '0 8px 16px rgba(34, 197, 94, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  type="button"
                  disabled
                  className="relative px-7 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-[18px] md:text-[20px] cursor-not-allowed font-['Irish_Grover'] rounded-[50px] transition-all duration-300 text-center border-2 border-emerald-400/50 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✓
                    </motion.span>
                    Already Registered
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.button>
              ) : (
                // Register Now Button
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    boxShadow: '0 15px 35px rgba(182, 3, 2, 0.6)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: [
                      '0 10px 20px rgba(182, 3, 2, 0.3)',
                      '0 12px 30px rgba(182, 3, 2, 0.5)',
                      '0 10px 20px rgba(182, 3, 2, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  type="button"
                  onClick={handleRegister}
                  className="relative px-7 py-3 bg-gradient-to-r from-[#B60302] to-[#8f0202] text-[#FAFAFA] text-[18px] md:text-[20px] cursor-pointer font-['Irish_Grover'] rounded-[50px] hover:from-[#D60302] hover:to-[#B60302] transition-all duration-300 text-center border-2 border-[#FF003C]/30 hover:border-[#FF003C]/60 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Register Now
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF003C]/0 via-[#FF003C]/20 to-[#FF003C]/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.button>
              ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto px-2">
            {/* Left Side - Event Poster & Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-2/5 flex flex-col gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-[300px] md:w-[400px] h-fit rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
              >
                <img
                  src={
                    selectedEvent?.image_url ||
                    '/assets/events/default-event.jpg'
                  }
                  alt={selectedEvent?.name || 'Event Poster'}
                  className="w-[300px] md:w-[400px] object-cover"
                />
              </motion.div>

              {/* Registration Fees & Prize Pool */}
              <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-3 w-full lg:w-4/5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md rounded-xl p-4 border-2 border-emerald-400/30 shadow-lg hover:shadow-xl hover:border-emerald-400/50 transition-all duration-300"
                >
                  <p className="text-emerald-300 text-xs md:text-sm font-medium mb-1 uppercase tracking-wide">
                    Registration Fees
                  </p>
                  <p className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
                    ₹{registrationFees}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent backdrop-blur-md rounded-xl p-4 border-2 border-amber-400/30 shadow-lg hover:shadow-xl hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <p className="text-amber-300 text-xs md:text-sm font-medium uppercase tracking-wide">
                      Prize Pool
                    </p>
                  </div>
                  <p className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                    ₹{prizePool}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Event Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="z-10 w-full lg:w-3/5 flex flex-col rounded-2xl p-4 md:p-3"
            >
              {/* Tabs */}
              <div className="flex gap-4 md:gap-6 lg:gap-10 border-b-2 border-white/20 mb-6 overflow-x-auto whitespace-nowrap -mx-2 px-2">
                {tabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-2 text-sm md:text-base font-bold transition-all relative ${
                      activeTab === tab.id
                        ? 'text-yellow-400'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-t-full shadow-lg shadow-yellow-400/50"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content - Scrollable only for rules */}
              <div
                className={`${activeTab === 'rules' ? 'overflow-auto max-h-[55vh] scrollbar-thin scrollbar-thumb-yellow-400/50 scrollbar-track-white/5' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {renderTabContent()}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {selectedEvent && (
        <>
          <SoloEventRegistration
            isOpen={isSoloOpen}
            onClose={() => setIsSoloOpen(false)}
            eventID={selectedEvent.event_id as string}
            eventName={selectedEvent.name}
            eventFees={selectedEvent.registration_fees}
          />
          <TeamEventRegistration
            eventFees={selectedEvent.registration_fees}
            isOpen={isTeamOpen}
            onClose={() => setIsTeamOpen(false)}
            eventID={selectedEvent.event_id as string}
            eventName={selectedEvent.name}
            minTeamSize={Number(selectedEvent.min_team_size)}
            maxTeamSize={Number(selectedEvent.max_team_size)}
          />
        </>
      )}
    </>
  );
};

export default EventRegistration;
