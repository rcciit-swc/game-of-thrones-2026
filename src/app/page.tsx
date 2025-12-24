'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/about/about';
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
      </div>
    </>
  );
};

export default Page;
