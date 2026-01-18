import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Standard slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image:
      "https://media.istockphoto.com/id/978519918/photo/child-in-the-studio-posing-in-fashionable-clothes.jpg?s=612x612&w=0&k=20&c=GVIIy94u6YmxMhOCqwE3cE9lGd4BoMOshW8RNAWuBBc=",
    title: "Precision Training",
    desc: "Experience the cockpit of a modern Boeing 737 simulator.",
  },
  {
    image:
      "https://media.istockphoto.com/id/1295801785/photo/fashionable-little-girl-in-sunglasses-posing-on-pink-background.jpg?s=612x612&w=0&k=20&c=xICV0fe8lc1X8kExwAf2nvAKfUFqX0cRM6ERT0aqVEY=",
    title: "Elite Mentorship",
    desc: "Learn from captains with over 20,000 flight hours.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGtpZHMlMjBmYXNoaW9uJTIwZnVsbCUyMGJhbm5lciUyMGltYWdlJTIwZm9yJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Modern Fleet",
    desc: "Our diamond aircraft are equipped with the latest Garmin G1000.",
  },
  {
    image:
      "https://media.istockphoto.com/id/1210808626/photo/kid-girl-preschooler-in-blue-jeans-white-t-shirt-and-sunglasses-is-posing-sitting-isolated-on.jpg?s=612x612&w=0&k=20&c=_22IBxBDElRPHHy2gKo6jZT3w4ZQO0ZDPZEV1AkMQv4=",
    title: "Global Reach",
    desc: "Certifications recognized by EASA, FAA, and DGCA.",
  },
];


const SectionBottom = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [screenSize, setScreenSize] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simplified width logic for better mobile sliding
  const slideWidth = screenSize < 640 ? screenSize * 0.85 : screenSize < 1024 ? 500 : 650;

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    variableWidth: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    swipeToSlide: true, // Crucial for mobile feel
    touchThreshold: 20, // Makes it easier to swipe
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="w-full py-12 md:py-24 overflow-hidden bg-white">
      <div className="w-full mx-auto">
        <div
          className="relative cursor-grab active:cursor-grabbing 
            [&_.slick-list]:overflow-visible
            [&_.slick-dots]:bottom-[-50px]
            [&_.slick-dots_li_button:before]:text-blue-300
            [&_.slick-dots_li.slick-active_button:before]:text-blue-600
            [&_.slick-dots_li.slick-active_button:before]:scale-150"
        >
          <Slider {...settings}>
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;

              return (
                <div
                  key={index}
                  className="px-3 md:px-6 py-10 transition-all duration-500"
                  style={{ width: slideWidth }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      rotateY: isActive ? 0 : index < activeSlide ? 35 : -35,
                      filter: isActive ? "brightness(1) blur(0px)" : "brightness(0.5) blur(1px)",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`relative w-full aspect-[4/5] md:aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl ${
                      isActive 
                        ? "shadow-blue-500/20 border-2 border-blue-100" 
                        : "shadow-transparent"
                    }`}
                  >
                    <img
                      src={slide.image}
                      className="w-full h-full object-cover select-none"
                      alt={slide.title}
                      draggable="false"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent" />

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-16 px-6 text-center"
                        >
                          <div className="text-2xl sm:text-3xl font-extrabold tracking-wide pb-5">
                              <span className="text-white">Fashion</span>
                              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                                Store
                              </span>
                            </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link 
                              to="/data" 
                              className="px-8 md:px-12 py-3 md:py-4 bg-white text-blue-600 text-[10px] md:text-xs font-bold rounded-full shadow-xl uppercase tracking-widest hover:bg-blue-50 transition-colors"
                            >
                              Explore Course
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SectionBottom;