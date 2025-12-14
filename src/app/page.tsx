import Hero from '@/components/Hero';
import Navbar from '@/components/navbar';
import Playground from '@/components/Playground';
import React from 'react';
// import Footer from '@/components/Footer';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <Hero />
        <Playground />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default page;
