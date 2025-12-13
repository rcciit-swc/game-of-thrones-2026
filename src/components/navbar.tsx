"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Configurable navigation links - edit href to match your routes
  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Teams", href: "/teams" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex justify-center px-4 py-2 z-50">
      {/* Navbar Container */}
      <div className="w-full max-w-100 h-16 lg:max-w-317 lg:h-26 rounded-[15px] bg-[linear-gradient(90deg,rgba(77,4,4,0.15),rgba(32,7,7,0.15))] shadow-[0_5px_25px_4px_#FF003C] backdrop-blur-[25px] px-4 lg:px-25.25 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/GOT_logo.png"
            alt="Game of Thrones Logo"
            width={117}
            height={156}
            className="w-20 h-17.5 lg:w-29.25 lg:h-39"
            priority
          />
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center gap-15">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-(family-name:--font-irish-grover) text-[#CCA855] text-[25px] hover:text-[#f5d68c] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Register Button - Desktop */}
        <Link href="/register" className="hidden lg:block w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-(family-name:--font-irish-grover) rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 text-center">
          Register
        </Link>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`w-7 h-0.5 bg-[#CCA855] transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-[#CCA855] transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-[#CCA855] transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden fixed top-35 left-0 right-0 mx-4 rounded-[15px] bg-[linear-gradient(90deg,rgba(77,4,4,0.95),rgba(32,7,7,0.95))] shadow-[0_5px_25px_4px_#FF003C] backdrop-blur-[25px] transition-all duration-300 overflow-hidden z-40 ${
          isMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-(family-name:--font-irish-grover) text-[#CCA855] text-[25px] hover:text-[#f5d68c] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/register" className="w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-(family-name:--font-irish-grover) rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 mt-2 text-center block">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
