'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'sonner';
import { useUser } from '@/lib/stores';
import { useEvents } from '@/lib/stores';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  registerSoloEvent,
  uploadPaymentScreenshot,
} from '@/utils/functions/register-services';
import {
  User,
  Phone,
  Mail,
  Building,
  CreditCard,
  Upload,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  PartyPopper,
  Ticket,
  Music,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SoloEventRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventID: string;
  eventFees: number;
}

// Schema for solo (team lead) details.
const soloLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
  email: z.string().email('Invalid email'),
  college: z.string().min(1, 'College is required'),
});
type SoloLeadFormValues = z.infer<typeof soloLeadSchema>;

// Schema for payment details.
const paymentSchema = z.object({
  accountHolderName: z.string().min(1, 'Account Holder Name is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  paymentScreenshot: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      'Payment screenshot is required'
    )
    .transform((files) => files[0]),
});
type PaymentFormValues = z.infer<typeof paymentSchema>;

export function SoloEventRegistration({
  isOpen,
  onClose,
  eventName,
  eventID,
  eventFees,
}: SoloEventRegistrationDialogProps) {
  const { userData } = useUser();

  const { markEventAsRegistered, eventsData } = useEvents();
  const eventData = eventsData?.find((event) => event.event_id === eventID);
  const [step, setStep] = useState(1);
  const [soloLeadData, setSoloLeadData] = useState<SoloLeadFormValues | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Stop Lenis smooth scroll when modal is open
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      if (isOpen) {
        (window as any).lenis.stop();
        document.body.style.overflow = 'hidden';
      } else {
        (window as any).lenis.start();
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  // Form for solo lead details.
  const {
    register: registerSoloLead,
    handleSubmit: handleSoloLeadSubmit,
    formState: { errors: soloLeadErrors },
    reset: resetSoloLead,
  } = useForm<SoloLeadFormValues>({
    resolver: zodResolver(soloLeadSchema),
    defaultValues: {
      name: userData?.name,
      phone: userData?.phone,
      email: userData?.email,
    },
  });

  const onSoloLeadSubmit = (data: SoloLeadFormValues) => {
    setSoloLeadData(data);
    setStep(2);
    resetSoloLead();
  };

  // Form for payment details.
  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    reset: resetPayment,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const triggerConfetti = () => {
    // Create confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const onPaymentSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    let screenshotUrl = '';
    try {
      screenshotUrl = await uploadPaymentScreenshot(
        data.paymentScreenshot,
        eventName
      );
    } catch (error) {
      console.error('Failed to upload screenshot:', error);
      toast.error('Failed to upload payment screenshot. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // Combine the registration data.
    const registrationParams = {
      userId: String(userData?.id), // Ensure userId is a string
      eventId: eventID,
      transactionId: data.transactionId,
      college: soloLeadData!.college,
      transactionScreenshot: screenshotUrl,
      name: soloLeadData!.name,
      phone: soloLeadData!.phone,
      email: soloLeadData!.email,
      account_holder_name: data.accountHolderName,
    };
    const emailData = {
      teamName: null,
      leaderName: soloLeadData?.name,
      leaderPhone: soloLeadData?.phone,
      email: soloLeadData?.email,
      eventName: eventName,
      year: '2026',
      festName: 'Game of Thrones',
      transactionId: data.transactionId,
      college: soloLeadData!.college,
      teamMembers: [],
      coordinators: eventData?.coordinators || [],
      verificationDays: 2,
      contactEmail: 'rcciit.got.official@gmail.com',
      logoUrl: 'https://i.postimg.cc/Gtpt62ST/got.jpg',
      socialLinks: {
        instagram: '#',
        facebook: '#',
        website: '#',
      },
    };
    try {
      const result = await registerSoloEvent(registrationParams);
      const emailResponse = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: soloLeadData?.email,
          subject: `🎉 Registration Confirmed: ${eventData?.name.charAt(0).toUpperCase()}${eventData?.name.slice(1).toLowerCase()} - Game of Thrones 2025`,
          fileName: 'send-email.ejs',
          data: emailData,
        }),
      });
      toast.success('Registered successfully');
      markEventAsRegistered(eventID);
      setIsSubmitting(false);
      setShowSuccess(true);
      triggerConfetti();
      setTimeout(() => {
        setShowSuccess(false);
        setSoloLeadData(null);
        setStep(1);
        resetPayment();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to register for solo event:', error);
      toast.error('Failed to register for solo event. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSoloLeadData(null);
      setStep(1);
      resetPayment();
      resetSoloLead();
      setShowSuccess(false);
    }
  }, [isOpen, resetPayment, resetSoloLead]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        className="sm:max-w-[450px] my-scrollbar border-2 border-[#FF003C] rounded-xl p-8 shadow-xl overflow-hidden"
        style={{
          backgroundImage:
            'url(https://i.postimg.cc/C5SMqWV1/cae8d04277c25697532890b8f73997b82d3609a1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <DialogHeader className="relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden xl:flex items-center justify-center gap-2 mb-2 md:mb-3 relative z-10"
          >
            <PartyPopper size={20} className="text-[#FF003C] md:w-6 md:h-6" />
            <Music size={20} className="text-[#FF003C] md:w-6 md:h-6" />
            <Ticket size={20} className="text-[#FF003C] md:w-6 md:h-6" />
          </motion.div>
          <DialogTitle className="text-center text-white font-antolia tracking-widest font-bold text-sm md:text-2xl lg:text-xl pb-1 relative z-10">
            Registration for {eventName}
          </DialogTitle>
          <div className="flex justify-center mt-1 md:mt-2">
            <div className="h-0.5 md:h-1 w-24 md:w-32 bg-[#FF003C] rounded-full"></div>
          </div>
          <div className="flex justify-center mt-2 md:mt-3">
            <div className="flex gap-3 md:gap-4">
              <div
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${step === 1 ? 'bg-[#FF003C]' : 'bg-gray-600'} transition-colors duration-300`}
              ></div>
              <div
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${step === 2 ? 'bg-[#FF003C]' : 'bg-gray-600'} transition-colors duration-300`}
              ></div>
            </div>
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Check size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-300 text-center mb-4">
                You have successfully registered for {eventName}
              </p>
              <p className="text-yellow-300 font-medium">
                We'll see you at the fest!
              </p>
            </motion.div>
          ) : step === 1 ? (
            <motion.form
              key="step1"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSoloLeadSubmit(onSoloLeadSubmit)}
              className="overflow-y-auto my-scrollbar max-h-[60vh] md:max-h-[55vh] 2xl:max-h-[60vh] relative z-10 mt-2 md:mt-4"
            >
              <div className="grid gap-2 md:gap-4 py-1 md:py-2">
                <div className="grid gap-1.5">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-1 md:gap-2 text-[#CCA855] font-medium text-xs md:text-sm relative z-10"
                  >
                    <User size={14} className="md:w-[18px] md:h-[18px]" />
                    <span>Name</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      readOnly
                      {...registerSoloLead('name')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] focus:ring-1 focus:ring-[#FF003C] focus:outline-none text-[#CCA855] rounded-md p-1.5 pl-7 md:p-2 md:pl-9 text-xs md:text-sm transition-all duration-300 relative z-10"
                      placeholder="Enter your name"
                      defaultValue={userData?.name}
                    />
                    <User
                      size={14}
                      className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-[#FF003C]/70 z-10 md:w-[18px] md:h-[18px]"
                    />
                  </div>
                  {soloLeadErrors.name && (
                    <p className="text-red-400 text-sm ml-2">
                      {soloLeadErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="phone"
                    className="flex items-center gap-1 md:gap-2 text-[#CCA855] font-medium text-xs md:text-sm relative z-10"
                  >
                    <Phone size={14} className="md:w-[18px] md:h-[18px]" />
                    <span>Phone</span>
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      readOnly
                      {...registerSoloLead('phone')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] focus:ring-1 focus:ring-[#FF003C] focus:outline-none text-[#CCA855] rounded-md p-1.5 pl-7 md:p-2 md:pl-9 text-xs md:text-sm transition-all duration-300 relative z-10"
                      placeholder="Enter your phone number"
                      defaultValue={userData?.phone}
                    />
                    <Phone
                      size={14}
                      className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-[#FF003C]/70 z-10 md:w-[18px] md:h-[18px]"
                    />
                  </div>
                  {soloLeadErrors.phone && (
                    <p className="text-red-400 text-sm ml-2">
                      {soloLeadErrors.phone.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-1 md:gap-2 text-[#CCA855] font-medium text-xs md:text-sm relative z-10"
                  >
                    <Mail size={14} className="md:w-[18px] md:h-[18px]" />
                    <span>Email</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      {...registerSoloLead('email')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] focus:ring-1 focus:ring-[#FF003C] focus:outline-none text-[#CCA855] rounded-md p-1.5 pl-7 md:p-2 md:pl-9 text-xs md:text-sm transition-all duration-300 relative z-10"
                      placeholder="Enter your email"
                      defaultValue={userData?.email}
                      readOnly
                    />
                    <Mail
                      size={14}
                      className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-[#FF003C]/70 z-10 md:w-[18px] md:h-[18px]"
                    />
                  </div>
                  {soloLeadErrors.email && (
                    <p className="text-red-400 text-sm ml-2">
                      {soloLeadErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="college"
                    className="flex items-center gap-1 md:gap-2 text-[#CCA855] font-medium text-xs md:text-sm relative z-10"
                  >
                    <Building size={14} className="md:w-[18px] md:h-[18px]" />
                    <span>College</span>
                  </label>
                  <div className="relative">
                    <input
                      id="college"
                      autoFocus
                      {...registerSoloLead('college')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] focus:ring-1 focus:ring-[#FF003C] focus:outline-none text-[#CCA855] rounded-md p-1.5 pl-7 md:p-2 md:pl-9 text-xs md:text-sm transition-all duration-300 relative z-10"
                      placeholder="Enter your college name"
                    />
                    <Building
                      size={14}
                      className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-[#FF003C]/70 z-10 md:w-[18px] md:h-[18px]"
                    />
                  </div>
                  {soloLeadErrors.college && (
                    <p className="text-red-400 text-sm ml-2">
                      {soloLeadErrors.college.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 md:gap-4 mt-2 md:mt-4 relative z-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="bg-[#FF003C] hover:bg-[#FF003C]/90 text-white flex items-center gap-2 px-4 py-2 rounded-md border-0 transition-all duration-300"
                >
                  <X size={18} />
                  <span>Close</span>
                </Button>
                <Button
                  type="submit"
                  className="bg-[#CCA855] hover:bg-[#CCA855]/90 text-black font-medium flex items-center gap-2 px-6 py-2 rounded-md border-0 transition-all duration-300"
                >
                  <span>Next</span>
                  <ArrowRight size={18} />
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handlePaymentSubmit(onPaymentSubmit)}
              className="overflow-y-auto my-scrollbar  max-h-[70vh] md:max-h-[55vh] relative z-10 mt-2"
            >
              <div className="grid gap-2 md:gap-2.5 py-1 md:py-1">
                <div className="grid gap-1.5">
                  <label
                    htmlFor="accountHolderName"
                    className="flex items-center gap-1 md:gap-1.5 text-[#CCA855] font-medium text-xs md:text-xs relative z-10"
                  >
                    <User size={14} className="md:w-[14px] md:h-[14px]" />
                    <span>Account Holder Name</span>
                  </label>
                  <div className="relative">
                    <input
                      id="accountHolderName"
                      {...registerPayment('accountHolderName')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] focus:ring-1 focus:ring-[#FF003C] focus:outline-none text-[#CCA855] rounded-md p-1.5 pl-7 md:p-1.5 md:pl-8 text-xs transition-all duration-300 relative z-10"
                      placeholder="Enter account holder name"
                    />
                    <User
                      size={14}
                      className="absolute left-2 md:left-2.5 top-1/2 transform -translate-y-1/2 text-[#FF003C]/70 z-10 md:w-[14px] md:h-[14px]"
                    />
                  </div>
                  {paymentErrors.accountHolderName && (
                    <p className="text-red-400 text-sm ml-2">
                      {paymentErrors.accountHolderName.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <label
                    htmlFor="transactionId"
                    className="flex items-center gap-1 md:gap-1.5 text-[#CCA855] font-medium text-xs md:text-xs relative z-10"
                  >
                    <CreditCard size={14} className="md:w-[14px] md:h-[14px]" />
                    <span>Transaction ID</span>
                  </label>
                  <div className="relative">
                    <input
                      id="transactionId"
                      {...registerPayment('transactionId')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] focus:ring-1 focus:ring-[#FF003C] focus:outline-none text-[#CCA855] rounded-md p-1.5 pl-7 md:p-1.5 md:pl-8 text-xs transition-all duration-300 relative z-10"
                      placeholder="Enter transaction ID"
                    />
                    <CreditCard
                      size={14}
                      className="absolute left-2 md:left-2.5 top-1/2 transform -translate-y-1/2 text-[#FF003C]/70 z-10 md:w-[14px] md:h-[14px]"
                    />
                  </div>
                  {paymentErrors.transactionId && (
                    <p className="text-red-400 text-sm ml-2">
                      {paymentErrors.transactionId.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1.5 text-white relative z-10">
                  <label
                    htmlFor="paymentScreenshot"
                    className="flex items-center gap-1 md:gap-1.5 text-[#CCA855] font-medium text-xs md:text-xs"
                  >
                    <Upload size={14} className="md:w-[14px] md:h-[14px]" />
                    <span>Payment Screenshot</span>
                  </label>
                  <div className="relative">
                    <input
                      id="paymentScreenshot"
                      type="file"
                      {...registerPayment('paymentScreenshot')}
                      className="w-full bg-[#090B0D] border border-[#FF003C] focus:border-[#FF003C] outline-none rounded-md p-1.5 md:p-1.5 text-xs file:mr-2 md:file:mr-3 file:py-1 md:file:py-1 file:px-2 md:file:px-3 file:rounded-md file:border-0 file:bg-[#FF003C] file:text-white file:text-xs file:font-medium file:hover:bg-[#FF003C]/90 file:transition-all file:duration-300 relative z-10"
                      accept="image/*"
                    />
                  </div>
                  {paymentErrors.paymentScreenshot && (
                    <p className="text-red-400 text-sm ml-2">
                      {String(paymentErrors.paymentScreenshot.message)}
                    </p>
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-1 md:mt-2 mb-1 md:mb-2 relative z-10"
              >
                <h1 className="text-white text-center text-sm md:text-sm font-antolia tracking-widest font-semibold">
                  Pay <span className="text-[#FF003C]">₹ {eventFees}</span>
                </h1>
                <div className="mt-1 md:mt-2 w-full flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FF003C] rounded-lg blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative p-0.5 md:p-1 bg-[#FF003C] rounded-lg">
                      <Image
                        src="https://i.postimg.cc/h48tnXQb/image.png"
                        alt="Payment QR Code"
                        width={160}
                        height={160}
                        className="rounded-md md:w-[140px] md:h-[140px] lg:w-[150px] lg:h-[150px] xl:w-[160px] xl:h-[160px]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-row gap-2 md:gap-3 mt-2 md:mt-2.5 justify-between relative z-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="bg-[#FF003C] hover:bg-[#FF003C]/90 text-white flex items-center gap-2 px-4 py-2 rounded-md border-0 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </Button>
                <Button
                  type="submit"
                  className="bg-[#CCA855] hover:bg-[#CCA855]/90 text-black font-medium flex items-center gap-2 px-6 py-2 rounded-md border-0 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Register</span>
                      <Check size={18} />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
