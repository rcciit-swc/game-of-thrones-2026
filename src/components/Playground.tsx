'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
const Autocarsoule = dynamic(() => import('./Autocarsoule'), { ssr: false });
import './playground-animations.css';

// Sports images with positions (10 images, 36° apart)
const sportsImages = [
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

  return (
    <>
      <div className="pointer-events-none absolute bottom-0 rotate-180 left-0 w-full h-185 bg-gradient-to-b from-black via-black/20 to-transparent z-2" />
      <section className="top-10 w-full min-h-full flex flex-col items-center pb-120 relative">
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
            backgroundImage: "url('/assest/background/Rectangle 23.svg')",
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="pointer-events-none absolute top-0 left-0 w-full h-185 bg-gradient-to-b from-black via-black/20 to-transparent z-2" />
        {/* Content */}
        <div className="relative top-60 lg:top-70  z-10 flex flex-col items-center w-full  px-4">
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
            <Autocarsoule />
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

            {/* Orbiting Images */}
            {sportsImages.map((sport, index) => {
              const angleRad = ((sport.angle - 90) * Math.PI) / 180;
              const x = 50 + orbitRadius * Math.cos(angleRad);
              const y = 50 + orbitRadius * Math.sin(angleRad);

              return (
                <div
                  key={sport.id}
                  className="absolute"
                  style={{
                    width: `${imageSize}%`,
                    height: `${imageSize}%`,
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden border-[3px] border-white/80
                    ${index % 2 === 0 ? 'rotate-slow' : 'rotate-medium'}
                    ${index % 3 === 0 ? 'rotate-reverse' : ''}
                  `}
                  >
                    <Image
                      src={sport.src}
                      alt={sport.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
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
      </section>
    </>
  );
};

export default Playground;
