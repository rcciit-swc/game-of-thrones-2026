'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/about/about';
import PrincipalsDesk from '@/components/PrincipalsDesk';
import Sponsors from '@/components/Sponsors';
import Playground from '@/components/Playground';
import LoaderOverlay from '@/components/events/LoaderOverlay';
import { useLoaderStore } from '@/lib/stores/loader';

const Page = () => {
  const [showLoader, setShowLoader] = useState(false);
  const { hasVisited, setHasVisited } = useLoaderStore();

  useEffect(() => {
    if (!hasVisited) {
      setShowLoader(true);
    }
  }, [hasVisited]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setHasVisited(true);
  };

  return (
    <>
      <LoaderOverlay
        isVisible={showLoader}
        onAnimationComplete={handleLoaderComplete}
      />

      <div className="flex flex-col min-h-screen overflow-hidden">
        <Hero />
        <About />

        <Playground />
        <PrincipalsDesk />
        <Sponsors />
      </div>
    </>
  );
};

export default Page;
