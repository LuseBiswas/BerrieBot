"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ValuesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress for different animations
  const horizontalLinesProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const verticalLinesProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const contentProgress = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  // Carousel state
  const [currentSection, setCurrentSection] = useState(0); // 0: Mission, 1: Vision, 2: Values
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // -1: left, 1: right

  // Dummy slide data
  const sections = useMemo(() => [
    {
      title: "Mission",
      slides: [
        {
          title: "Automate. Innovate. Transform.<br/>(And maybe make your Mondays better)",
          
          content: "We're here to rescue teams from soul-sucking tasks. Berribot automates the repetitive stuff—calls, scheduling, sorting, screening - so real humans (aka you) can shine where it matters most. Basically, we help people do less busywork and more \"heck yes\" work."
        }
      ]
    },
    {
      title: "Vision",
      slides: [
        {
          title: "Let the Bots Handle the Blah, <br/> You Handle the Brilliance.",
         
          content: "We imagine a future where machines do what they’re built for—and people do what only people can do: dream, solve, create, and connect.  At Berribot, we’re all about that sweet spot where AI and humans tag-team like champions."
        }
      ]
    },
    {
      title: "Values",
      slides: [
        {
          subtitle: "We believe",
          title: "Integrity",
          content: "We keep it real. We do the right thing even when no one's watching (but let’s be honest, someone’s always watching)."
        },
        {
          subtitle: "We believe",
          title: "Togetherness",
          content: "Teamwork makes the Berri work. We like working with nice people who listen, share snacks, and cheer each other on."
        },
        {
          subtitle: "We believe",
          title: "Ambition",
          content: "We're not here to be average. We’re here to be awesome. We ask questions, break things (on purpose), and always aim higher."
        }
      ]
    }
  ], []);

  // Navigation functions
  const goToSection = (sectionIndex: number) => {
    setSlideDirection(sectionIndex > currentSection ? 1 : -1);
    setCurrentSection(sectionIndex);
    setCurrentSlide(0);
  };

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setSlideDirection(-1);
      setCurrentSlide(currentSlide - 1);
    } else {
      setSlideDirection(-1);
      setCurrentSlide(sections[currentSection].slides.length - 1);
    }
  }, [currentSlide, currentSection, sections]);

  const goToNextSlide = useCallback(() => {
    if (currentSlide < sections[currentSection].slides.length - 1) {
      setSlideDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      setSlideDirection(1);
      setCurrentSlide(0);
    }
  }, [currentSlide, currentSection, sections]);

  const currentSlideData = sections[currentSection].slides[currentSlide];

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (event.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, currentSlide, goToPrevSlide, goToNextSlide]);

  return (
    <section ref={ref} className="py-16 sm:py-3.5 bg-[#E0E0E0]">
      <div className="relative">
        {/* Horizontal lines that extend full width */}
        <motion.div 
          className="absolute left-0 right-0 top-0 h-[1px] bg-black origin-right"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 top-[96px] h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-[96px] h-[1px] bg-black origin-right"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-0 h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        
        {/* Content container with vertical lines */}
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Vertical lines */}
            <motion.div 
              className="absolute inset-y-0 left-[12.42%] border-l border-black pointer-events-none hidden lg:block origin-bottom"
              style={{ scaleY: verticalLinesProgress }}
            />
            <motion.div 
              className="absolute inset-y-0 right-[12.5%] border-l border-black pointer-events-none hidden lg:block origin-top"
              style={{ scaleY: verticalLinesProgress }}
            />

            {/* Single grid controlling all three rows */}
            <motion.div 
              className="grid grid-cols-1 sm:[grid-template-columns:0.5fr_1fr_1fr_1fr_0.5fr]"
              style={{ opacity: contentProgress }}
            >
              {/* --- Top row: 5 columns with middle 3 having text --- */}
              {/* Column 1: Empty */}
              <motion.div
                className="p-8 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                viewport={{ once: true }}
              >
                {/* Empty */}
              </motion.div>
              
              {/* Columns 2-4: Mission, Vision, Values */}
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  className="p-8 flex items-center justify-center h-24 lg:border-r lg:border-black cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => goToSection(i)}
                >
                  <h3 className={`text-2xl font-inter font-light transition-colors ${
                    currentSection === i ? 'text-black' : 'text-[#3D3D3D94]'
                  }`}>
                    {section.title}
                  </h3>
                </motion.div>
              ))}
              
              {/* Column 5: Empty */}
              <motion.div
                className="p-8 flex items-center justify-center h-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Empty */}
              </motion.div>

              {/* --- Left Navigation Arrow (Column 1) --- */}
              {sections[currentSection].slides.length > 1 && (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={goToPrevSlide}
                    disabled={currentSlide === 0}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full transition-all duration-200"
                  >
                    <ChevronLeft 
                      className={`w-8 h-8 transition-colors ${
                        currentSlide === 0
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-[#04BBA6] hover:text-[#03A094] hover:cursor-pointer'
                      }`}
                    />
                  </motion.button>
                </motion.div>
              )}

              {/* Show empty div when no arrows needed to maintain grid layout */}
              {sections[currentSection].slides.length <= 1 && (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {/* Empty */}
                </motion.div>
              )}

              {/* --- Middle section with content (spans middle 3 columns) --- */}
              <div className="col-span-1 sm:col-span-3 relative bg-black overflow-hidden">
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={`${currentSection}-${currentSlide}`}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.3
                    }}
                    className="py-16 px-4 text-center"
                  >
                    {'subtitle' in currentSlideData && currentSlideData.subtitle && (
                      <h3 className="text-[24px] sm:text-[24px] font-extralight text-white font-inter">
                        {currentSlideData.subtitle}
                      </h3>
                    )}
                    <h2 
                      className="text-[48px] sm:text-[48px] lg:text-[48px] font-inter font-medium text-teal-400 leading-tight mx-auto max-w-2xl mb-10"
                      dangerouslySetInnerHTML={{ __html: currentSlideData.title }}
                    />
                    <p className="text-base sm:text-xl font-inter font-thin text-white leading-relaxed mx-auto max-w-2xl">
                      {currentSlideData.content}
                    </p>
                    
                    {/* Slide indicators */}
                    {/* <div className="flex justify-center mt-8 space-x-2">
                      {sections[currentSection].slides.map((_, slideIndex) => (
                        <button
                          key={slideIndex}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            slideIndex === currentSlide ? 'bg-teal-400' : 'bg-gray-600'
                          }`}
                          onClick={() => goToSlide(slideIndex)}
                        />
                      ))}
                    </div> */}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* --- Right Navigation Arrow (Column 5) --- */}
              {sections[currentSection].slides.length > 1 && (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={goToNextSlide}
                    disabled={currentSlide === sections[currentSection].slides.length - 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full transition-all duration-200"
                  >
                    <ChevronRight 
                      className={`w-8 h-8 transition-colors ${
                        currentSlide === sections[currentSection].slides.length - 1
                          ? 'text-gray-300 cursor-not-allowed' 
                          : 'text-[#04BBA6] hover:text-[#03A094] hover:cursor-pointer'
                      }`}
                    />
                  </motion.button>
                </motion.div>
              )}

              {/* Show empty div when no arrows needed to maintain grid layout */}
              {sections[currentSection].slides.length <= 1 && (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {/* Empty */}
                </motion.div>
              )}

              {/* --- Bottom row: 5 empty sections --- */}
              {[1, 2, 3, 4, 5].map((item, i) => (
                <motion.div
                  key={item}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 4 ? "lg:border-r" : ""
                  } lg:border-black`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Empty for now */}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
