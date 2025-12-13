'use client'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-14.5 md:pt-30"
        >
            {/* Desktop background */}
            <div
                className="hidden md:block absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('https://i.postimg.cc/6qy1WSTy/221a6168f28b25157f78e4fecce641e33c768db7.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            />

            {/* Mobile background */}
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
            <div className="absolute left-0 bottom-37 h-[18%] md:h-[38%] w-auto z-10">
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
            <div className="hidden md:block absolute right-0 bottom-90 h-[38%] w-auto z-10">
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
            <div className="top-32 md:top-40 text-center absolute uppercase scale-80 font-['Helvetica']">
                <h1 className="text-xs">RCC Institute Of</h1>
                <Image
                    src="/assets/rcc-logo.svg"
                    width={70}
                    height={70}
                    alt="RCCIIT Logo"
                    className="mx-auto my-1"
                />
                <h1 className="text-xs">Information Technology</h1>
            </div>

            {/* Main block with original vertical spacing but horizontally centered */}
            <div className="absolute top-60 md:top-80 left-1/2 -translate-x-1/2 z-20">
                <h1
                    className="text-2xl md:text-3xl lg:text-3xl font-bold text-center text-white drop-shadow-lg"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                    Presents
                </h1>

                <div
                    className="w-115.5 h-14 text-center justify-start text-red-600 text-5xl md:text-6xl font-light mt-7 md:mt-2 mb-8 md:mb-2"
                    style={{ fontFamily: 'var(--font-agency)' }}
                >
                    GAME OF{' '}
                    <span
                        style={{
                            background: 'linear-gradient(90deg, #ef4444, #ffffff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        THRONES
                    </span>
                </div>

                {/* Mobile GOT block */}
                <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-22 z-20">
                    <div className="relative ">

                        {/* Small left branch on G (mobile) */}
                        <div className="absolute left-5 top-1.25 z-40 pointer-events-none">
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
                                        fontSize="280"
                                        fontWeight="bold"
                                        fontFamily="var(--font-agency), Arial Black, sans-serif"
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
                                        <source src="/assets/fire.mp4" type="video/mp4" />
                                    </video>
                                </div>
                            </foreignObject>
                        </svg>

                    </div>
                </div>

                {/* Desktop GOT block */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-35 z-20">
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
                                    fontSize="360"
                                    fontWeight="bold"
                                    fontFamily="var(--font-agency), Arial Black, sans-serif"
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
                                    <source src="/assets/fire.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </foreignObject>
                    </svg>
                </div>

                {/* 2025/2026 below GOT */}
                <div
                    className="text-center text-6xl md:text-8xl font-bold mt-70  md:mt-85 "
                    style={{
                        fontFamily: 'var(--font-agency)',
                        background: 'linear-gradient(90deg, #CCA855, #FF1B35)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    2026
                </div>

                {/* Register Button - Mobile only */}
                <div className="md:hidden flex justify-center mt-10">
                    <Link href="/register" className="w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-(family-name:--font-irish-grover) rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 text-center">
                        Register
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default Hero
