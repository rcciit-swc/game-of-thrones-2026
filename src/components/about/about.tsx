import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Desktop Layout */}
      <div className="hidden lg:block relative w-full h-[881px] max-w-[1920px] mx-auto">
        {/* Background Image */}
        <div className="absolute w-full h-[860px] left-0 top-0">
          <Image
            src="/about/aboutbackground.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* THE LEGACY Title */}
        <h2
          className="absolute left-[61px] top-[90px] w-[195px] h-[42px] font-[family-name:var(--font-irish-grover)] text-[35px] text-[#cca855] underline"
          style={{
            textUnderlinePosition: 'from-font',
            fontStyle: 'normal',
            lineHeight: 'normal',
          }}
        >
          THE LEGACY
        </h2>

        {/* Main Heading */}
        <h1 className="absolute left-[50px] top-[150px] w-[806px] max-w-[56vw] font-[family-name:var(--font-roboto-condensed)] font-bold text-[135px] text-[#f2efe9] leading-[125px] whitespace-pre-wrap">
          OVERLORD SINCE{`\n`}1999
        </h1>

        {/* Description Text */}
        <div className="absolute left-[56px] top-[551px] w-[507px] max-w-[35vw] font-[family-name:var(--font-rajdhani)] text-[20px] text-[#d6bc93] leading-normal">
          <p className="mb-0">
            For over two decades, GOT has been the ultimate battleground where
            champions are forged and legends are born.
            <br />
            <br />
          </p>
          <p className="mb-0">
            Through blood, sweat, and glory, we've witnessed the rise of
            countless warriors who dared to claim their throne in the arena of
            champions.
          </p>
        </div>

        {/* Call to Action */}
        <p
          className="absolute left-[56px] top-[760px] w-[592px] max-w-[41vw] h-[68px] font-[family-name:var(--font-rajdhani)] font-semibold text-[45px] text-[#cca855] leading-normal whitespace-nowrap"
          style={{
            textShadow: '0px 0px 35px #cca855, 0px 0px 15px #cca855',
          }}
        >
          YOUR TURN TO MAKE HISTORY
        </p>

        {/* GOT Logo Image - Responsive positioning and sizing */}
        <div className="absolute right-0 top-[90px] h-[738px] w-1/2 pointer-events-none">
          <Image
            src="/about/check2.png"
            alt="GOT Game of Thrones"
            fill
            className="object-contain object-right"
            priority
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden relative w-full h-auto min-h-screen">
        {/* Background Image for Mobile */}
        <div className="absolute left-0 top-[10%] w-full h-full z-0">
          <Image
            src="/about/aboutbackground.png"
            alt=""
            fill
            className="object-cover object-center opacity-100"
            priority
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col items-center pt-12 pb-12 px-4">
          {/* THE LEGACY Title */}
          <h2
            className="w-full text-center font-[family-name:var(--font-irish-grover)] text-[35px] text-[#cca855] underline mb-6"
            style={{
              textUnderlinePosition: 'from-font',
              fontStyle: 'normal',
              lineHeight: '1',
            }}
          >
            THE LEGACY
          </h2>

          {/* Main Heading */}
          <h1 className="w-full text-center font-[family-name:var(--font-roboto-condensed)] font-bold text-[30px] sm:text-[35px] text-[#f2efe9] leading-tight mb-0 whitespace-nowrap">
            OVERLORD SINCE 1999
          </h1>

          {/* Image Container - Check2.png Centered */}
          <div className="relative w-full max-w-[350px] h-[400px] mb-0">
            <Image
              src="/about/check2.png"
              alt="GOT Game of Thrones"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Description Text */}
          <div className="w-full max-w-[380px] text-center font-[family-name:var(--font-rajdhani)] text-[18px] text-[#d6bc93] leading-snug mb-8">
            <p className="mb-4">
              For over two decades, GOT has been the ultimate battleground where
              champions are forged and legends are born.
            </p>
            <p>
              Through blood, sweat, and glory, we've witnessed the rise of
              countless warriors who dared to claim their throne in the arena of
              champions.
            </p>
          </div>

          {/* Call to Action */}
          <p
            className="w-full text-center font-[family-name:var(--font-rajdhani)] font-semibold text-[24px] text-[#cca855] leading-normal"
            style={{
              textShadow: '0px 0px 35px #cca855, 0px 0px 15px #cca855',
            }}
          >
            YOUR TURN TO MAKE HISTORY
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
