'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Sponsors = () => {
  const sponsorshipData = {
    brochureLink:
      'https://drive.google.com/file/d/1I_fEpNLv4NBVH_fvOm2OR1sltqQD09Nj/view?usp=sharing',
    contactLink: '/contact',
  };

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleBrochureClick = () => {
    window.open(sponsorshipData.brochureLink, '_blank');
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 lg:py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/assets/events/bg.svg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CCA855]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#B60302]/10 rounded-full blur-3xl animate-pulse" />

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/50 to-transparent z-1" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Card */}
        <div className="relative group">
          {/* Animated Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#CCA855] via-[#FF003C] to-[#CCA855] rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition duration-500" />

          {/* Card Container */}
          <div className="relative bg-gradient-to-br from-[#2a1810] via-[#1a0a05] to-[#0a0000] rounded-3xl border-2 border-[#CCA855]/40 overflow-hidden backdrop-blur-sm">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-[#CCA855] rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-[#CCA855] rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-[#CCA855] rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-[#CCA855] rounded-br-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-16">
              {/* Left Side - Content */}
              <div className="flex flex-col justify-center space-y-8 lg:space-y-12">
                {/* Main Heading */}
                <h2 className="font-['Irish_Grover'] text-[32px] sm:text-[40px] lg:text-[50px] xl:text-[60px] leading-tight">
                  <span className="text-[#CCA855]">Interested</span>{' '}
                  <span className="text-white">in</span>
                  <br />
                  <span className="text-white">sponsoring this</span>
                  <br />
                  <span className="text-[#CCA855]">event?</span>
                </h2>

                {/* Links Section */}
                <div className="space-y-6">
                  {/* Brochure Link */}
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-4 h-4 rotate-45 bg-[#CCA855] transition-all duration-300 group-hover/item:scale-125 group-hover/item:bg-[#FF003C]" />
                    <button
                      onClick={handleBrochureClick}
                      onMouseEnter={() => setHoveredItem('brochure')}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="font-['Rajdhani'] text-[20px] lg:text-[24px] xl:text-[28px] text-white font-semibold transition-all duration-300 hover:text-[#CCA855] hover:translate-x-2"
                      style={{
                        textShadow:
                          hoveredItem === 'brochure'
                            ? '0px 0px 20px rgba(204, 168, 85, 0.8)'
                            : 'none',
                      }}
                    >
                      Brochure
                    </button>
                    <div
                      className={`h-[2px] flex-1 bg-gradient-to-r from-[#CCA855] to-transparent transition-all duration-300 ${
                        hoveredItem === 'brochure'
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    />
                  </div>

                  {/* Contact Us Link */}
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-4 h-4 rotate-45 bg-[#CCA855] transition-all duration-300 group-hover/item:scale-125 group-hover/item:bg-[#FF003C]" />
                    <Link
                      href={sponsorshipData.contactLink}
                      onMouseEnter={() => setHoveredItem('contact')}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="font-['Rajdhani'] text-[20px] lg:text-[24px] xl:text-[28px] text-white font-semibold transition-all duration-300 hover:text-[#CCA855] hover:translate-x-2"
                      style={{
                        textShadow:
                          hoveredItem === 'contact'
                            ? '0px 0px 20px rgba(204, 168, 85, 0.8)'
                            : 'none',
                      }}
                    >
                      Contact Us
                    </Link>
                    <div
                      className={`h-[2px] flex-1 bg-gradient-to-r from-[#CCA855] to-transparent transition-all duration-300 ${
                        hoveredItem === 'contact' ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Decorative Graphic */}
              <div className="flex items-center justify-center lg:justify-end relative">
                {/* Glow Effect Behind Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 lg:w-96 lg:h-96 bg-gradient-radial from-[#CCA855]/20 via-[#CCA855]/5 to-transparent rounded-full blur-2xl animate-pulse" />
                </div>

                {/* GOT Logo/Sword Graphic - You can replace this with your actual graphic */}
                <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full drop-shadow-[0_0_30px_rgba(204,168,85,0.6)]"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(204, 168, 85, 0.4))',
                    }}
                  >
                    {/* Sword */}
                    <g
                      className="animate-pulse"
                      style={{ animationDuration: '3s' }}
                    >
                      {/* Blade */}
                      <rect
                        x="97"
                        y="20"
                        width="6"
                        height="100"
                        fill="#d4d4d4"
                      />
                      <polygon points="100,15 95,20 105,20" fill="#d4d4d4" />

                      {/* Guard */}
                      <rect
                        x="80"
                        y="118"
                        width="40"
                        height="6"
                        fill="#CCA855"
                      />
                      <circle cx="80" cy="121" r="4" fill="#CCA855" />
                      <circle cx="120" cy="121" r="4" fill="#CCA855" />

                      {/* Handle */}
                      <rect
                        x="95"
                        y="124"
                        width="10"
                        height="30"
                        fill="#8B4513"
                        rx="2"
                      />

                      {/* Pommel */}
                      <circle cx="100" cy="158" r="8" fill="#CCA855" />
                      <circle cx="100" cy="158" r="4" fill="#FFD700" />
                    </g>

                    {/* Wings */}
                    <g
                      className="animate-pulse"
                      style={{
                        animationDuration: '4s',
                        animationDelay: '0.5s',
                      }}
                    >
                      {/* Left Wing */}
                      <path
                        d="M 80 121 Q 50 100, 30 110 Q 40 115, 50 120 Q 60 125, 70 123 Z"
                        fill="none"
                        stroke="#d4d4d4"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <path
                        d="M 75 121 Q 55 105, 40 112 Q 48 117, 58 121 Q 65 124, 72 122 Z"
                        fill="none"
                        stroke="#d4d4d4"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />

                      {/* Right Wing */}
                      <path
                        d="M 120 121 Q 150 100, 170 110 Q 160 115, 150 120 Q 140 125, 130 123 Z"
                        fill="none"
                        stroke="#d4d4d4"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <path
                        d="M 125 121 Q 145 105, 160 112 Q 152 117, 142 121 Q 135 124, 128 122 Z"
                        fill="none"
                        stroke="#d4d4d4"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                    </g>

                    {/* Decorative Circles */}
                    <circle
                      cx="100"
                      cy="121"
                      r="12"
                      fill="none"
                      stroke="#CCA855"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <circle
                      cx="100"
                      cy="121"
                      r="16"
                      fill="none"
                      stroke="#CCA855"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>
                </div>
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

export default Sponsors;
