"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

  // Dummy slide data
  const sections = [
    {
      title: "Mission",
      slides: [
        {
          title: "Mission Slide 1",
          subtitle: "Our Purpose & Direction",
          content: "We're here to rescue teams from soul-sucking tasks. Berribot automates the repetitive stuff—calls, scheduling, sorting, screening - so real humans (aka you) can shine where it matters most."
        },
        {
          title: "Mission Slide 2", 
          subtitle: "Impact & Goals",
          content: "Basically, we help people do less busywork and more 'heck yes' work. Our mission is to transform how teams work by eliminating the mundane."
        }
      ]
    },
    {
      title: "Vision",
      slides: [
        {
          title: "Vision Slide 1",
          subtitle: "Future of Work",
          content: "We envision a world where AI handles the boring stuff, freeing humans to focus on creativity, strategy, and meaningful connections."
        },
        {
          title: "Vision Slide 2",
          subtitle: "Global Impact",
          content: "Our vision extends to transforming workplaces globally, making every Monday feel like a breakthrough instead of a breakdown."
        },
        {
          title: "Vision Slide 3",
          subtitle: "Innovation Leadership",
          content: "Leading the charge in AI-powered automation, we're building the future where technology serves humanity's highest potential."
        }
      ]
    },
    {
      title: "Values",
      slides: [
        {
          title: "Values Slide 1",
          subtitle: "Core Principles",
          content: "Human-first automation. Transparency. Innovation with purpose. We believe technology should amplify human capabilities, not replace human judgment."
        }
      ]
    }
  ];

  // Navigation functions
  const goToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    setCurrentSlide(0);
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentSlide(sections[currentSection - 1].slides.length - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < sections[currentSection].slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentSlide(0);
    }
  };

  const currentSlideData = sections[currentSection].slides[currentSlide];

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
  }, [currentSection, currentSlide]);

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
              className="absolute inset-y-0 left-[12.5%] border-l border-black pointer-events-none hidden lg:block origin-bottom"
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
                  <h3 className={`text-2xl font-medium transition-colors ${
                    currentSection === i ? 'text-black' : 'text-gray-400'
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
              <motion.div 
                className="flex items-center justify-center cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={goToPrevSlide}
              >
                <ChevronLeft 
                  className={`w-8 h-8 transition-colors ${
                    (currentSection === 0 && currentSlide === 0) 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-black hover:text-gray-600'
                  }`}
                />
              </motion.div>

              {/* --- Middle section with content (spans middle 3 columns) --- */}
              <motion.div 
                className="col-span-1 sm:col-span-3 relative py-16 px-4 text-center bg-black"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                key={`${currentSection}-${currentSlide}`}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-teal-400 leading-tight mx-auto max-w-2xl mb-4">
                  {currentSlideData.title}
                </h2>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-6">
                  {currentSlideData.subtitle}
                </h3>
                <p className="text-base sm:text-lg text-white leading-relaxed mx-auto max-w-2xl">
                  {currentSlideData.content}
                </p>
                
                {/* Slide indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {sections[currentSection].slides.map((_, slideIndex) => (
                    <button
                      key={slideIndex}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        slideIndex === currentSlide ? 'bg-teal-400' : 'bg-gray-600'
                      }`}
                      onClick={() => setCurrentSlide(slideIndex)}
                    />
                  ))}
                </div>
              </motion.div>

              {/* --- Right Navigation Arrow (Column 5) --- */}
              <motion.div 
                className="flex items-center justify-center cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={goToNextSlide}
              >
                <ChevronRight 
                  className={`w-8 h-8 transition-colors ${
                    (currentSection === sections.length - 1 && currentSlide === sections[currentSection].slides.length - 1) 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-black hover:text-gray-600'
                  }`}
                />
              </motion.div>

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
