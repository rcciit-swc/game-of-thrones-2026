'use client';

import Image from 'next/image';
import Link from 'next/link';
import { userDataType } from '@/lib/types';
import { useState, Dispatch, SetStateAction, useEffect, memo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/stores';
import { login } from '@/utils/functions/auth/login';
import { logout } from '@/utils/functions/auth/logout';
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
        <Link
          href="/register"
          className="hidden lg:block w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-['Irish_Grover'] rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 text-center"
        >
          Register
        </Link>
        <SignInButton
          userData={userData}
          userLoading={userLoading}
          imageLoaded={imageLoaded}
          image={profileImage}
          setImageLoaded={setImageLoaded}
        />

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
          isMenuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
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
          <Link
            href="/register"
            className="w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] font-['Irish_Grover'] rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 mt-2 text-center block"
          >
            Register
          </Link>
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
    const router = useRouter();

    if (userLoading) {
      return <Skeleton className="w-10 h-10 rounded-full bg-gray-600" />;
    }

    if (userData && image) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="group relative focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
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
              <AvatarFallback className="bg-gradient-to-br from-pink-200/40 to-yellow-100/30 text-white font-bold">
                {!userLoading && userData?.name
                  ? userData.name.charAt(0).toUpperCase()
                  : ''}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 w-48 rounded-lg border border-pink-200/20 bg-gradient-to-b from-pink-100/20 to-yellow-100/10 backdrop-blur-md shadow-xl"
          >
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 text-white/90 transition-colors hover:bg-pink-200/10"
              onSelect={() => router.push('/profile')}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-4 py-2 text-white/90 transition-colors hover:bg-pink-200/10"
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
        className="relative rounded-full px-5 py-2 text-base font-semibold text-pink-100 border border-pink-200/50 bg-white/10 hover:bg-pink-100/10 transition-all shadow-lg drop-shadow-text"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 15px rgba(255, 182, 193, 0.6)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
        <span className="absolute -inset-[2px] rounded-full blur-md bg-pink-200/20 opacity-40"></span>
      </motion.button>
    );
  }
);

SignInButton.displayName = 'SignInButton';
