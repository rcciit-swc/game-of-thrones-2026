"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      className="w-full bg-center bg-cover relative overflow-hidden"
      style={{ 
        backgroundImage: "url('/assets/footer.png')"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col justify-between relative min-h-[600px]">
        {/* Crown + GOT 2026 - Mobile Only */}
        <div className="lg:hidden flex flex-col items-center space-y-3 mb-8">
          {/* Crown SVG - Clear with glow */}
          <div className="w-[58px] h-[42px]" style={{ filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.9)) drop-shadow(0 0 20px rgba(204,168,85,0.8))' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="42" viewBox="0 0 58 42" fill="none">
              <path d="M27.492 2.69025C27.6071 2.4812 27.7762 2.30687 27.9816 2.18546C28.1871 2.06405 28.4213 2 28.66 2C28.8986 2 29.1329 2.06405 29.3383 2.18546C29.5438 2.30687 29.7129 2.4812 29.828 2.69025L37.7 17.6343C37.8877 17.9803 38.1497 18.2805 38.4672 18.5132C38.7847 18.746 39.1498 18.9056 39.5363 18.9805C39.9227 19.0555 40.321 19.0439 40.7025 18.9467C41.084 18.8495 41.4392 18.669 41.7427 18.4183L53.148 8.64759C53.3669 8.46951 53.6367 8.3655 53.9185 8.35052C54.2004 8.33554 54.4797 8.41037 54.7162 8.56424C54.9528 8.71811 55.1345 8.94308 55.2351 9.20676C55.3357 9.47044 55.35 9.75924 55.276 10.0316L47.7186 37.3543C47.5644 37.9134 47.232 38.4069 46.772 38.7602C46.312 39.1134 45.7493 39.307 45.1693 39.3116H12.1533C11.5729 39.3075 11.0096 39.1142 10.549 38.7609C10.0884 38.4077 9.75571 37.9138 9.60132 37.3543L2.04665 10.0343C1.97265 9.76191 1.98698 9.47311 2.08756 9.20943C2.18815 8.94574 2.3698 8.72078 2.60639 8.56691C2.84297 8.41304 3.12227 8.33821 3.40409 8.35319C3.68591 8.36816 3.95571 8.47218 4.17465 8.65025L15.5773 18.4209C15.8808 18.6717 16.236 18.8522 16.6175 18.9494C16.999 19.0466 17.3972 19.0582 17.7837 18.9832C18.1702 18.9083 18.5353 18.7487 18.8528 18.5159C19.1702 18.2831 19.4323 17.983 19.62 17.6369L27.492 2.69025Z" stroke="#CCA855" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[#F2EFE9] font-rajdhani text-[18px] font-semibold leading-[22px] border-b border-[#CCA855] pb-1">
            GOT 2026
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: The Trials Map */}
          <div className="space-y-4 lg:space-y-5 text-center lg:text-left">
            <h3 className="text-[#00F0FF] font-rajdhani text-[18px] lg:text-[22px] font-bold leading-[22px] lg:leading-[26px] tracking-[2.2px] uppercase mb-4">
              The Trials Map
            </h3>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link 
                  href="/legacy" 
                  className="text-[#F2EFE9] font-rajdhani text-[14px] lg:text-[18px] font-medium leading-[20px] lg:leading-[24px] hover:text-[#CCA855] transition-colors duration-200"
                >
                  Legacy
                </Link>
              </li>
              <li>
                <Link 
                  href="/events" 
                  className="text-[#F2EFE9] font-rajdhani text-[14px] lg:text-[18px] font-medium leading-[20px] lg:leading-[24px] hover:text-[#CCA855] transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="/hall-of-fame" 
                  className="text-[#F2EFE9] font-rajdhani text-[14px] lg:text-[18px] font-medium leading-[20px] lg:leading-[24px] hover:text-[#CCA855] transition-colors duration-200"
                >
                  Hall of Fame
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: War Room Contacts */}
          <div className="space-y-4 lg:space-y-5 text-center lg:text-left">
            <h3 className="text-[#00F0FF] font-rajdhani text-[18px] lg:text-[22px] font-bold leading-[22px] lg:leading-[26px] tracking-[2.2px] uppercase mb-4">
              War Room Contacts
            </h3>
            <div className="space-y-4 lg:space-y-5">
              {/* Contact 1 */}
              <div className="space-y-2">
                <p className="text-[#F2EFE9] font-rajdhani text-[16px] lg:text-[18px] font-medium leading-[20px] lg:leading-[24px]">
                  ABC KUMAR
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[rgba(242,239,233,0.65)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[18px] lg:leading-[20px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>+91 XXX XXX XXXX</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[rgba(242,239,233,0.65)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[18px] lg:leading-[20px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>abc@got2026.com</span>
                  </div>
                </div>
              </div>

              {/* Contact 2 */}
              <div className="space-y-2">
                <p className="text-[#F2EFE9] font-rajdhani text-[16px] lg:text-[18px] font-medium leading-[20px] lg:leading-[24px]">
                  XYZ SHARMA
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[rgba(242,239,233,0.65)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[18px] lg:leading-[20px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>+91 XXX XXX XXXX</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[rgba(242,239,233,0.65)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[18px] lg:leading-[20px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span>xyz@got2025.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: The Iron Bank */}
          <div className="space-y-4 lg:space-y-5 text-center lg:text-left">
            <h3 className="text-[#00F0FF] font-rajdhani text-[18px] lg:text-[22px] font-bold leading-[22px] lg:leading-[26px] tracking-[2.2px] uppercase mb-4">
              The Iron Bank
            </h3>
            <div className="space-y-4 lg:space-y-6">
              {/* Funded By */}
              <div>
                <p className="text-[#F2EFE9] font-rajdhani text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:leading-[22px] mb-2">
                  Funded By
                </p>
                <p className="text-[rgba(242,239,233,0.75)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[16px] lg:leading-[20px]">
                  RCCIIT Student Welfare<br/>Committee
                </p>
              </div>

              {/* Technical Credits */}
              <div>
                <p className="text-[#F2EFE9] font-rajdhani text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:leading-[22px] mb-2">
                  Technical Credits
                </p>
                <p className="text-[rgba(242,239,233,0.75)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[16px] lg:leading-[20px]">
                  GOT Technical Team 2026
                </p>
              </div>

              {/* Special Thanks */}
              <div>
                <p className="text-[#F2EFE9] font-rajdhani text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:leading-[22px] mb-2">
                  Special Thanks
                </p>
                <p className="text-[rgba(242,239,233,0.75)] font-rajdhani text-[12px] lg:text-[14px] font-normal leading-[16px] lg:leading-[20px]">
                  All participating colleges
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Crown + Quotes - Desktop Only */}
          <div className="hidden lg:flex flex-col items-start justify-start space-y-6">
            <div className="w-[80px] h-[80px]" style={{ filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.95)) drop-shadow(0 0 25px rgba(204,168,85,0.9))' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 58 42" fill="none" className="w-full h-full">
                <path d="M27.492 2.69025C27.6071 2.4812 27.7762 2.30687 27.9816 2.18546C28.1871 2.06405 28.4213 2 28.66 2C28.8986 2 29.1329 2.06405 29.3383 2.18546C29.5438 2.30687 29.7129 2.4812 29.828 2.69025L37.7 17.6343C37.8877 17.9803 38.1497 18.2805 38.4672 18.5132C38.7847 18.746 39.1498 18.9056 39.5363 18.9805C39.9227 19.0555 40.321 19.0439 40.7025 18.9467C41.084 18.8495 41.4392 18.669 41.7427 18.4183L53.148 8.64759C53.3669 8.46951 53.6367 8.3655 53.9185 8.35052C54.2004 8.33554 54.4797 8.41037 54.7162 8.56424C54.9528 8.71811 55.1345 8.94308 55.2351 9.20676C55.3357 9.47044 55.35 9.75924 55.276 10.0316L47.7186 37.3543C47.5644 37.9134 47.232 38.4069 46.772 38.7602C46.312 39.1134 45.7493 39.307 45.1693 39.3116H12.1533C11.5729 39.3075 11.0096 39.1142 10.549 38.7609C10.0884 38.4077 9.75571 37.9138 9.60132 37.3543L2.04665 10.0343C1.97265 9.76191 1.98698 9.47311 2.08756 9.20943C2.18815 8.94574 2.3698 8.72078 2.60639 8.56691C2.84297 8.41304 3.12227 8.33821 3.40409 8.35319C3.68591 8.36816 3.95571 8.47218 4.17465 8.65025L15.5773 18.4209C15.8808 18.6717 16.236 18.8522 16.6175 18.9494C16.999 19.0466 17.3972 19.0582 17.7837 18.9832C18.1702 18.9083 18.5353 18.7487 18.8528 18.5159C19.1702 18.2831 19.4323 17.983 19.62 17.6369L27.492 2.69025Z" stroke="#CCA855" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <p className="text-[rgba(242,239,233,0.65)] font-rajdhani text-[14px] font-normal leading-[20px] italic">
                  &quot;Mischief Managed.&quot;
                </p>
                <p className="text-[rgba(242,239,233,0.65)] font-rajdhani text-[14px] font-normal leading-[20px] italic">
                  &quot;Valar Morghulis.&quot;
                </p>
              </div>
              <p className="text-[#F2EFE9] font-rajdhani text-[18px] font-semibold leading-[22px]">
                GOT 2026
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Strip */}
        <div className="border-t border-[rgba(242,239,233,0.2)] pt-6 lg:pt-8 mt-8 lg:mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 lg:gap-4 text-[rgba(242,239,233,0.75)] font-rajdhani text-[12px] lg:text-[14px] leading-[18px] lg:leading-[20px]">
            <p className="text-center md:text-left">© 2026 GOT Sports Fest. All rights reserved.</p>
            <div className="flex gap-4 lg:gap-6">
              <Link href="/privacy" className="hover:text-[#CCA855] transition-colors duration-200">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-[#CCA855] transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
