'use client';

import React from 'react';
import Image from 'next/image';

const PrincipalsDesk = () => {
  const principalData = {
    speech: `Life is big – achieving perfection in academic or technical domain is important for professional success in life. But that is not all; one must look for opportunities to explore life beyond that. The young undergrads are having lot of energy and spirit within them which needs expression in different forms. After entering the college, while enjoying the adulthood for the first time in life, a student gets some reprieve from the pressure of
      competitive academics and gets time and
      freedom to nurture his/her talent in sports, arts, performing arts, innovations and all.
      <br />
      <br />
      The college fests provide the real platform to showcase their talents and unleash their energy - their youthful exuberance.
      Game of Thrones (GoT) – the annual sports fest of RCCIIT is one such platform created and traditionally supported by RCCIIT. Members of the Student Welfare
      Committee along with hundreds of senior and junior student volunteers have come up and are working together under the careful guidance of senior faculty members to make the 2026version of GoT a grand success. From last year GoT  has taken up a big challenge by scaling it up to
      the extent of Inter-College Sports Meet attracting participants from Kolkata, other Districts and even other States. This time also it will be a multi-tournament event organized at multiple venues within and outside college. Cricket, Football, Badminton and other sports competitions at college level are now
      fewer in numbers compared to earlier days. Trendy games like gully cricket, futsal are
      more popular which doesn't hold the traditional spirit of the on-field games. Moreover, it is observed that students are now more inclined towards digital games, which is
      detrimental to their mental and physical health. This is one reason why RCCIIT has put lot of emphasis on games and sports. By accommodating traditional versions of the games in GoT and making those open for all, we believe it will uphold the true spirit of
      games and sports and foster sportsmanship, positivity and friendship among the students. 
      <br />
      <br />
      I wish all success of this mega event and hope it will be even better organized this year, particularly considering the institute's silver jubilee celebration year 2026. I also expect better participation and competition this time.`,
    signL1: 'Prof.(Dr.) Anirban Mukherjee',
    signL2: 'Principal (Officiating) RCCIIT & Professor, IT, RCCIIT',
    img: 'https://i.imgur.com/QNCJB8M.png',
    header: "Principal's Desk",
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 lg:py-24">
      {/* Background Image - Similar to Events Page */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('/assets/events/bg.svg')",
        }}
      />

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B60302]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CCA855]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/50 to-transparent z-1" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="font-['Irish_Grover'] text-[35px] lg:text-[60px] text-[#CCA855] mb-4 uppercase"
            style={{
              textShadow: '0px 0px 20px rgba(204, 168, 85, 0.5)',
            }}
          >
            {principalData.header}
          </h2>
          <div className="flex items-center justify-center gap-4 w-full max-w-[500px] mx-auto">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#FF003C] to-[#CCA855]" />
            <div className="w-3 h-3 rotate-45 bg-[#CCA855]" />
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#FF003C] to-[#CCA855]" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center gap-8">
            {/* Principal Image - Mobile */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#B60302] via-[#FF003C] to-[#CCA855] rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <Image
                  src={principalData.img}
                  alt="Principal"
                  width={280}
                  height={350}
                  className="rounded-3xl object-cover border-4 border-black"
                  priority
                />
              </div>
            </div>

            {/* Message Card - Mobile */}
            <div className="relative w-full">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#B60302]/50 via-[#FF003C]/30 to-[#CCA855]/50 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border-2 border-[#CCA855]/30 p-6 backdrop-blur-sm">
                <div className="mb-4">
                  <p className="font-['Rajdhani'] text-[24px] text-[#CCA855] font-semibold italic">
                    Dear students,
                  </p>
                </div>
                <div
                  className="font-['Rajdhani'] text-[12px] text-[#F2EFE9] leading-relaxed text-justify mb-6"
                  dangerouslySetInnerHTML={{ __html: principalData.speech }}
                />
                <div className="text-right">
                  <p className="font-['Rajdhani'] text-[12px] text-[#CCA855] font-bold leading-snug">
                    {principalData.signL1}
                  </p>
                  <p className="font-['Rajdhani'] text-[12px] text-[#d6bc93] font-medium">
                    {principalData.signL2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start gap-12 xl:gap-16">
            {/* Message Card - Desktop */}
            <div className="flex-1 relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#B60302]/50 via-[#FF003C]/30 to-[#CCA855]/50 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl border-2 border-[#CCA855]/30 p-8 xl:p-10 backdrop-blur-sm">
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l-[3px] border-t-[3px] border-[#CCA855] rounded-tl-2xl" />
                <div className="absolute top-4 right-4 w-12 h-12 border-r-[3px] border-t-[3px] border-[#CCA855] rounded-tr-2xl" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-l-[3px] border-b-[3px] border-[#CCA855] rounded-bl-2xl" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-[3px] border-b-[3px] border-[#CCA855] rounded-br-2xl" />

                <div className="mb-6">
                  <p
                    className="font-['Rajdhani'] text-[32px] xl:text-[36px] text-[#CCA855] font-semibold italic"
                    style={{
                      textShadow: '0px 0px 15px rgba(204, 168, 85, 0.4)',
                    }}
                  >
                    Dear students,
                  </p>
                </div>
                <div
                  className="font-['Rajdhani'] text-[12px] text-[#F2EFE9] leading-relaxed text-justify mb-8"
                  dangerouslySetInnerHTML={{ __html: principalData.speech }}
                />
                <div className="text-right mt-8">
                  <p
                    className="font-['Rajdhani'] text-[12px] text-[#CCA855] font-bold leading-snug mb-1"
                    style={{
                      textShadow: '0px 0px 10px rgba(204, 168, 85, 0.3)',
                    }}
                  >
                    {principalData.signL1}
                  </p>
                  <p className="font-['Rajdhani'] text-[12px] text-[#d6bc93] font-medium">
                    {principalData.signL2}
                  </p>
                </div>
              </div>
            </div>

            {/* Principal Image - Desktop */}
            <div className="relative flex-shrink-0 group">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#B60302] via-[#FF003C] to-[#CCA855] rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative">
                <Image
                  src={principalData.img}
                  alt="Principal"
                  width={380}
                  height={480}
                  className="rounded-3xl object-cover border-4 border-black shadow-2xl"
                  priority
                />
                {/* Decorative Frame */}
                <div className="absolute inset-0 rounded-3xl border-2 border-[#CCA855]/50 pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[#CCA855] rounded-br-3xl opacity-50" />
                <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[#CCA855] rounded-tl-3xl opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#CCA855]" />
            <div className="w-2 h-2 rotate-45 bg-[#CCA855] animate-pulse" />
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#CCA855] via-[#FF003C] to-[#CCA855]" />
            <div className="w-2 h-2 rotate-45 bg-[#CCA855] animate-pulse" />
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#CCA855]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalsDesk;
