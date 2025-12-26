'use client';
import Image from 'next/image';
import Link from 'next/link';
import './hero-animations.css';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-8">
      {/* Floating particles - Stranger Things style - Hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 z-5 pointer-events-none">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Glittering stars - Hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 z-5 pointer-events-none">
        <div
          className="star star-small"
          style={{
            top: '10%',
            left: '15%',
            animationDuration: '3s',
            animationDelay: '0s',
          }}
        ></div>
        <div
          className="star star-medium"
          style={{
            top: '20%',
            left: '80%',
            animationDuration: '4s',
            animationDelay: '1s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '30%',
            left: '25%',
            animationDuration: '2.5s',
            animationDelay: '0.5s',
          }}
        ></div>
        <div
          className="star star-large"
          style={{
            top: '15%',
            left: '60%',
            animationDuration: '5s',
            animationDelay: '2s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '40%',
            left: '90%',
            animationDuration: '3.5s',
            animationDelay: '1.5s',
          }}
        ></div>
        <div
          className="star star-medium"
          style={{
            top: '50%',
            left: '10%',
            animationDuration: '4.5s',
            animationDelay: '0.8s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '60%',
            left: '70%',
            animationDuration: '3s',
            animationDelay: '2.5s',
          }}
        ></div>
        <div
          className="star star-large"
          style={{
            top: '70%',
            left: '40%',
            animationDuration: '5.5s',
            animationDelay: '1.2s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '80%',
            left: '85%',
            animationDuration: '2.8s',
            animationDelay: '0.3s',
          }}
        ></div>
        <div
          className="star star-medium"
          style={{
            top: '25%',
            left: '50%',
            animationDuration: '4.2s',
            animationDelay: '1.8s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '45%',
            left: '35%',
            animationDuration: '3.3s',
            animationDelay: '0.7s',
          }}
        ></div>
        <div
          className="star star-large"
          style={{
            top: '55%',
            left: '95%',
            animationDuration: '5.2s',
            animationDelay: '2.2s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '65%',
            left: '20%',
            animationDuration: '2.9s',
            animationDelay: '1.4s',
          }}
        ></div>
        <div
          className="star star-medium"
          style={{
            top: '75%',
            left: '65%',
            animationDuration: '4.8s',
            animationDelay: '0.6s',
          }}
        ></div>
        <div
          className="star star-small"
          style={{
            top: '85%',
            left: '45%',
            animationDuration: '3.7s',
            animationDelay: '2.8s',
          }}
        ></div>
      </div>

      {/* Static noise overlay - Hidden on mobile for performance */}
      <div className="hidden md:block static-noise z-5"></div>

      {/* Desktop background */}
      <div
        className="hidden md:block absolute inset-0 z-0 animate-electricPulse"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/6qy1WSTy/221a6168f28b25157f78e4fecce641e33c768db7.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Mobile background - No animations for better performance */}
      <div
        className="md:hidden absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/gkFKvhQx/Rectangle-24.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Base darkening overlay - Desktop only */}
      <div
        className="hidden md:block absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
        }}
      ></div>

      {/* Radial vignette - Desktop only */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_85%,rgba(0,0,0,0.7)_100%)]"></div>

      {/* Left branch (mirrored) */}
      <div
        className="absolute left-0 bottom-37 h-[18%] md:h-[38%] w-auto z-10 animate-floatMirror opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.3s' }}
      >
        <Image
          src="/assets/right-branch.svg"
          alt="Left branch"
          width={200}
          height={400}
          className="-scale-x-100 -scale-y-100 h-full w-auto opacity-90"
          priority
        />
      </div>

      {/* Right branch – hidden on mobile */}
      <div
        className="hidden md:block absolute right-0 bottom-90 h-[38%] w-auto z-10 animate-float opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.5s' }}
      >
        <Image
          src="/assets/right-branch.svg"
          alt="Right branch"
          width={200}
          height={400}
          className="h-full w-auto opacity-90"
          priority
        />
      </div>

      {/* RCC logo + text */}
      <div
        className="top-32 md:top-40 xl:top-30 2xl:top-32 text-center absolute z-20 opacity-0 animate-fadeInUp"
        style={{ animationDelay: '0.2s' }}
      >
        <h1 className="rcc-text">RCC Institute Of</h1>
        <div className="rcc-divider"></div>
        <Link
          href="https://rcciit.edu.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block cursor-pointer"
        >
          <Image
            src="/assets/rcc-logo.svg"
            width={70}
            height={70}
            alt="RCCIIT Logo"
            className="mx-auto drop-shadow-[0_0_15px_rgba(204,168,85,0.6)] hover:drop-shadow-[0_0_25px_rgba(204,168,85,0.8)] transition-all duration-300"
          />
        </Link>
        <div className="rcc-divider"></div>
        <h1 className="rcc-text">Information Technology</h1>
      </div>

      {/* Main block with original vertical spacing but horizontally centered */}
      <div className="absolute top-60 md:top-80 xl:top-66 2xl:top-70 left-1/2 -translate-x-1/2 z-20">
        <h1
          className="hidden md:block text-2xl md:text-3xl xl:text-xl 2xl:text-3xl font-bold text-center text-white drop-shadow-lg opacity-0 animate-fadeInUp"
          style={{ fontFamily: 'Rajdhani, sans-serif', animationDelay: '0.4s' }}
        >
          Presents
        </h1>

        <div
          className="w-115.5 h-14 text-center justify-start text-red-600 text-5xl md:text-6xl xl:text-4xl 2xl:text-6xl font-light mt-16 md:mt-2 xl:mt-0 2xl:mt-0 mb-8 md:mb-2 xl:mb-0 2xl:mb-2 opacity-0 animate-fadeInUp"
          style={{ fontFamily: 'Agency', animationDelay: '0.6s' }}
        >
          GAME OF{' '}
          <span
            className="animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, #ef4444, #ffffff, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THRONES
          </span>
        </div>

        {/* Mobile GOT block - Reduced animations for performance */}
        <div
          className="md:hidden absolute left-1/2 -translate-x-1/2 top-16 z-30 animate-fadeIn"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="relative ">
            {/* Small left branch on G (mobile) - No animation for performance */}
            <div
              className="absolute left-5 top-1.25 z-40 pointer-events-none"
              style={{ animationDelay: '1s' }}
            >
              <Image
                src="/assets/right-branch.svg"
                alt="Left branch"
                width={34}
                height={78}
                className="-scale-x-100 opacity-90"
                priority
              />
            </div>

            {/* Mobile GOT SVG */}
            <svg width="821.57" height="384" viewBox="0 0 822 384">
              <defs>
                <mask id="gotMaskMobile">
                  <rect width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="240"
                    fontWeight="bold"
                    fontFamily="Agency, Arial Black, sans-serif"
                  >
                    GOT
                  </text>
                </mask>
              </defs>

              <foreignObject
                width="150%"
                height="150%"
                x="-25%"
                y="-25%"
                mask="url(#gotMaskMobile)"
              >
                <div className="w-full h-full overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="min-w-full min-h-full object-cover"
                    style={{ transform: 'scale(1.2)' }}
                  >
                    <source src="/assets/fire.webm" type="video/webm" />
                  </video>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {/* Desktop GOT block */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-28 xl:top-4 2xl:top-18 z-30 animate-fadeIn animate-scaleGlow animate-flicker"
          style={{ animationDelay: '0.8s' }}
        >
          <svg width="821.57" height="384" viewBox="0 0 822 384">
            <defs>
              <mask id="gotMaskDesktop">
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="250"
                  fontWeight="bold"
                  fontFamily="Agency, Arial Black, sans-serif"
                  className="xl:text-[250px] 2xl:text-[290px]"
                >
                  GOT
                </text>
              </mask>
            </defs>

            <foreignObject
              width="150%"
              height="150%"
              x="-25%"
              y="-25%"
              mask="url(#gotMaskDesktop)"
            >
              <div className="w-full h-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="min-w-full min-h-full object-cover"
                  style={{ transform: 'scale(1.2)' }}
                >
                  <source src="/assets/fire.webm" type="video/webm" />
                </video>
              </div>
            </foreignObject>
          </svg>
        </div>

        <div
          className="text-center text-5xl md:text-7xl xl:text-5xl 2xl:text-7xl font-bold mt-56 md:mt-72 xl:mt-48 2xl:mt-64 opacity-0 animate-fadeInUp"
          style={{
            fontFamily: 'Agency',
            background: 'linear-gradient(90deg, #CCA855, #FF1B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animationDelay: '1s',
          }}
        >
          2026
        </div>

        {/* Event Dates Section */}
        <div
          className="text-center mt-4 md:mt-6 xl:mt-1 2xl:mt-2 px-4 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '1.2s' }}
        >
          {/* Decorative top divider */}
          <div className="flex items-center justify-center mb-3">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#CCA855]"></div>
            <div className="mx-3 w-1.5 h-1.5 rounded-full bg-[#CCA855] animate-pulse"></div>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#CCA855]"></div>
          </div>

          {/* Dates container */}
          <div className="inline-block bg-gradient-to-r from-transparent via-black/30 to-transparent px-6 py-0 rounded-lg backdrop-blur-sm border border-[#CCA855]/20">
            <div
              className="text-base md:text-xl xl:text-base 2xl:text-xl font-bold tracking-wide animate-shimmer"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background:
                  'linear-gradient(90deg, #CCA855, #FFD700, #CCA855, #FFD700, #CCA855)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(204, 168, 85, 0.4))',
              }}
            >
              10th-11th January
            </div>
            <div className="flex items-center justify-center mb-1">
              <div className="w-1 h-1 rounded-full bg-[#CCA855] mx-1"></div>
              <div className="w-1 h-1 rounded-full bg-[#FFD700] mx-1"></div>
              <div className="w-1 h-1 rounded-full bg-[#CCA855] mx-1"></div>
            </div>
            <div
              className="text-base md:text-xl xl:text-lg 2xl:text-xl font-bold tracking-wide animate-shimmer"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background:
                  'linear-gradient(90deg, #CCA855, #FFD700, #CCA855, #FFD700, #CCA855)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(204, 168, 85, 0.4))',
              }}
            >
              16th, 17th, 18th January 2026
            </div>
          </div>

          {/* Decorative bottom divider */}
          <div className="flex items-center justify-center mt-3">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#CCA855]"></div>
            <div className="mx-3 w-1.5 h-1.5 rounded-full bg-[#CCA855] animate-pulse"></div>
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#CCA855]"></div>
          </div>
        </div>

        {/* Register Button - Mobile only */}
        <div
          className="md:hidden flex justify-center mt-10 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '1.4s' }}
        >
          <Link
            href="/events"
            className="w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-['Irish_Grover'] rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 text-center animate-pulse"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
