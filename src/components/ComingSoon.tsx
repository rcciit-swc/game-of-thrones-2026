'use client';
import Link from 'next/link';
import './coming-soon-animations.css';

// Pre-defined static particle positions to avoid hydration mismatch
const PARTICLES = [
  { left: '15%', top: '10%', animationDelay: '0s', animationDuration: '5s' },
  { left: '85%', top: '20%', animationDelay: '1s', animationDuration: '6s' },
  { left: '25%', top: '30%', animationDelay: '2s', animationDuration: '4s' },
  {
    left: '70%',
    top: '15%',
    animationDelay: '0.5s',
    animationDuration: '5.5s',
  },
  {
    left: '45%',
    top: '40%',
    animationDelay: '1.5s',
    animationDuration: '4.5s',
  },
  {
    left: '60%',
    top: '50%',
    animationDelay: '2.5s',
    animationDuration: '6.5s',
  },
  { left: '10%', top: '60%', animationDelay: '3s', animationDuration: '5s' },
  {
    left: '90%',
    top: '70%',
    animationDelay: '1.2s',
    animationDuration: '4.8s',
  },
  {
    left: '35%',
    top: '80%',
    animationDelay: '0.8s',
    animationDuration: '5.2s',
  },
  {
    left: '55%',
    top: '25%',
    animationDelay: '2.2s',
    animationDuration: '6.2s',
  },
  {
    left: '20%',
    top: '45%',
    animationDelay: '1.8s',
    animationDuration: '4.2s',
  },
  {
    left: '75%',
    top: '55%',
    animationDelay: '3.5s',
    animationDuration: '5.8s',
  },
  {
    left: '40%',
    top: '65%',
    animationDelay: '0.3s',
    animationDuration: '6.8s',
  },
  {
    left: '65%',
    top: '35%',
    animationDelay: '2.8s',
    animationDuration: '4.3s',
  },
  {
    left: '30%',
    top: '75%',
    animationDelay: '1.3s',
    animationDuration: '5.3s',
  },
  {
    left: '80%',
    top: '85%',
    animationDelay: '3.8s',
    animationDuration: '6.3s',
  },
  { left: '50%', top: '5%', animationDelay: '0.7s', animationDuration: '4.7s' },
  { left: '5%', top: '90%', animationDelay: '2.3s', animationDuration: '5.7s' },
  {
    left: '95%',
    top: '95%',
    animationDelay: '1.7s',
    animationDuration: '6.7s',
  },
  {
    left: '12%',
    top: '52%',
    animationDelay: '3.2s',
    animationDuration: '4.4s',
  },
];

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      {/* Animated background grid */}
      <div className="grid-background"></div>

      {/* Floating particles */}
      <div className="particles-container">
        {PARTICLES.map((particle, i) => (
          <div key={i} className="particle-dot" style={particle}></div>
        ))}
      </div>

      {/* Main content */}
      <div className="content-wrapper">
        {/* Glowing orb */}
        <div className="glow-orb"></div>

        {/* Coming Soon text with flicker effect */}
        <h1 className="coming-soon-title flicker-text">
          <span className="letter" style={{ animationDelay: '0s' }}>
            C
          </span>
          <span className="letter" style={{ animationDelay: '0.1s' }}>
            O
          </span>
          <span className="letter" style={{ animationDelay: '0.2s' }}>
            M
          </span>
          <span className="letter" style={{ animationDelay: '0.3s' }}>
            I
          </span>
          <span className="letter" style={{ animationDelay: '0.4s' }}>
            N
          </span>
          <span className="letter" style={{ animationDelay: '0.5s' }}>
            G
          </span>
          <span className="space"> </span>
          <span className="letter" style={{ animationDelay: '0.6s' }}>
            S
          </span>
          <span className="letter" style={{ animationDelay: '0.7s' }}>
            O
          </span>
          <span className="letter" style={{ animationDelay: '0.8s' }}>
            O
          </span>
          <span className="letter" style={{ animationDelay: '0.9s' }}>
            N
          </span>
        </h1>

        {/* Subtitle */}
        <p className="subtitle-text">Something mysterious is brewing...</p>

        {/* Animated dots */}
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* Back to home button */}
        <Link href="/" className="back-home-btn">
          <span className="btn-glow"></span>
          <span className="btn-text">Return Home</span>
        </Link>

        {/* Decorative elements */}
        <div className="decorative-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>
      </div>

      {/* Static TV noise overlay */}
      <div className="tv-static"></div>
    </div>
  );
};

export default ComingSoon;
