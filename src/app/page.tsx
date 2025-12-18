import Hero from '@/components/Hero';
import Playground from '@/components/Playground';
import About from '@/components/about/about';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
};

export default page;
