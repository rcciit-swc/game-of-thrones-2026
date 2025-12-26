'use client';

import React from 'react';
import Image from 'next/image';

const Partners = () => {
  // Add your partner logos here
  const partners = [
    {
      id: 1,
      name: 'Students Welfare Committee',
      logo: 'https://i.postimg.cc/T2zJ56bK/swc.png',
      tier: 'Organising Partner',
    },
    {
      id: 2,
      name: 'RCCIIT Alumni Association',
      logo: 'https://i.postimg.cc/QtPC9fKF/alumni.png',
      tier: 'Organising Partner',
    },
    // {
    //     id: 3,
    //     name: 'Sports Authority of India, Kolkata',
    //     logo: 'https://i.postimg.cc/1tyLQFmQ/image.png',
    //     tier: 'Venue Partner',
    // },
  ];

  const getTierStyle = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'border-[#E5E4E2] shadow-[0_0_30px_rgba(229,228,226,0.4)]';
      case 'gold':
        return 'border-[#CCA855] shadow-[0_0_25px_rgba(204,168,85,0.4)]';
      case 'silver':
        return 'border-[#C0C0C0] shadow-[0_0_20px_rgba(192,192,192,0.3)]';
      default:
        return 'border-[#CCA855]';
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-16 lg:py-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('/assets/events/bg.svg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CCA855]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B60302]/10 rounded-full blur-3xl animate-pulse"
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
            Our Partners
          </h2>
          <div className="flex items-center justify-center gap-4 w-full max-w-[500px] mx-auto">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#FF003C] to-[#CCA855]" />
            <div className="w-3 h-3 rotate-45 bg-[#CCA855]" />
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#FF003C] to-[#CCA855]" />
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="relative group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Animated Border Glow */}
              <div
                className={`absolute -inset-1 ${getTierStyle(partner.tier)} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`}
              />

              {/* Partner Card */}
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border-2 border-[#CCA855]/30 p-6 backdrop-blur-sm h-full flex flex-col items-center justify-between transition-all duration-300 group-hover:border-[#CCA855]/60 group-hover:scale-105 min-h-[220px]">
                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-10 h-10 border-l-2 border-t-2 border-[#CCA855]/50 rounded-tl-xl transition-all duration-300 group-hover:border-[#CCA855]" />
                <div className="absolute top-2 right-2 w-10 h-10 border-r-2 border-t-2 border-[#CCA855]/50 rounded-tr-xl transition-all duration-300 group-hover:border-[#CCA855]" />
                <div className="absolute bottom-2 left-2 w-10 h-10 border-l-2 border-b-2 border-[#CCA855]/50 rounded-bl-xl transition-all duration-300 group-hover:border-[#CCA855]" />
                <div className="absolute bottom-2 right-2 w-10 h-10 border-r-2 border-b-2 border-[#CCA855]/50 rounded-br-xl transition-all duration-300 group-hover:border-[#CCA855]" />

                {/* Tier Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#CCA855]/50 rounded-full shadow-lg transition-all duration-300 group-hover:border-[#CCA855] group-hover:shadow-[0_0_15px_rgba(204,168,85,0.5)]">
                  <span className="font-['Rajdhani'] text-[11px] text-[#CCA855] uppercase font-bold tracking-wider">
                    {partner.tier}
                  </span>
                </div>

                {/* Logo Container */}
                <div className="relative w-full flex-1 flex items-center justify-center pt-4 pb-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={100}
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Partner Name */}
                <div className="w-full text-center pt-3 border-t border-[#CCA855]/20">
                  <h3 className="font-['Rajdhani'] text-[16px] lg:text-[18px] text-[#F2EFE9] font-semibold transition-all duration-300 group-hover:text-[#CCA855]">
                    {partner.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
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

export default Partners;
