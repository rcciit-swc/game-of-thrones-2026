'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/stores';
import { login } from '@/utils/functions/auth/login';
import { logout } from '@/utils/functions/auth/logout';

interface RegistrationBtnProps {
  eventId: string;
}

const RegistrationBtn: React.FC<RegistrationBtnProps> = ({ eventId }) => {
  const router = useRouter();

  // adjust these names to EXACTLY what your store exposes
  const { userData, userLoading } = useUser();

  const handleRegister = async () => {
    if (userLoading) {
      // e.g. toast.info('Please wait while we check your login status');
      return;
    }

    if (!userData) {
      await login();
      return;
    }

    if (
      !userData.phone ||
      !userData.name ||
      userData.phone.trim() === '' ||
      userData.name.trim() === ''
    ) {
      router.push(
        `/profile?onboarding=true&callback=${encodeURIComponent(
          `/events/${eventId}`
        )}`
      );
      return;
    }

    // if you have eventData / team logic, put it here
    router.push(`/events/${eventId}/register`);
  };

  return (
    <div className="flex">
      <motion.button
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={handleRegister}
        className="w-42 py-2.5 bg-[#B60302] text-[#FAFAFA] text-[20px] cursor-pointer font-['Irish_Grover'] rounded-[50px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] hover:bg-[#8f0202] transition-colors duration-200 text-center animate-pulse"
      >
        Register Now
      </motion.button>
    </div>
  );
};

export default RegistrationBtn;
