'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useEvents } from '@/lib/stores';
import { supabase } from '@/lib/supabase/client';
import { EditProfileDialog } from './EditProfileDialog';
import type { events } from '@/lib/types';
import EventsCard from '@/components/profile/EventsCard';
import { toast } from 'sonner';
import { handleSaveChanges } from '@/utils/functions/profile/functions';
import ProfileSkeleton from './ProfileSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userData, userLoading, updateUserData, clearUserData } = useUser();
  const { eventsData } = useEvents();
  const [profileImage, setProfileImage] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [name, setName] = useState<string>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registeredEvents, setRegisteredEvents] = useState<events[]>([]);

  useEffect(() => {
    const cb = searchParams.get('callback');
    const onboarding = searchParams.get('onboarding');
    if (cb && onboarding !== 'true') {
      router.replace(cb);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (eventsData.length > 0) {
      setRegisteredEvents(eventsData.filter((event) => event.registered));
    }
  }, [eventsData]);

  useEffect(() => {
    if (searchParams.get('onboarding') === 'true') {
      setIsEditModalOpen(true);
      toast.info('Finish your profile first');
    }
  }, [searchParams]);

  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user.user_metadata) {
        const meta = data.session.user.user_metadata;
        setName(meta.full_name);
        setProfileImage(meta.avatar_url);
      }
    };
    readUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('sb-session');
    clearUserData();
    router.push('/');
  };

  const handleProfileSave = async (formData: FormData) => {
    await handleSaveChanges(formData, userData, updateUserData, () => {
      setIsEditModalOpen(false);
      const cb = searchParams.get('callback');
      if (cb) {
        router.replace(cb);
      }
    });
  };

  if (userLoading) return <ProfileSkeleton />;

  return (
    <div
      className="min-h-screen relative rajdhanifont"
      style={{
        backgroundImage: "url('/about/playerprofilebg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Navbar */}
      <Navbar />

      <main className="pt-40 md:pt-48 pb-8">
        {/* Player Profile Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center rajdhanifont font-bold text-[40px] md:text-[60px] text-white mb-8 md:mb-12 tracking-[-2.4px]"
        >
          Player Profile
        </motion.h1>

        {/* Profile Card Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="backdrop-blur-[12.95px] rounded-[24px] p-6 md:p-8 relative overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(168deg, rgba(0, 0, 0, 0.25) 5%, rgba(255, 255, 255, 0.25) 95%)',
            }}
          >
            {/* Desktop Layout */}
            <div className="hidden md:flex items-start gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="w-[200px] h-[200px] border-4 border-white/10">
                  {!imageLoaded && (
                    <Skeleton className="w-full h-full rounded-full absolute inset-0" />
                  )}
                  <AvatarImage
                    src={profileImage || '/default-avatar.png'}
                    alt={userData?.name || 'Profile'}
                    onLoad={() => setImageLoaded(true)}
                    className={imageLoaded ? 'block object-cover' : 'hidden'}
                  />
                  <AvatarFallback className="bg-muted text-white text-4xl rajdhanifont">
                    {userData?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* User Info */}
              <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-col gap-[7px] text-white text-center md:text-left">
                  <h2 className="rajdhanifont font-bold text-[36px] md:text-[48px] uppercase leading-tight">
                    {userData?.name || name}
                  </h2>
                  <p className="rajdhanifont font-medium text-[18px] md:text-[20px]">
                    {userData?.email}
                  </p>
                  <p className="rajdhanifont font-medium text-[18px] md:text-[20px]">
                    {userData?.phone}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="h-[50px] w-[135px] bg-[#dd5b1b] rounded-[15px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rajdhanifont font-semibold text-[#f2efe9] text-[20px] md:text-[21px] uppercase hover:bg-[#c94f15] transition-colors"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={handleLogout}
                    className="h-[50px] w-[135px] bg-[#f2efe9] rounded-[15px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rajdhanifont font-semibold text-black text-[20px] uppercase hover:bg-[#e0ddd7] transition-colors"
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col items-center md:hidden gap-6">
              {/* Avatar */}
              <Avatar className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] border-4 border-white/10">
                {!imageLoaded && (
                  <Skeleton className="w-full h-full rounded-full absolute inset-0" />
                )}
                <AvatarImage
                  src={profileImage || '/default-avatar.png'}
                  alt={userData?.name || 'Profile'}
                  onLoad={() => setImageLoaded(true)}
                  className={imageLoaded ? 'block object-cover' : 'hidden'}
                />
                <AvatarFallback className="bg-muted text-white text-4xl rajdhanifont">
                  {userData?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex flex-col gap-[7px] text-white text-center w-full max-w-[321px]">
                <h2 className="rajdhanifont font-bold text-[32px] md:text-[40px] uppercase leading-tight">
                  {userData?.name || name}
                </h2>
                <p className="rajdhanifont font-medium text-[18px] md:text-[20px]">
                  {userData?.email}
                </p>
                <p className="rajdhanifont font-medium text-[18px] md:text-[20px]">
                  {userData?.phone}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 w-full max-w-[287px]">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="h-[48px] w-full bg-[#dd5b1b] rounded-[15px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rajdhanifont font-semibold text-[#f2efe9] text-[21px] uppercase hover:bg-[#c94f15] transition-colors"
                >
                  EDIT
                </button>
                <button
                  onClick={handleLogout}
                  className="h-[50px] w-full bg-[#f2efe9] rounded-[15px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rajdhanifont font-semibold text-black text-[20px] uppercase hover:bg-[#e0ddd7] transition-colors"
                >
                  LOG OUT
                </button>
              </div>
            </div>
          </motion.div>

          {/* Registered Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 md:mt-24"
          >
            {/* Section Title */}
            <h2
              className="text-center rajdhanifont font-bold text-[40px] md:text-[60px] text-white mb-12 md:mb-16 decoration-4 underline-offset-8"
              style={{
                textShadow: '0px 0px 15px #b60302, 0px 3px 0px #ff003c',
              }}
            >
              Registered Events
            </h2>

            {/* Events Grid */}
            {registeredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
                {registeredEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full max-w-[398px]"
                  >
                    <EventsCard {...event} eventID={event.id!} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white rajdhanifont mt-6">
                <p className="text-lg md:text-xl mb-6">
                  You have not registered for any event. Register now!
                </p>
                <Button
                  className="bg-[#dd5b1b] hover:bg-[#c94f15] text-[#f2efe9] rajdhanifont font-semibold text-lg px-8 py-3 rounded-[15px]"
                  onClick={() => router.push('/events')}
                >
                  Browse Events
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <EditProfileDialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        userData={userData}
        profileImage={profileImage}
        onSave={handleProfileSave}
        name={name}
      />
    </div>
  );
}
