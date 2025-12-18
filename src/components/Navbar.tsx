'use client';

import Image from 'next/image';
import Link from 'next/link';
import { userDataType } from '@/lib/types';
import { useState, Dispatch, SetStateAction, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/stores';
import { login } from '@/utils/functions/auth/login';
import { logout } from '@/utils/functions/auth/logout';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabase/client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, userLoading } = useUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  // Fetch user session only once on mount
  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user.user_metadata?.avatar_url) {
        setProfileImage(data.session.user.user_metadata.avatar_url);
      }
    };
    readUserSession();
  }, []);
  // Configurable navigation links - edit href to match your routes
  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Teams', href: '/teams' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex justify-center px-4 py-2 z-50">
      {/* Navbar Container */}
      <div className="w-full max-w-100 h-16 lg:max-w-317 lg:h-26 rounded-[15px] bg-[linear-gradient(90deg,rgba(77,4,4,0.15),rgba(32,7,7,0.15))] shadow-[0_5px_25px_4px_#FF003C] backdrop-blur-[25px] px-4 lg:px-25.25 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="https://i.postimg.cc/ns8zrs4m/GOT-logo.png"
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
              className="font-['Irish_Grover'] text-[#CCA855] text-[25px] hover:text-[#f5d68c] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Register Button - Desktop */}
        <div className="hidden lg:block">
          <SignInButton
            userData={userData}
            userLoading={userLoading}
            imageLoaded={imageLoaded}
            image={profileImage}
            setImageLoaded={setImageLoaded}
          />
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`w-7 h-0.5 bg-[#CCA855] transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-[#CCA855] transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-[#CCA855] transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden fixed top-35 left-0 right-0 mx-4 rounded-[15px] bg-[linear-gradient(90deg,rgba(77,4,4,0.95),rgba(32,7,7,0.95))] shadow-[0_5px_25px_4px_#FF003C] backdrop-blur-[25px] transition-all duration-300 overflow-hidden z-40 ${
          isMenuOpen ? 'max-h-[600px] opacity-100 py-8' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-['Irish_Grover'] text-[#CCA855] text-[25px] hover:text-[#f5d68c] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* User Specific Links and Section for Mobile */}
          {userData ? (
            <>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="font-['Irish_Grover'] text-[#CCA855] text-[25px] hover:text-[#f5d68c] transition-colors duration-200"
              >
                Profile
              </Link>

              <motion.div
                className="w-full px-6 pt-6 mt-4 border-t border-[#CCA855]/20 flex items-center justify-between"
                initial="closed"
                animate={isMenuOpen ? 'open' : 'closed'}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-[#CCA855]/50">
                    <AvatarImage src={profileImage || ''} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-[#B60302]/40 to-[#CCA855]/30 text-white text-md font-bold">
                      {userData.name
                        ? userData.name.charAt(0).toUpperCase()
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[#CCA855] font-medium truncate text-sm">
                    {userData.name || 'User'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-[#CCA855]" />
                </button>
              </motion.div>
            </>
          ) : (
            <motion.button
              variants={itemVariants}
              onClick={() => {
                login();
                setIsMenuOpen(false);
              }}
              className="w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-['Irish_Grover'] rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 mt-2 text-center block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}

// Memoized SignInButton
const SignInButton = memo(
  ({
    userData,
    userLoading,
    imageLoaded,
    image,
    setImageLoaded,
  }: {
    userData: userDataType | null;
    userLoading: boolean;
    imageLoaded: boolean;
    image: string | null;
    setImageLoaded: Dispatch<SetStateAction<boolean>>;
  }) => {
    if (userLoading) {
      return <Skeleton className="w-10 h-10 rounded-full bg-gray-600" />;
    }

    if (userData && image) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              className="group relative focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="relative h-10 w-10 transition-all ring-2 ring-pink-300/50 group-hover:ring-yellow-100/50">
                {!imageLoaded && (
                  <Skeleton className="absolute inset-0 h-10 w-10 rounded-full bg-white/20" />
                )}
                <AvatarImage
                  src={image}
                  alt="Profile"
                  onLoad={() => setImageLoaded(true)}
                  className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                <AvatarFallback className="bg-linear-to-br from-pink-200/40 to-yellow-100/30 text-white font-bold">
                  {!userLoading && userData?.name
                    ? userData.name.charAt(0).toUpperCase()
                    : ''}
                </AvatarFallback>
              </Avatar>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 w-48 rounded-lg border border-[#CCA855]/20 bg-black/60 backdrop-blur-xl shadow-[0_5px_25px_-5px_#FF003C]"
          >
            <DropdownMenuItem
              asChild
              className="cursor-pointer px-4 py-2 text-[#CCA855] font-['Irish_Grover'] transition-colors hover:bg-[#CCA855]/10 focus:bg-[#CCA855]/10 focus:text-[#f5d68c]"
            >
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 text-[#CCA855] font-['Irish_Grover'] transition-colors hover:bg-[#CCA855]/10 focus:bg-[#CCA855]/10 focus:text-[#f5d68c]"
              onSelect={logout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <motion.button
        onClick={login}
        className="relative w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-['Irish_Grover'] rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 mt-2 text-center block drop-shadow-text"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 15px rgba(255, 182, 193, 0.6)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        Register
        <span className="absolute -inset-0.5 rounded-full blur-md bg-pink-200/20 opacity-40"></span>
      </motion.button>
    );
  }
);

SignInButton.displayName = 'SignInButton';
