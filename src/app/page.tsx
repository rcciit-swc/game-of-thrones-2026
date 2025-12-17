import Hero from '@/components/Hero';
import Navbar from '@/components/navbar';
import Playground from '@/components/Playground';
import React from 'react';
import About from '@/components/about/about';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />

      <Hero />
      <About />

      <Playground />
      <Footer />
    </div>
  );
};

export default page;
