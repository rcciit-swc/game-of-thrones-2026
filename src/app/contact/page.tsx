'use client';

import React, { useState, useEffect } from 'react';
import { contactData } from './contact';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaTrophy, FaSubway } from 'react-icons/fa';

const ContactCard = ({
  contact,
}: {
  contact: (typeof contactData)[0]['contacts'][0];
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-xs h-[450px] cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Container */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-red-600/40 shadow-xl"
        style={{
          boxShadow: isHovered
            ? '0 20px 60px rgba(182, 3, 2, 0.5), 0 0 40px rgba(204, 168, 85, 0.3)'
            : '0 10px 30px rgba(182, 3, 2, 0.3), 0 0 20px rgba(204, 168, 85, 0.2)',
        }}
      >
        {/* Background Image - Original brightness */}
        <img
          src={contact.image}
          alt={contact.name}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            filter: isHovered
              ? 'brightness(1.1) saturate(1.2)'
              : 'brightness(1)',
            transition: 'filter 0.5s ease',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content - Always Visible */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
            isHovered ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <h3 className="text-white font-bold text-xl rajdhanifont text-center mb-2 drop-shadow-lg">
            {contact.name}
          </h3>
          <p className="text-[#CCA855] text-sm rajdhanifont text-center mb-3 font-semibold">
            {contact.role}
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-200 text-sm">
            <FaPhone className="w-3 h-3" />
            <span className="font-mono">{contact.phone}</span>
          </div>
        </div>

        {/* Hover Content - Center - Optimized for mobile */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black/90 via-[#B60302]/80 to-black/90 md:backdrop-blur-sm">
            <div className="text-center">
              <h3
                className="text-white font-bold text-2xl rajdhanifont mb-3"
                style={{
                  textShadow: '0 0 20px rgba(204, 168, 85, 0.8)',
                }}
              >
                {contact.name}
              </h3>
              <p
                className="text-[#CCA855] text-base rajdhanifont mb-4 font-semibold"
                style={{
                  textShadow: '0 0 15px rgba(204, 168, 85, 0.6)',
                }}
              >
                {contact.role}
              </p>
              <div className="flex items-center justify-center gap-2">
                <FaPhone className="w-4 h-4 text-[#CCA855]" />
                <p
                  className="text-white text-base rajdhanifont tracking-wide font-mono"
                  style={{
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {contact.phone}
                </p>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[#CCA855] opacity-70 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-[#CCA855] opacity-70 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-[#CCA855] opacity-70 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[#CCA855] opacity-70 rounded-br-lg"></div>
          </div>
        )}
      </div>
    </motion.div>
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
    <div className="w-full mb-16">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold rajdhanifont text-center relative">
          <span
            className="text-[#CCA855] inline-block"
            style={{
              textShadow:
                '0 0 20px rgba(204, 168, 85, 0.6), 0 0 40px rgba(204, 168, 85, 0.3)',
            }}
          >
            {title}
          </span>
          {/* Decorative line */}
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#CCA855] to-transparent mx-auto mt-3 rounded-full" />
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap gap-8 justify-center px-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ContactCard contact={contact} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const VenueSection = () => {
  const venues = [
    {
      name: 'Sports Authority of India (SAI)',
      subName: 'The Grand Arena',
      address:
        'Netaji Subhas Eastern Centre, Salt Lake City, Sector III, Kolkata - 700106',
      landmark: 'Near Yuba Bharati Krirangan (Salt Lake Stadium)',
      transport: 'Nearest Metro: Salt Lake Stadium (Green Line)',
      events: ['Athletics', 'Football Finals', 'Volleyball'],
      // Real Google Maps Embed Link for SAI Kolkata
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.076634676189!2d88.40539137596956!3d22.57622823283238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275d045555555%3A0x6b77464603956461!2sSports%20Authority%20of%20India!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin',
    },
    {
      name: 'East Calcutta Sports Complex',
      subName: 'The Cricket Battleground',
      address:
        'Eastern Metropolitan Bypass, Madurdaha, Hussainpur, Kolkata - 700107',
      landmark: 'Near Ruby Hospital / Gateway Hotel',
      transport: 'Nearest Bus Stop: Ruby Crossing',
      events: ['Cricket (Tournament)', 'Football (Qualifiers)', 'Tug of War'],
      // Real Google Maps Embed Link for East Calcutta District Sports Council
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5687063467!2d88.4042!3d22.5205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0273f555555555%3A0x123456789abcdef!2sEast%20Calcutta%20District%20Sports%20Council!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin',
    },
    {
      name: 'RCCIIT Campus',
      subName: 'The Fortress of Strategy',
      address: 'Canal South Road, Beliaghata, Kolkata - 700015',
      landmark: 'Near Paribesh Bhavan / Narkeldanga Police Station',
      transport: 'Nearest Metro: Sealdah / Phoolbagan',
      events: [
        'Table Tennis',
        'Chess',
        'Carrom',
        'Esports (BGMI/Valo)',
        'Badminton',
      ],
      // Real Google Maps Embed Link for RCCIIT
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.6383827402633!2d88.39673931495925!3d22.56012898518931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02743203255595%3A0x9c37b30c00660fab!2sRCC%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-4"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold rajdhanifont relative tracking-wider">
          <span
            className="text-[#CCA855] inline-block uppercase"
            style={{
              textShadow:
                '0 0 20px rgba(204, 168, 85, 0.6), 0 0 40px rgba(204, 168, 85, 0.3)',
            }}
          >
            Realms of Battle
          </span>
          <div className="text-red-500 text-lg md:text-xl mt-2 tracking-[0.2em] uppercase font-semibold">
            Venues & Locations
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#CCA855] to-transparent mx-auto mt-4 rounded-full" />
        </h2>
      </div>

      <div className="space-y-16">
        {venues.map((venue, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch ${
              index % 2 !== 0 ? 'lg:direction-rtl' : ''
            }`}
          >
            {/* Venue Info Card - Spans 5 columns */}
            <div
              className={`lg:col-span-5 rounded-xl overflow-hidden border border-red-900/50 relative group bg-black/80 backdrop-blur-md flex flex-col`}
              style={{
                boxShadow:
                  '0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(182, 3, 2, 0.1)',
              }}
            >
              {/* Decorative side bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#CCA855] via-red-600 to-[#CCA855]" />

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <div className="mb-2 text-red-500 font-bold tracking-widest text-sm uppercase">
                  {venue.subName}
                </div>

                <h3
                  className="text-3xl font-bold text-white mb-6 font-serif tracking-wide"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {venue.name}
                </h3>

                {/* Info Blocks */}
                <div className="space-y-4 text-gray-300 rajdhanifont">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#CCA855] mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="text-sm opacity-80">{venue.address}</p>
                      <p className="text-xs text-[#CCA855] mt-1 italic">
                        Landmark: {venue.landmark}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaSubway className="w-5 h-5 text-[#CCA855] mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Transport</p>
                      <p className="text-sm opacity-80">{venue.transport}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-white/10 mt-4">
                    <FaTrophy className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-2">
                        Events Hosted
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {venue.events.map((event, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded bg-red-900/30 border border-red-600/30 text-gray-200"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container - Spans 7 columns */}
            <div
              className={`lg:col-span-7 rounded-xl overflow-hidden border-2 border-[#CCA855]/30 shadow-2xl h-80 lg:h-auto min-h-[350px] relative`}
            >
              <div className="absolute inset-0 bg-red-900/10 z-10 pointer-events-none mix-blend-overlay" />
              <iframe
                src={venue.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                title={`Map of ${venue.name}`}
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:filter-none transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'venue'>('contacts');

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/about/playerprofilebg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Page Title */}
          <div className="mb-16 text-center mt-24 md:mt-32">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-['Irish_Grover'] mb-4"
              style={{
                color: '#CCA855',
                textShadow:
                  '0 0 30px rgba(204, 168, 85, 0.8), 0 0 60px rgba(204, 168, 85, 0.4)',
              }}
            >
              CONTACT US
            </h1>
            <p className="text-gray-300 text-base md:text-lg rajdhanifont max-w-3xl mx-auto leading-relaxed">
              Need information about GOT'26? Contact our team members below for
              any queries regarding events, sponsorships, or general
              information.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div
              className="flex gap-3 bg-black/70 rounded-xl p-2 border-2 border-red-600/40 backdrop-blur-sm"
              style={{
                boxShadow: '0 0 20px rgba(182, 3, 2, 0.3)',
              }}
            >
              <motion.button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-2.5 rounded-lg font-bold rajdhanifont text-base transition-all ${
                  activeTab === 'contacts'
                    ? 'bg-gradient-to-r from-[#B60302] to-[#8f0202] text-white'
                    : 'text-[#CCA855] hover:text-[#f5d68c]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={
                  activeTab === 'contacts'
                    ? {
                        boxShadow: '0 0 25px rgba(182, 3, 2, 0.6)',
                      }
                    : {}
                }
              >
                Team Contacts
              </motion.button>

              <motion.button
                onClick={() => setActiveTab('venue')}
                className={`px-6 py-2.5 rounded-lg font-bold rajdhanifont text-base transition-all ${
                  activeTab === 'venue'
                    ? 'bg-gradient-to-r from-[#B60302] to-[#8f0202] text-white'
                    : 'text-[#CCA855] hover:text-[#f5d68c]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={
                  activeTab === 'venue'
                    ? {
                        boxShadow: '0 0 25px rgba(182, 3, 2, 0.6)',
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
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
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
              <motion.div
                key="venue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VenueSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default ContactPage;
