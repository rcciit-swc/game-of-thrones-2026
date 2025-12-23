'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { get_events_by_fest } from '@/utils/functions/eventsUtils';
import Link from 'next/link';
const Autocarsoule = dynamic(() => import('./Autocarsoule'), { ssr: false });
import './playground-animations.css';

// Fallback sports images (used if no events found)
const fallbackImages = [
  { id: 1, src: '/assest/pics/Ellipse 7.svg', alt: 'Sport 1', angle: 0 },
  { id: 2, src: '/assest/pics/Ellipse 8.svg', alt: 'Sport 2', angle: 36 },
  { id: 3, src: '/assest/pics/Ellipse 3.svg', alt: 'Sport 3', angle: 72 },
  { id: 4, src: '/assest/pics/Ellipse 4.svg', alt: 'Sport 4', angle: 108 },
  { id: 5, src: '/assest/pics/Ellipse 9.svg', alt: 'Sport 5', angle: 144 },
  { id: 6, src: '/assest/pics/Ellipse 10.svg', alt: 'Sport 6', angle: 180 },
  { id: 7, src: '/assest/pics/Ellipse 11.svg', alt: 'Sport 7', angle: 216 },
  { id: 8, src: '/assest/pics/Ellipse 12.svg', alt: 'Sport 8', angle: 252 },
  { id: 9, src: '/assest/pics/Ellipse 5.svg', alt: 'Sport 9', angle: 288 },
  { id: 10, src: '/assest/pics/Ellipse 6.svg', alt: 'Sport 10', angle: 324 },
];

const Playground = () => {
  const imageSize = 20; // size of orbiting images (% of ring)
  const orbitRadius = 45; // radius from center (%)
  const [events, setEvents] = useState<any[]>(fallbackImages); // Initialize with fallbackImages
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const festId = 'a4bc08e4-9af9-4212-8d32-cd88d2437f18'; // GOT fest ID
        const data = await get_events_by_fest(festId);

        if (data && data.length > 0) {
          // Map events to the format needed for display
          const mappedEvents = data
            .slice(0, 10)
            .map((event: any, index: number) => ({
              id: event.id,
              src:
                event.image_url ||
                fallbackImages[index]?.src ||
                '/assest/pics/Ellipse 7.svg',
              alt: event.name || `Event ${index + 1}`,
              name: event.name,
              angle: index * 36, // Distribute evenly around circle
            }));
          setEvents(mappedEvents);
        } else {
          setEvents(fallbackImages);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(fallbackImages);
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
              width={420}
              height={80}
              className="w-full max-w-[420px] h-auto -translate-y-20"
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
        <div className="relative z-10 flex flex-col items-center w-full px-4 mt-20 lg:mt-64">
          {/* Title Section */}
          <div className="flex flex-col items-center gap-4 lg:gap-6 mb-8 lg:mb-12">
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

          {/* Mobile Gallery (Using Percentage Positioning) */}
          <div className="lg:hidden relative w-full max-w-[440px] aspect-[440/704] mx-auto">
            {/* Image 1 - Top Center */}
            {/* left: 126/440=28.6%, top: 135/704=19.1%, w: 192/440=43.6%, h: 94/704=13.3% */}
            <div className="absolute left-[28.6%] top-[19.1%] w-[43.6%] h-[13.3%]">
              <div className="relative w-full h-full border-[3px] border-black">
                <Image
                  src="/hall of fame/SAM_6680.JPG" //
                  alt="Hall of Fame 1"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 2 - Middle Left */}
            {/* left: 91/440=20.6%, top: 461/704=65.4%, w: 121/440=27.5%, h: 76/704=10.8% */}
            <div className="absolute left-[20.6%] top-[65.4%] w-[27.5%] h-[10.8%]">
              <div className="relative w-full h-full border-[3px] border-black">
                <Image
                  src="/hall of fame/SAM_6726.JPG"
                  alt="Hall of Fame 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 3 - Bottom Center Left */}
            {/* left: 169/440=38.4%, top: 537/704=76.2%, w: 102/440=23.1%, h: 92/704=13% */}
            <div className="absolute left-[38.4%] top-[76.2%] w-[23.1%] h-[13%] border-[3px] border-black">
              <Image
                src="/hall of fame/SAM_7148.JPG"
                alt="Hall of Fame 3"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 4 - Center Left */}
            {/* left: 67/440=15.2%, top: 338/704=48%, w: 136/440=30.9%, h: 123/704=17.4% */}
            <div className="absolute left-[15.2%] top-[48%] w-[30.9%] h-[17.4%] border-[3px] border-black">
              <Image
                src="/hall of fame/SAM_7160.JPG"
                alt="Hall of Fame 4"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 5 - Upper Center Left */}
            {/* left: 102/440=23.1%, top: 229/704=32.5%, w: 118/440=26.8%, h: 109/704=15.4% */}
            <div className="absolute left-[23.1%] top-[32.5%] w-[26.8%] h-[15.4%] border-[3px] border-black">
              <Image
                src="/hall of fame/SAM_7409.JPG"
                alt="Hall of Fame 5"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 6 - Top Right */}
            {/* left: 178/440=40.4%, top: 58/704=8.2%, w: 83/440=18.8%, h: 77/704=10.9% */}
            <div className="absolute left-[40.4%] top-[8.2%] w-[18.8%] h-[10.9%]">
              <div className="relative w-full h-full border-[3px] border-black">
                <Image
                  src="/hall of fame/_SUB1964.JPG" //
                  alt="Hall of Fame 6"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 7 - Upper Center Right */}
            {/* left: 220/440=50%, top: 229/704=32.5%, w: 118/440=26.8%, h: 109/704=15.4% */}
            <div className="absolute left-[50%] top-[32.5%] w-[26.8%] h-[15.4%]">
              <div className="relative w-full h-full border-[3px] border-black">
                <Image
                  src="/hall of fame/_SUB2044.JPG"
                  alt="Hall of Fame 7"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 8 - Center Right */}
            {/* left: 203/440=46.1%, top: 338/704=48%, w: 165/440=37.5%, h: 123/704=17.4% */}
            <div className="absolute left-[46.1%] top-[48%] w-[37.5%] h-[17.4%]">
              <div className="relative w-full h-full border-[3px] border-black">
                <Image
                  src="/hall of fame/_SUB2592.JPG"
                  alt="Hall of Fame 8"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image 9 - Middle Right */}
            {/* left: 210/440=47.7%, top: 461/704=65.4%, w: 102/440=23.1%, h: 76/704=10.8% */}
            <div className="absolute left-[47.7%] top-[65.4%] w-[23.1%] h-[10.8%] border-[3px] border-black">
              <Image
                src="/hall of fame/_SUB2630.JPG"
                alt="Hall of Fame 9"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Desktop Gallery (Using Percentage Positioning) */}
          <div className="hidden lg:block relative w-full max-w-[1420px] aspect-[1420/1523] mx-auto">
            {/* Row 1 - Top */}
            {/* left: 518/1420=36.4%, top: 47/1523=3%, w: 328/1420=23%, h: 160/1523=10.5% */}
            <div className="absolute left-[36.4%] top-[3%] w-[23%] h-[10.5%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/_SUB3705.JPG"
                  alt="Hall of Fame Top"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 2 - Check for overlap and relative pos */}
            {/* Image: left 682/1420=48%, top 203/1523=13.3%, w 235/1420=16.5%, h 217/1523=14.2% */}
            <div className="absolute left-[48%] top-[13.3%] w-[16.5%] h-[14.2%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/_SUB3870.JPG"
                  alt="Hall of Fame"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image: left 447/1420=31.4%, top 203/1523=13.3%, w 235/1420=16.5%, h 217/1523=14.2% */}
            <div className="absolute left-[31.4%] top-[13.3%] w-[16.5%] h-[14.2%] border-[5px] border-black">
              <Image
                src="/hall of fame/_SUB4149.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Row 3 */}
            {/* Image: left 311/1420=21.9%, top 419/1523=27.5%, w 242/1420=17%, h 218/1523=14.3% */}
            <div className="absolute left-[21.9%] top-[27.5%] w-[17%] h-[14.3%] border-[5px] border-black">
              <Image
                src="/hall of fame/_SUB4248.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Image: left 553/1420=38.9%, top 420/1523=27.5%, w 285/1420=20%, h 212/1523=13.9% */}
            <div className="absolute left-[38.9%] top-[27.5%] w-[20%] h-[13.9%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/_SUB4533.JPG"
                  alt="Hall of Fame"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image: left 838/1420=59%, top 419/1523=27.5%, w 242/1420=17%, h 218/1523=14.3% */}
            <div className="absolute left-[59%] top-[27.5%] w-[17%] h-[14.3%] border-[5px] border-black">
              <Image
                src="/hall of fame/_SUB4784.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Row 4 */}
            {/* Image: left 553/1420=38.9%, top 632/1523=41.4%, w 285/1420=20%, h 231/1523=15.1% */}
            <div className="absolute left-[38.9%] top-[41.4%] w-[20%] h-[15.1%] border-[5px] border-black">
              <Image
                src="/hall of fame/_SUB4798.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Row 5 */}
            {/* Image: left 203/1420=14.2%, top 637/1523=41.8%, w 350/1420=24.6%, h 220/1523=14.4% */}
            <div className="absolute left-[14.2%] top-[41.8%] w-[24.6%] h-[14.4%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/_SUB4818.JPG"
                  alt="Hall of Fame"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image: left 838/1420=59%, top 637/1523=41.8%, w 350/1420=24.6%, h 220/1523=14.4% */}
            <div className="absolute left-[59%] top-[41.8%] w-[24.6%] h-[14.4%] border-[5px] border-black">
              <Image
                src="/hall of fame/SAI_1279 (1).JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Row 6 */}
            {/* Image: left 311/1420=21.9%, top 857/1523=56.2%, w 242/1420=17%, h 218/1523=14.3% */}
            <div className="absolute left-[21.9%] top-[56.2%] w-[17%] h-[14.3%] border-[5px] border-black">
              <Image
                src="/hall of fame/SAI_1477.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Image: left 553/1420=38.9%, top 863/1523=56.6%, w 285/1420=20%, h 212/1523=13.9% */}
            <div className="absolute left-[38.9%] top-[56.6%] w-[20%] h-[13.9%] border-[5px] border-black">
              <Image
                src="/hall of fame/SAI_2633.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Image: left 838/1420=59%, top 857/1523=56.2%, w 242/1420=17%, h 218/1523=14.3% */}
            <div className="absolute left-[59%] top-[56.2%] w-[17%] h-[14.3%] border-[5px] border-black">
              <Image
                src="/hall of fame/SAI_9676.JPG"
                alt="Hall of Fame"
                fill
                className="object-cover"
              />
            </div>

            {/* Row 7 */}
            {/* Image: left 447/1420=31.4%, top 1075/1523=70.5%, w 235/1420=16.5%, h 217/1523=14.2% */}
            <div className="absolute left-[31.4%] top-[70.5%] w-[16.5%] h-[14.2%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/SAI_9700.JPG"
                  alt="Hall of Fame"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image: left 682/1420=48%, top 1075/1523=70.5%, w 235/1420=16.5%, h 217/1523=14.2% */}
            <div className="absolute left-[48%] top-[70.5%] w-[16.5%] h-[14.2%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/SAM_6049.JPG"
                  alt="Hall of Fame"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 8 - Bottom */}
            {/* Image: left 518/1420=36.4%, top 1292/1523=84.8%, w 328/1420=23%, h 160/1523=10.5% */}
            <div className="absolute left-[36.4%] top-[84.8%] w-[23%] h-[10.5%]">
              <div className="relative w-full h-full border-[5px] border-black">
                <Image
                  src="/hall of fame/SAM_6060.JPG"
                  alt="Hall of Fame Bottom"
                  fill
                  className="object-cover"
                />
              </div>
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
