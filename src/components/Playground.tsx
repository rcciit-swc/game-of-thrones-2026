'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEvents } from '@/lib/stores';
import { hallOfFameImages } from '@/lib/constants/images';
import { get_events_by_fest } from '@/utils/functions/eventsUtils';
import Link from 'next/link';
const Autocarsoule = dynamic(() => import('./Autocarsoule'), { ssr: false });
import './playground-animations.css';

const Playground = () => {
  const imageSize = 20; // size of orbiting images (% of ring)
  const orbitRadius = 45; // radius from center (%)
  const [events, setEvents] = useState<any[]>([]); // Initialize with fallbackImages
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const festId = '5bff3a43-43b6-420a-8d42-9a96257cc351'; // GOT fest ID
        const data = await get_events_by_fest(festId);

        if (data && data.length > 0) {
          // Map events to the format needed for display
          const mappedEvents = data
            .slice(0, 10)
            .map((event: any, index: number) => ({
              id: event.id,
              src: event.image_url || '/assest/pics/Ellipse 7.svg',
              alt: event.name || `Event ${index + 1}`,
              name: event.name,
              angle: index * 36, // Distribute evenly around circle
            }));
          setEvents(mappedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute bottom-0 rotate-180 left-0 w-full h-185 bg-gradient-to-b from-black via-black/20 to-transparent z-2" />
      <section className="top-10 w-full min-h-full flex flex-col items-center pb-28 relative">
        {/* Mobile/Tablet Background (< lg) */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage: "url('/assest/background/bg_res.svg')",
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Desktop Background (>= lg) */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: "url('/assest/background/Rectangle 23.png')",
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="pointer-events-none absolute top-0 left-0 w-full h-185 bg-gradient-to-b from-black via-black/20 to-transparent z-2" />
        {/* Content */}
        <div className="relative mt-60 lg:mt-70 z-10 flex flex-col items-center w-full  px-4">
          {/* ================= MOBILE TITLE ================= */}
          <div className="lg:hidden w-full flex justify-center mb-6">
            <Image
              src="/assest/font/Frame 20.svg"
              alt="The Playground Arena"
              width={500}
              height={100}
              className="w-full max-w-[500px] h-auto -translate-y-20"
            />
          </div>

          {/* ================= DESKTOP TITLE (UNCHANGED) ================= */}
          <div className="hidden lg:block w-[1000px] mb-5">
            <Image
              src="/assest/font/Frame 20.svg"
              alt="The Playground Arena"
              width={550}
              height={100}
              className="w-full h-auto"
            />
          </div>

          {/* ================= AUTOCAROUSEL (Mobile/Tablet) ================= */}
          <div className="lg:hidden w-full px-4 relative top-10">
            <Autocarsoule events={events} loading={loading} />
          </div>

          {/* ================= MOON ANCHOR (Laptop+) ================= */}
          <div
            className="top-30 hidden lg:flex relative items-center justify-center w-[90vw] max-w-[700px] lg:max-w-[750px] xl:max-w-[900px] 2xl:max-w-[1100px] aspect-square mx-auto "
            style={{
              marginTop: '10px',
            }}
          >
            {/* Outer Ring - Ellipse 1 */}
            <div className="absolute inset-0">
              <Image
                src="/assest/circle/Ellipse 1.svg"
                alt="Outer Ring"
                fill
                className="object-contain"
              />
            </div>

            {/* Inner Ring - Ellipse 2 */}
            <div className="absolute inset-0 flex items-center justify-center scale-[0.85]">
              <Image
                src="/assest/circle/Ellipse 2.svg"
                alt="Inner Ring"
                fill
                className="object-contain"
              />
            </div>

            {/* Orbiting Images - Dynamic Events */}
            {!loading &&
              events.map((event, index) => {
                const angleRad = ((event.angle - 90) * Math.PI) / 180;
                const x = 50 + orbitRadius * Math.cos(angleRad);
                const y = 50 + orbitRadius * Math.sin(angleRad);

                const discContent = (
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden border-[3px] border-transparent
                  bg-gradient-to-br from-[#B60302] via-[#FF003C] to-[#CCA855] p-[3px]
                  hover:scale-110 hover:shadow-2xl hover:shadow-[#CCA855]/50
                  transition-all duration-300 cursor-pointer
                  ${index % 2 === 0 ? 'rotate-slow' : 'rotate-medium'}
                  ${index % 3 === 0 ? 'rotate-reverse' : ''}
                `}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                      <Image
                        src={event.src}
                        alt={event.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Impressive hover overlay */}
                      {event.name && (
                        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#B60302]/80 to-black/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm rounded-full">
                          <div className="text-center px-2 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                            <p className="text-white text-[10px] lg:text-xs xl:text-sm font-bold leading-tight mb-1 animate-pulse">
                              {event.name}
                            </p>
                            <div className="h-0.5 w-8 mx-auto bg-gradient-to-r from-transparent via-[#CCA855] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
                          </div>
                          {/* Animated corner accents (adjusted for circular shape) */}
                          <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-[#CCA855] rounded-tl-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                          <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-[#CCA855] rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                          <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-[#CCA855] rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                          <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-[#CCA855] rounded-br-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                        </div>
                      )}
                    </div>
                  </div>
                );

                return (
                  <div
                    key={event.id || index}
                    className="absolute group"
                    style={{
                      width: `${imageSize}%`,
                      height: `${imageSize}%`,
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {event.id && typeof event.id === 'string' ? (
                      <Link href={`/events/${event.id}`}>{discContent}</Link>
                    ) : (
                      discContent
                    )}
                  </div>
                );
              })}

            {/* Center Quote */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-[15%] pointer-events-none">
              <div>
                <p className="text-[#F2EFE9] text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] font-bold uppercase tracking-wide leading-tight">
                  "DON'T COUNT THE DAYS, MAKE THE DAYS COUNT."
                </p>
                <p className="text-[#F2EFE9] text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] mt-3 font-bold uppercase tracking-wide">
                  — MUHAMMAD ALI
                </p>
              </div>
            </div>
          </div>
          {/* ================================================= */}
        </div>

        {/* ================= HALL OF FAME SECTION ================= */}
        <div
          id="hall-of-fame"
          className="relative z-10 flex flex-col items-center w-full px-4 mt-20 lg:mt-64 mb-20"
        >
          {/* Title Section */}
          <div className="flex flex-col items-center gap-4 lg:gap-6 mb-12 lg:mb-16">
            <h2 className="font-['Irish_Grover'] text-[30px] lg:text-[60px] text-[#CCA855] text-center leading-normal uppercase">
              HALL OF FAME
            </h2>
            <div className="flex items-center justify-center gap-4 w-full max-w-[500px]">
              <div className="hidden lg:block h-[1px] w-24 bg-gradient-to-r from-transparent to-[#FF003C]" />
              <p className="font-['Rajdhani'] font-medium text-[#F2EFE9] text-[18px] lg:text-[20px] text-center uppercase tracking-[1.4px] whitespace-nowrap">
                Immortalized Moments of Glory
              </p>
              <div className="hidden lg:block h-[1px] w-24 bg-gradient-to-l from-transparent to-[#FF003C]" />
            </div>
          </div>

          {/* Mobile Gallery - Creative Stacked Cards */}
          <div className="lg:hidden w-full max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-3">
              {hallOfFameImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl border-2 border-[#CCA855]/30 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                    index % 3 === 0 ? 'col-span-2 h-48' : 'h-40'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <Image
                    src={image}
                    alt={`Hall of Fame ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 border-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                  {/* Corner Accents */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-lg" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Gallery - Advanced Masonry Grid */}
          <div className="hidden lg:block w-full max-w-7xl mx-auto">
            <div className="columns-4 gap-4 space-y-4">
              {hallOfFameImages.map((image, index) => (
                <div
                  key={index}
                  className="relative break-inside-avoid mb-4 group cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.03}s`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-[#CCA855]/30 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                    <div
                      className={`relative ${
                        index % 5 === 0
                          ? 'h-80'
                          : index % 5 === 1
                            ? 'h-64'
                            : index % 5 === 2
                              ? 'h-96'
                              : index % 5 === 3
                                ? 'h-72'
                                : 'h-56'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Hall of Fame ${index + 1}`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Hover Border Glow */}
                      <div className="absolute inset-0 border-2 border-[#CCA855] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl shadow-[0_0_30px_rgba(204,168,85,0.6)]" />

                      {/* Corner Accents */}
                      <div className="absolute top-3 left-3 w-8 h-8 border-l-[3px] border-t-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-tl-lg" />
                      <div className="absolute top-3 right-3 w-8 h-8 border-r-[3px] border-t-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-tr-lg" />
                      <div className="absolute bottom-3 left-3 w-8 h-8 border-l-[3px] border-b-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-bl-lg" />
                      <div className="absolute bottom-3 right-3 w-8 h-8 border-r-[3px] border-b-[3px] border-[#CCA855] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 rounded-br-lg" />

                      {/* Center Glow Effect */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 rounded-full bg-[#CCA855]/20 blur-xl animate-pulse" />
                      </div>

                      {/* Image Number Badge */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <div className="px-3 py-1 bg-gradient-to-r from-[#B60302] to-[#8f0202] rounded-full border border-[#CCA855]/50 backdrop-blur-sm">
                          <span className="text-[#CCA855] text-xs font-bold rajdhanifont">
                            GOT {new Date().getFullYear() - 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= REGISTER NOW SECTION ================= */}
        <div className="relative z-10 flex justify-center w-auto -mx-2 mt-12 lg:mt-24 lg:mx-0 pb-5">
          <Image
            src="/about/Lucid_Origin_Design_a_REGISTER_NOW_calltoaction_image_that_mat_2 2.png"
            alt="Register Now"
            width={800}
            height={300}
            className="w-full lg:w-[800px] h-auto object-contain hover:scale-105 transition-transform cursor-pointer"
          />
        </div>
      </section>
    </>
  );
};

export default Playground;
