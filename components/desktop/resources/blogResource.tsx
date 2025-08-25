"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Blog post data interface
interface BlogPost {
  id: number;
  date: string;
  title: string;
  description: string;
  backgroundImage: string;
  link: string;
}

// Sample blog posts data for resource section
const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: "Jul 18, 2025",
    title: "Recruitment is stuck. We are bringing it to the future.",
    description: "Welcome to Berri Bytes, our attempt at making a guide for the future of hiring.",
    backgroundImage: "/image/background/bg_image_3.png",
    link: "https://berribot.substack.com/p/recruitment-is-stuck-we-are-bringing?r=5zrtcb&utm_campaign=post&utm_medium=web&triedRedirect=true"
  },
  {
    id: 2,
    date: "Jul 29, 2025",
    title: "Will ‘Comet’ Replace Recruiters?",
    description: "AI Will Not Replace Recruiters. But Recruiters Who Use AI Will Replace Those Who Don’t.",
    backgroundImage: "/image/background/bg_image_4.png",
    link: "https://berribot.substack.com/p/will-comet-replace-recruiters?r=5zrtcb&utm_campaign=post&utm_medium=web&triedRedirect=true"
  },
  {
    id: 3,
    date: "Aug 12, 2025",
    title: "The Five Rules of Building Empathetic AI in Hiring",
    description: "In a world of automation, the companies that win will be the ones that remember how it feels to apply for a job.",
    backgroundImage: "/image/background/bg_image_5.png",
    link: "https://berribot.substack.com/p/the-five-rules-of-building-empathetic?r=5zrtcb&utm_campaign=post&utm_medium=web&triedRedirect=true"
  }
];

export default function BlogResource() {
  const [activeTab, setActiveTab] = useState<'sub-task' | 'whitepaper'>('sub-task');

  return (
    <div className="bg-black ">
      {/* Hero Section */}
      <section id="blogs" className="relative  flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
        {/* ---- Pills ---- */}
        <div className="mt-12 mb-12 relative z-10 flex gap-4">
          <motion.button
            onClick={() => setActiveTab('sub-task')}
            className={`px-6 py-1 rounded-full font-inter font-medium text-lg cursor-pointer ${
              activeTab === 'sub-task'
                ? 'bg-[#00C7BEB2] text-white'
                : 'bg-white text-black'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sub-stack
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('whitepaper')}
            className={`px-6 py-1 rounded-full font-inter font-medium text-lg cursor-pointer ${
              activeTab === 'whitepaper'
                ? 'bg-[#00C7BEB2] text-white'
                : 'bg-white text-black'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            White Papers
          </motion.button>
        </div>

        {/* ---- Main Heading ---- */}
        <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
          <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-white "style={{ fontFamily: 'Manrope, sans-serif' }}>
            Smart Ideas, No
            <br />
            Robot Jargon
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'sub-task' ? (
              /* Blog Cards in horizontal layout */
              <motion.div 
                key="sub-task"
                className="flex gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    <Link href={post.link} target="_blank" rel="noopener noreferrer">
                      <BlogCard 
                        post={post} 
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Coming Soon Message for Whitepaper */
              <motion.div 
                key="whitepaper"
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <motion.div 
                  className="text-center text-white font-medium"
                  style={{
                    fontSize: '48px',
                    fontFamily: 'Manrope, sans-serif'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Content is coming soon
                </motion.div>
                <motion.div 
                  className="text-center text-white/70 mt-4 font-light"
                  style={{
                    fontSize: '24px',
                    fontFamily: 'Manrope, sans-serif'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  We&apos;re working on bringing you amazing whitepaper content
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Blog Card Component
interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const normalHeight = "408px";
  const hoverHeight = "666px";
  const cardWidth = "416px";

  return (
    <div
      className={`relative overflow-hidden cursor-pointer transition-all duration-700 bg-red-600 ${
        isHovered ? "scale-105 shadow-2xl rounded-3xl" : "shadow-xl rounded-[11%]"
      }`}
      style={{ 
        width: cardWidth, 
        height: isHovered ? hoverHeight : normalHeight,
        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={post.backgroundImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="font-inter relative z-10 h-full flex flex-col justify-between p-8 text-white">
        
        {/* Date */}
        <div className="text-[20px] font-medium opacity-90 mb-4">
          {post.date}
        </div>

        {/* Title and Description */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className={`font-light mb-4 leading-tight transition-all duration-700 ease-out ${
            isHovered ? "text-[48px]" : "text-2xl"
          }`}>
            {post.title}
          </h3>
          
          <p className={`opacity-90 leading-relaxed font-light transition-all duration-700 ease-out ${
            isHovered ? "text-[22px]" : "text-base"
          }`}>
            {post.description}
          </p>
        </div>

        {/* Hover Indicator */}
        {isHovered && (
          <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              className="text-white"
            >
              <path 
                d="M6 3l5 5-5 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
} 