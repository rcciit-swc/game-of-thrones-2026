"use client";

import Image from "next/image";

// Sports images data - 10 images positioned around the circle
const sportsImages = [
  { id: 1, src: "/assest/pics/Ellipse 3.svg", alt: "Sport 1" },
  { id: 2, src: "/assest/pics/Ellipse 4.svg", alt: "Sport 2" },
  { id: 3, src: "/assest/pics/Ellipse 5.svg", alt: "Sport 3" },
  { id: 4, src: "/assest/pics/Ellipse 6.svg", alt: "Sport 4" },
  { id: 5, src: "/assest/pics/Ellipse 7.svg", alt: "Sport 5" },
  { id: 6, src: "/assest/pics/Ellipse 8.svg", alt: "Sport 6" },
  { id: 7, src: "/assest/pics/Ellipse 9.svg", alt: "Sport 7" },
  { id: 8, src: "/assest/pics/Ellipse 10.svg", alt: "Sport 8" },
  { id: 9, src: "/assest/pics/Ellipse 11.svg", alt: "Sport 9" },
  { id: 10, src: "/assest/pics/Ellipse 12.svg", alt: "Sport 10" },
];

const PlaygroundArena = () => {
  // Calculate position for each image on the circle using trigonometry
  const getImagePosition = (index: number) => {
    // 10 images, 36 degrees apart, starting from top (-90 degrees)
    const angleInDegrees = -90 + (index * 36);
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    // Radius is midpoint between inner (500px radius) and outer (600px radius) rings = 550px
    const radius = 550;
    
    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);
    
    return { x, y };
  };

  return (
    <section className="arena-section">
      {/* Background */}
      <div className="arena-background">
        <Image
          src="/assest/background/Rectangle 23.png"
          alt="Arena Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="arena-content">
        {/* Title & Subtitle */}
        <div className="arena-title">
          <Image
            src="/assest/font/Frame 20.svg"
            alt="The Playground Arena"
            width={600}
            height={120}
            className="title-image"
            priority
          />
          <p className="arena-subtitle">CHOOSE YOUR BATTLEGROUND</p>
        </div>

        {/* Circle Arena Container */}
        <div className="circle-arena-container">
          {/* Outer Ring - Ellipse 1 (STATIC - CSS Border Only) */}
          <div className="ellipse-ring ellipse-outer"></div>

          {/* Inner Ring - Ellipse 2 (STATIC - CSS Border Only) */}
          <div className="ellipse-ring ellipse-inner"></div>

          {/* Rotating Container for Sports Images */}
          <div className="sports-images-container">
            {sportsImages.map((sport, index) => {
              const { x, y } = getImagePosition(index);
              return (
                <div
                  key={sport.id}
                  className="sport-image-wrapper"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <div className="sport-image">
                    <Image
                      src={sport.src}
                      alt={sport.alt}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Quote */}
          <div className="center-quote">
            <p className="quote-text">
              &quot;DON&apos;T COUNT THE DAYS, MAKE THE DAYS COUNT.&quot;
            </p>
            <p className="quote-author">— MUHAMMAD ALI</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .arena-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          overflow: hidden;
        }

        .arena-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .arena-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          min-height: 100vh;
        }

        .arena-title {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-image {
          width: 100%;
          max-width: 600px;
          height: auto;
        }

        .arena-subtitle {
          color: #F2EFE9;
          text-align: center;
          font-family: var(--font-rajdhani), 'Rajdhani', sans-serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 8px;
        }

        .circle-arena-container {
          position: relative;
          width: 1200px;
          height: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ellipse-ring {
          position: absolute;
          border-radius: 50%;
          border: 5px solid #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          /* STATIC - No rotation */
        }

        .ellipse-outer {
          width: 1200px;
          height: 1200px;
        }

        .ellipse-inner {
          width: 1000px;
          height: 1000px;
        }

        .sports-images-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: rotateClockwise 50s linear infinite;
        }

        @keyframes rotateClockwise {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes counterRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        .sport-image-wrapper {
          position: absolute;
          width: 150px;
          height: 150px;
          transform: translate(-50%, -50%);
          animation: counterRotate 50s linear infinite;
        }

        .sport-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: lightgray 50% / cover no-repeat, #d9d9d9;
          overflow: hidden;
          position: relative;
        }

        .center-quote {
          position: absolute;
          width: 758px;
          max-width: 90%;
          text-align: center;
          z-index: 10;
        }

        .quote-text {
          color: #f2efe9;
          text-align: center;
          font-family: var(--font-rajdhani), "Rajdhani", sans-serif;
          font-size: 25px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          margin: 0;
        }

        .quote-author {
          color: #f2efe9;
          text-align: center;
          font-family: var(--font-rajdhani), "Rajdhani", sans-serif;
          font-size: 25px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* Laptop Responsive - 1024px to 1440px */
        @media (max-width: 1440px) {
          .circle-arena-container {
            width: 1000px;
            height: 1000px;
          }

          .ellipse-outer {
            width: 1000px;
            height: 1000px;
          }

          .ellipse-inner {
            width: 800px;
            height: 800px;
          }

          .sport-image-wrapper,
          .sport-image {
            width: 125px;
            height: 125px;
          }

          .quote-text,
          .quote-author {
            font-size: 22px;
          }

          .center-quote {
            width: 600px;
          }

          .arena-subtitle {
            font-size: 16px;
            letter-spacing: 1.5px;
          }
        }

        /* Tablet Responsive - 768px to 1024px */
        @media (max-width: 1024px) {
          .circle-arena-container {
            width: 700px;
            height: 700px;
          }

          .ellipse-outer {
            width: 700px;
            height: 700px;
          }

          .ellipse-inner {
            width: 560px;
            height: 560px;
          }

          .sport-image-wrapper,
          .sport-image {
            width: 90px;
            height: 90px;
          }

          .title-image {
            max-width: 450px;
          }

          .arena-subtitle {
            font-size: 14px;
            letter-spacing: 1px;
          }

          .quote-text,
          .quote-author {
            font-size: 18px;
            letter-spacing: 1px;
          }

          .center-quote {
            width: 450px;
          }
        }

        /* Mobile Responsive - below 768px */
        @media (max-width: 768px) {
          .arena-content {
            padding: 20px 10px;
          }

          .arena-title {
            margin-bottom: 20px;
          }

          .title-image {
            max-width: 300px;
          }

          .circle-arena-container {
            width: 450px;
            height: 450px;
          }

          .ellipse-outer {
            width: 450px;
            height: 450px;
            border-width: 3px;
          }

          .ellipse-inner {
            width: 360px;
            height: 360px;
            border-width: 3px;
          }

          .sport-image-wrapper,
          .sport-image {
            width: 70px;
            height: 70px;
          }

          .quote-text,
          .quote-author {
            font-size: 12px;
            letter-spacing: 0.5px;
          }

          .center-quote {
            width: 250px;
          }

          .arena-subtitle {
            font-size: 12px;
            letter-spacing: 0.5px;
            margin-top: 6px;
          }
        }

        /* Small Mobile - below 480px */
        @media (max-width: 480px) {
          .title-image {
            max-width: 250px;
          }

          .arena-subtitle {
            font-size: 10px;
            letter-spacing: 0.3px;
            margin-top: 4px;
          }

          .circle-arena-container {
            width: 320px;
            height: 320px;
          }

          .ellipse-outer {
            width: 320px;
            height: 320px;
            border-width: 2px;
          }

          .ellipse-inner {
            width: 256px;
            height: 256px;
            border-width: 2px;
          }

          .sport-image-wrapper,
          .sport-image {
            width: 50px;
            height: 50px;
          }

          .quote-text,
          .quote-author {
            font-size: 10px;
            letter-spacing: 0.3px;
          }

          .center-quote {
            width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlaygroundArena;
