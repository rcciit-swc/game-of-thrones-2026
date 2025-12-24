'use client';
import type { Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import {
  User,
  Phone,
  Mail,
  Users,
  Edit,
  Trash2,
  CreditCard,
  Crown,
  Check,
  Loader2,
} from 'lucide-react';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

interface ViewTeamMembersProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  teamMembers: TeamMember[];
  teamLeadData?: any;
  onEditMember: (index: number) => void;
  onEditTeamLead: () => void;
  confirmTeam: () => void;
  onRemoveMember: (index: number) => void;
  showConfirmTeam: boolean;
  registerLoading: boolean;
  isFree: boolean;
}

export function ViewTeamMembers({
  isOpen,
  onOpenChange,
  teamMembers,
  onEditMember,
  teamLeadData,
  onEditTeamLead,
  onRemoveMember,
  confirmTeam,
  registerLoading,
  showConfirmTeam,
  isFree,
}: ViewTeamMembersProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const memberVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const Content = () => (
    <div className="mt-6 font-antolia tracking-widest">
      {/* Team Lead Card with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#FF003C]/20 rounded-xl blur-sm"></div>
        <div className="bg-[#090B0D] border-2 border-[#FF003C]/30 rounded-xl p-5 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FF003C] rounded-full p-0.5">
              <div className="bg-[#090B0D] rounded-full p-2">
                <Crown size={24} className="text-[#CCA855]" />
              </div>
            </div>
            <h3 className="text-2xl text-[#CCA855] font-bold">Team Lead</h3>
          </div>

          <div className="grid gap-3 pl-4 ml-2 border-l-2 border-[#FF003C]/30">
            <div className="flex items-center gap-3">
              <User size={18} className="text-[#CCA855]/70" />
              <div>
                <p className="text-sm text-[#CCA855]/70">Name</p>
                <p className="font-medium text-white">
                  {teamLeadData?.name || ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#CCA855]/70" />
              <div>
                <p className="text-sm text-[#CCA855]/70">Email</p>
                <p className="font-medium text-white">
                  {teamLeadData?.email || ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#CCA855]/70" />
              <div>
                <p className="text-sm text-[#CCA855]/70">Phone</p>
                <p className="font-medium text-white">
                  {teamLeadData?.phone || ''}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-4"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={onEditTeamLead}
              className="bg-[#CCA855] hover:bg-[#CCA855]/90 text-black font-medium flex items-center gap-2 px-4 py-2 rounded-md border-0 transition-all duration-300"
            >
              <Edit size={16} />
              <span>Edit Lead Details</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Members List */}
      <h3 className="text-xl text-[#CCA855] mb-4 flex items-center gap-2">
        <Users size={20} className="text-[#CCA855]" />
        Team Members ({teamMembers.length})
        <div className="h-px grow ml-3 bg-[#FF003C]/50"></div>
      </h3>

      <AnimatePresence>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={memberVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#FF003C]/10 rounded-xl blur-sm"></div>
            <div className="bg-[#090B0D]/80 border border-[#FF003C]/20 p-5 rounded-xl hover:border-[#FF003C]/40 transition-all duration-300">
              <div className="grid gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-[#CCA855]/70" />
                  <div>
                    <p className="text-sm text-[#CCA855]/70">Name</p>
                    <p className="font-medium text-white">{member.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#CCA855]/70" />
                  <div>
                    <p className="text-sm text-[#CCA855]/70">Email</p>
                    <p className="font-medium text-white">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#CCA855]/70" />
                  <div>
                    <p className="text-sm text-[#CCA855]/70">Phone</p>
                    <p className="font-medium text-white">{member.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => onEditMember(index)}
                  className="bg-[#CCA855] hover:bg-[#CCA855]/90 text-black font-medium flex items-center gap-2 px-4 py-2 rounded-md border-0 transition-all duration-300 transform hover:scale-105 active:scale-98"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>

                <Button
                  onClick={() => onRemoveMember(index)}
                  className="bg-[#FF003C] hover:bg-[#FF003C]/90 text-white font-medium flex items-center gap-2 px-4 py-2 rounded-md border-0 transition-all duration-300 transform hover:scale-105 active:scale-98"
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {showConfirmTeam && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 mb-4"
        >
          <div className="h-px w-full bg-[#FF003C]/50 mb-8"></div>

          <motion.div
            className="hidden md:block flex justify-center"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {
              <Button
                onClick={confirmTeam}
                disabled={registerLoading}
                className="bg-[#CCA855] hover:bg-[#CCA855]/90 text-black font-medium flex items-center gap-2 px-8 py-6 text-lg rounded-md border-0 transition-all duration-300 shadow-lg shadow-[#CCA855]/20"
              >
                {registerLoading ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {isFree ? (
                      isFree && registerLoading ? (
                        'Loading...'
                      ) : (
                        'Register'
                      )
                    ) : (
                      <>
                        <CreditCard size={22} />
                        <span>Proceed to Payment</span>
                        <Check size={22} className="ml-1" />
                      </>
                    )}
                  </>
                )}
              </Button>
            }
          </motion.div>
        </motion.div>
      )}
    </div>
  );

  const desktopSidebarVariants: Variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut', // or 'easeOut' as const
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const mobileDrawerVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <AnimatePresence>
          {isOpen && (
            <DrawerContent className="bg-[#090B0D] border-t-2 border-[#FF003C]/30">
              <motion.div
                variants={mobileDrawerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DrawerHeader>
                  <DrawerTitle className="text-[#CCA855] text-3xl font-antolia tracking-wider flex items-center gap-3">
                    <Users size={24} className="text-[#CCA855]" />
                    Team Roster
                  </DrawerTitle>
                  <DrawerDescription className="text-[#CCA855]/80 text-xl font-kagitingan tracking-wider">
                    {teamMembers.length > 0
                      ? `${teamMembers.length} team member${teamMembers.length > 1 ? 's' : ''}`
                      : 'No team members added yet'}
                  </DrawerDescription>

                  <div className="h-1 w-32 bg-[#FF003C] rounded-full mt-2"></div>
                </DrawerHeader>
                {showConfirmTeam && (
                  <div className="px-4 pt-4 pb-2">
                    <Button
                      onClick={confirmTeam}
                      disabled={registerLoading}
                      className="w-full bg-[#CCA855] hover:bg-[#CCA855]/90 text-black font-medium flex items-center justify-center gap-2 px-4 py-3 text-base rounded-md border-0 transition-all duration-300 shadow-lg shadow-[#CCA855]/20"
                    >
                      {registerLoading ? (
                        <>
                          <Loader2 size={22} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          {isFree ? (
                            'Register'
                          ) : (
                            <>
                              <CreditCard size={20} />
                              <span>Proceed to Payment</span>
                              <Check size={20} className="ml-1" />
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                )}
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-20rem)]">
                  <Content />
                </div>
              </motion.div>
            </DrawerContent>
          )}
        </AnimatePresence>
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-[#090B0D] border-l-2 border-[#FF003C]/30 w-100 sm:w-135 overflow-y-auto my-scrollbar"
      >
        <motion.div
          variants={desktopSidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <SheetHeader>
            <SheetTitle className="text-[#CCA855] text-3xl font-antolia tracking-wider flex items-center gap-3">
              <Users size={24} className="text-[#CCA855]" />
              Team Roster
            </SheetTitle>
            <SheetDescription className="text-[#CCA855]/80 text-xl font-kagitingan tracking-wider">
              {teamMembers.length > 0
                ? `${teamMembers.length} team member${teamMembers.length > 1 ? 's' : ''}`
                : 'No team members added yet'}
            </SheetDescription>

            <div className="h-1 w-32 bg-[#FF003C] rounded-full mt-2"></div>
          </SheetHeader>
          <div className="overflow-y-auto max-h-[calc(100vh-10rem)] pr-2 my-scrollbar">
            <Content />
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-0">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#FF003C] blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[#FF003C] blur-3xl"></div>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
