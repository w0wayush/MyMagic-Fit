import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Shirt, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/custom/header/Header";
import FeaturedProducts from "@/components/custom/featuredProducts/FeaturedProducts";
import Testimonials from "@/components/custom/testimonials/Testimonials";
import Gallery from "@/components/custom/gallery/Gallery";
import Footer from "@/components/custom/footer/Footer";
import NewsletterSignup from "@/components/custom/newsletter/NewsLetter";
import { WhyChooseSection } from "@/components/custom/whychoose/WhyChooseSection";

export const AnimatedSection = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/img/img1.png",
    "/img/img2.png",
    "/img/img3.png",
    "/img/img4.png",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-white body-font "
    >
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <motion.div
          className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title-font sm:text-6xl text-5xl mb-4 font-extrabold">
            Discover Your Perfect Fit with{" "}
            {/* <br className="hidden lg:inline-block" /> */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              MagicFit
            </span>
          </h1>
          <p className="mb-8 leading-relaxed text-gray-300 text-lg">
            Experience the future of fashion with our AI-powered styling and
            perfect-fit technology. Elevate your wardrobe with clothes that not
            only look great but feel amazing too.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/magicFit">
              <Button className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Try MagicFit
                <Shirt className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/products">
              <Button className="inline-flex items-center bg-transparent border-2 border-pink-500 text-pink-500 py-3 px-8 focus:outline-none hover:bg-pink-500 hover:text-white rounded-full text-lg transition-all duration-300">
                Browse Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="md:max-w-lg lg:w-full md:w-1/2 relative md:block hidden"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Fashion model ${currentImageIndex + 1}`}
              className="object-cover object-center w-[400px] h-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <HeroSection />
      <AnimatedSection>
        <FeaturedProducts />
      </AnimatedSection>
      <WhyChooseSection />
      <AnimatedSection>
        <Gallery />
      </AnimatedSection>
      <NewsletterSignup />
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <Footer />
    </div>
  );
};

export default Home;
