'use client';
import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEvents } from '@/lib/stores';

type EventRegistrationProps = {
  // eventsId from route; treated as the event id
  eventName?: string;
};

function normalizeBackgroundName(name?: string) {
  if (!name) return undefined;
  // Remove spaces and special characters to match file names like "TableTennis.svg"
  const compact = name.replace(/[^a-zA-Z0-9]/g, '').trim();
  // Capitalize first letter, keep rest as-is to align with existing assets
  return compact.charAt(0).toUpperCase() + compact.slice(1);
}

function getBackgroundForEvent(name?: string) {
  const normalized = normalizeBackgroundName(name);
  if (normalized) {
    return `/assets/events/Background/${normalized}.svg`;
  }
  // Fallback background
  return '/assets/events/bg.svg';
}

function parseRulesHtml(html?: string): string[] {
  if (!html) return [];
  if (typeof document === 'undefined') {
    // fallback simple split
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

type TabType = 'description' | 'rules' | 'coordinators' | 'more';

const EventRegistration: React.FC<EventRegistrationProps> = ({ eventName }) => {
  function getStringBeforeBracket(input: string): string {
    const match = input.match(/^[^(]*/);
    return match ? match[0].trim() : input;
  }
  const { eventsData, eventsLoading } = useEvents();
  const [activeTab, setActiveTab] = useState<TabType>('description');

  // compute selected event directly (no memoization)
  const selectedEvent =
    eventsData && eventName
      ? eventsData.find((e: any) => String(e.id) === String(eventName))
      : undefined;
  console.log('Selected Event:', selectedEvent);
  // Choose background by event name if available
  const bg = getBackgroundForEvent(
    selectedEvent?.name
      ? getStringBeforeBracket(selectedEvent.name)
      : eventName || ''
  );
  console.log('Background Image URL:', bg);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'rules', label: 'Rules' },
    { id: 'coordinators', label: 'Coordinators' },
    { id: 'more', label: 'More Details' },
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

  const scheduleText = (selectedEvent as any)?.schedule || '';

  // Extract schedule lines: prefer <p> contents, then <br> or newline-split fallbacks
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
    // If no <p>, split on <br> or newlines in textContent
    const text = (div.textContent || '').replace(/\u00A0/g, ' ').trim();
    return text
      .split(/\r?\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const scheduleLines = parseScheduleLines(scheduleText);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {descriptionFromEvent}
          </p>
        );
      case 'rules':
        return (
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            {rulesFromEvent.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        );
      case 'coordinators':
        return (
          <div className="space-y-3">
            {coordinatorsFromEvent.map((coord, index) => (
              <div key={index} className="text-gray-300">
                <p className="font-semibold">{coord.name}</p>
                <p className="text-sm">{coord.phone}</p>
              </div>
            ))}
          </div>
        );
      case 'more':
        return (
          <p className="text-gray-300">
            Additional event details will be shared soon.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden rajdhanifont"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]" />

      {/* Header with Back and Register buttons */}
      <div className="relative z-20 flex justify-center rajdhanifont text-white font-bold items-center px-4 sm:px-6 md:px-8 py-4">
        <h1
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          style={{
            WebkitTextStroke: '1px rgba(0,0,0,0.85)',
            textShadow: '0 1px 1px rgba(0,0,0,0.6)',
          }}
        >
          {selectedEvent?.name || 'Event'}
        </h1>
      </div>

      {/* Main Content */}
      <div className="md:max-h-[80vh] mb-10 rounded-3xl mt-5 w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] mx-auto backdrop-blur-md bg-white/10 border border-white/20 relative z-10 px-3 sm:px-4 md:px-8 lg:px-12 pb-6">
        <div className="z-0 backdrop-blur-sm bg-black/50 h-full w-[60%] rounded-r-3xl right-0 top-0 absolute hidden min-[1150px]:block" />
        <div className=" flex justify-between mx-4 my-6 md:m-5">
          <button className="flex items-center gap-2 bg-[#CCA855] hover:bg-red-800 text-white px-2 pr-4  py-2 rounded-full transition-colors">
            <Image
              src="/assets/arrow-left.svg"
              alt="Back"
              width={20}
              height={20}
              className="rounded-full bg-orange-500 p-2 h-8 w-8"
            />
            <span className="font-bold">BACK</span>
          </button>

          {/* Register Now Button */}
          <button className="relative z-10 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-500 text-white px-6 py-3 rounded-full font-bold text-lg transition-all before:absolute before:inset-0 before:-z-10 before:rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6),0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_20px_rgba(239,68,68,0.8),0_0_30px_rgba(239,68,68,0.6)]">
            Register Now
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto px-2">
          {/* Left Side - Event Poster */}
          <div className="w-full lg:w-2/5 h-full">
            {/* Event Card/Poster */}
            <div className="w-full sm:w-[90%] md:w-[80%] h-[45vh] md:h-[55vh] lg:h-[60vh] rounded-2xl overflow-hidden flex justify-center items-center mx-auto">
              <img
                src={
                  selectedEvent?.image_url || '/assets/events/default-event.jpg'
                }
                alt={selectedEvent?.name || 'Event Poster'}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Registration Fee */}
            <div className="mt-4 text-center">
              <p className="text-white text-lg md:text-xl">
                Registration Fees:-{' '}
                <span className="font-bold text-2xl">{registrationFees}/-</span>
              </p>
            </div>
          </div>

          {/* Right Side - Event Details */}
          <div className="z-10 w-full lg:w-3/5 h-full flex flex-col overflow-hidden rounded-2xl p-4 md:p-6">
            {/* Tabs */}
            <div className="flex gap-4 md:gap-6 lg:gap-10 border-b border-gray-700 mb-6 overflow-x-auto whitespace-nowrap -mx-2 px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm md:text-base font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-yellow-400'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-8 overflow-auto max-h-[40vh] sm:max-h-[45vh] md:max-h-[30vh] scrollbar-transparent">
              {renderTabContent()}
            </div>

            {/* Schedule Section */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Schedule:-
              </h2>
              <div className="space-y-2">
                {scheduleLines.length > 0 ? (
                  scheduleLines.map((line, i) => (
                    <p key={i} className="text-gray-300 text-sm md:text-base">
                      {line}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-300 text-sm md:text-base">
                    No schedule available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
