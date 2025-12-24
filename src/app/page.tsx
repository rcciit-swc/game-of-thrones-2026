import Hero from '@/components/Hero';
import About from '@/components/about/about';
import Playground from '@/components/Playground';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      <About />
      <Playground />
    </div>
  );
};

export default page;
