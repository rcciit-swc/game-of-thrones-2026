import Hero from '@/components/Hero';
import React from 'react';
import About from '@/components/about/about';
import Navbar from '@/components/navbar';

const page = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};

export default page;
