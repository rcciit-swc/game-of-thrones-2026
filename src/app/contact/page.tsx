'use client';

import React, { useState } from 'react';
import { contactData } from './contact';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactCard = ({
  contact,
}: {
  contact: (typeof contactData)[0]['contacts'][0];
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-55 h-80 cursor-pointer group transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with Stranger Things effect */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden border-3 border-red-600 shadow-2xl"
        style={{
          boxShadow: isHovered
            ? '0 0 30px rgba(220, 38, 38, 1), 0 0 60px rgba(220, 38, 38, 0.6), inset 0 0 20px rgba(220, 38, 38, 0.3)'
            : '0 0 15px rgba(220, 38, 38, 0.7), 0 0 30px rgba(220, 38, 38, 0.3)',
        }}
      >
        {/* Background Image */}
        <img
          src={contact.image}
          alt={contact.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'blur-sm brightness-70' : 'blur-0 brightness-100'
          }`}
        />

        {/* Content - Always Visible */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent transition-all duration-500 ${
            isHovered ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <h3 className="text-white font-bold text-lg rajdhanifont text-center mb-1 truncate drop-shadow-lg">
            {contact.name}
          </h3>
          <p className="text-red-400 text-xs rajdhanifont text-center mb-2 line-clamp-2 font-semibold">
            {contact.role}
          </p>
          <p className="text-gray-300 text-xs rajdhanifont text-center font-mono">
            {contact.phone}
          </p>
        </div>

        {/* Hover Content - Center */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/20">
            <div className="text-center animate-pulse">
              <h3
                className="text-white font-bold text-xl rajdhanifont mb-2 drop-shadow-lg"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                }}
              >
                {contact.name}
              </h3>
              <p
                className="text-red-400 text-sm rajdhanifont mb-3 font-semibold"
                style={{
                  textShadow: '0 0 8px rgba(220, 38, 38, 0.6)',
                }}
              >
                {contact.role}
              </p>
              <p
                className="text-red-300 text-xs rajdhanifont tracking-widest font-mono"
                style={{
                  textShadow: '0 0 8px rgba(220, 38, 38, 0.6)',
                }}
              >
                {contact.phone}
              </p>
            </div>
          </div>
        )}

        {/* Stranger Things Glow Effect */}
        <div className="absolute inset-0 pointer-events-none border border-red-500/50 rounded-xl opacity-50" />

        {/* Corner glows */}
        <div className="absolute top-0 left-0 w-8 h-8 bg-red-600/30 blur-lg rounded-full" />
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-600/30 blur-lg rounded-full" />
      </div>
    </div>
  );
};

const ContactSection = ({
  title,
  contacts,
}: {
  title: string;
  contacts: (typeof contactData)[0]['contacts'];
}) => {
  return (
    <div className="w-full mb-20">
      {/* Heading with Stranger Things Style */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl font-black rajdhanifont text-center relative">
          {/* Red glow text */}
          <span
            className="text-red-600 inline-block drop-shadow-lg"
            style={{
              textShadow:
                '0 0 15px rgba(220, 38, 38, 1), 0 0 30px rgba(220, 38, 38, 0.6), 0 0 45px rgba(220, 38, 38, 0.3)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            {title}
          </span>
          {/* Decorative line */}
          <div
            className="h-1.5 w-32 bg-linear-to-r from-red-600 via-red-500 to-transparent mx-auto mt-4 rounded-full"
            style={{
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
            }}
          />
        </h2>
      </div>

      {/* Cards Grid - Centered */}
      <div className="flex flex-wrap gap-8 lg:gap-10 justify-center px-4 md:px-8">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
};

// Venue Section Component
const VenueSection = () => {
  const venues = [
    {
      name: 'Sports Authority of India',
      address: 'Sports Authority of India, AJC Bose Road, Kolkata, West Bengal',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.0123456789!2d88.3656!3d22.5626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8994b8b8b8b8b%3A0x0!2sSports%20Authority%20of%20India!5e0!3m2!1sen!2sin!4v1234567890',
    },
    {
      name: 'East Calcutta Sports Complex',
      address:
        'East Calcutta Sports Complex, AJC Bose Road, Kolkata, West Bengal',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.0123456789!2d88.3756!3d22.5526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8995b8b8b8b8b%3A0x0!2sEast%20Calcutta%20Sports%20Complex!5e0!3m2!1sen!2sin!4v1234567890',
    },
    {
      name: 'RCCIIT',
      address:
        'Rabindra Centenary College of Integrated IT, Kolkata, West Bengal',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0123456789!2d88.3956!3d22.5426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89eef0f0f0f0f%3A0x0!2sRabindra%20Centenary%20College%20of%20Integrated%20IT!5e0!3m2!1sen!2sin!4v1234567890',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl font-black rajdhanifont text-center relative">
          <span
            className="text-red-600 inline-block drop-shadow-lg"
            style={{
              textShadow:
                '0 0 15px rgba(220, 38, 38, 1), 0 0 30px rgba(220, 38, 38, 0.6), 0 0 45px rgba(220, 38, 38, 0.3)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            VENUES & LOCATION
          </span>
          <div
            className="h-1.5 w-32 bg-linear-to-r from-red-600 via-red-500 to-transparent mx-auto mt-4 rounded-full"
            style={{
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
            }}
          />
        </h2>
      </div>

      <div className="space-y-12">
        {venues.map((venue, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            {/* Venue Info Card */}
            <div
              className="rounded-xl overflow-hidden border-3 border-red-600 shadow-2xl p-6 relative"
              style={{
                boxShadow:
                  '0 0 15px rgba(220, 38, 38, 0.7), 0 0 30px rgba(220, 38, 38, 0.3)',
              }}
            >
              <div className="absolute top-0 left-0 w-8 h-8 bg-red-600/30 blur-lg rounded-full" />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-600/30 blur-lg rounded-full" />

              <h3
                className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2 relative z-10"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
                }}
              >
                <FaMapMarkerAlt />
                {venue.name}
              </h3>

              <p className="text-gray-200 text-sm rajdhanifont leading-relaxed relative z-10">
                {venue.address}
              </p>

              <div className="absolute inset-0 pointer-events-none border border-red-500/50 rounded-xl opacity-50" />
            </div>

            {/* Map Container */}
            <div
              className="rounded-xl overflow-hidden border-3 border-red-600 shadow-2xl h-80"
              style={{
                boxShadow:
                  '0 0 15px rgba(220, 38, 38, 0.7), 0 0 30px rgba(220, 38, 38, 0.3)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="w-full h-full"
              >
                <iframe
                  src={venue.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const page = () => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'venue'>('contacts');

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/about/playerprofilebg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-16">
          {/* Page Title */}
          <div className="mb-20 text-center">
            <h1
              className="text-5xl md:text-7xl font-black rajdhanifont mt-40"
              style={{
                color: '#ff1744',
                textShadow:
                  '0 0 20px rgba(255, 23, 68, 0.8), 0 0 40px rgba(255, 23, 68, 0.4)',
              }}
            >
              CONTACT US
            </h1>
            <p className="text-red-300 text-lg rajdhanifont tracking-widest">
              Need information about GOT'26? Contact our team members below for
              any queries regarding events, sponsorships, or general
              information.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div
              className="flex gap-4 bg-black/60 rounded-lg p-2 border-2 border-red-600/50"
              style={{
                boxShadow: '0 0 15px rgba(220, 38, 38, 0.3)',
              }}
            >
              <motion.button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-2 rounded-lg font-bold rajdhanifont transition-all ${
                  activeTab === 'contacts'
                    ? 'bg-red-600 text-white'
                    : 'text-red-400 hover:text-red-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={
                  activeTab === 'contacts'
                    ? {
                        boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
                      }
                    : {}
                }
              >
                Team Contacts
              </motion.button>

              <motion.button
                onClick={() => setActiveTab('venue')}
                className={`px-6 py-2 rounded-lg font-bold rajdhanifont transition-all ${
                  activeTab === 'venue'
                    ? 'bg-red-600 text-white'
                    : 'text-red-400 hover:text-red-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={
                  activeTab === 'venue'
                    ? {
                        boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
                      }
                    : {}
                }
              >
                Venues & Location
              </motion.button>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'contacts' && (
              <motion.div key="contacts" className="space-y-20">
                {contactData.map((section, index) => (
                  <ContactSection
                    key={index}
                    title={section.name}
                    contacts={section.contacts}
                  />
                ))}
              </motion.div>
            )}

            {activeTab === 'venue' && (
              <motion.div key="venue">
                <VenueSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default page;
