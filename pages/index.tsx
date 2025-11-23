// pages/index.tsx
import { NextPage } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

const Home: NextPage<Props> = ({ isDark, toggleTheme }) => {
  return (
    <div className="relative w-full flex flex-col group/design-root overflow-x-hidden">
      <div className="container shadow-soft mt-5 mx-auto">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
      </div>
      <main className="w-full">
        <HeroSection />
        <GallerySection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
