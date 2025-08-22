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
    date: "14 Aug 2025",
    title: "But Doesn't That Make Hiring... Less Human?",
    description: "Great question. And nope. Quite the opposite, actually.",
    backgroundImage: "/image/background/bg_image_3.png",
    link: "/explore/details"
  },
  {
    id: 2,
    date: "18 Aug 2025",
    title: "TL;DR?",
    description: "Hiring doesn't have to feel like herding cats while answering emails in a burning building.",
    backgroundImage: "/image/background/bg_image_4.png",
    link: "/explore/details"
  },
  {
    id: 3,
    date: "18 Aug 2025",
    title: "Real Talk: What Kind of Results Are We Talking?",
    description: "Increased peace of mind, slightly smug smiles, and more lunch breaks.",
    backgroundImage: "/image/background/bg_image_5.png",
    link: "/explore/details"
  }
];

export default function MobileBlogResource() {
  const [activeTab, setActiveTab] = useState<'sub-task' | 'whitepaper'>('sub-task');

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 bg-transparent">
        {/* ---- "Blog" pill ---- */}
        <div className="mt-12 mb-8 relative z-10">
          <div 
            className="bg-[#028374] text-white px-6 py-1 rounded-full font-medium flex items-center justify-center"
            style={{
              width: '98px',
              height: '25px',
              fontSize: '14px',
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            Blog
          </div>
        </div>

        {/* ---- Main Heading ---- */}
        <div className="text-center w-full max-w-sm mx-auto relative z-10 mb-8">
          <h1 
            className="tracking-tight mb-6 font-medium bg-white text-transparent bg-clip-text"
            style={{
              fontSize: '48px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.2'
            }}
          >
            Smart Ideas, No
            <br />
            Robot Jargon
          </h1>
        </div>

        {/* Navigation Pills */}
        <div className="flex gap-4 mb-8">
          <motion.button
            onClick={() => setActiveTab('sub-task')}
            className={`px-4 py-1 rounded-full font-medium flex items-center justify-center ${
              activeTab === 'sub-task'
                ? 'bg-[#028374] text-white'
                : 'bg-white text-black'
            }`}
            style={{ 
              minWidth: '98px',
              height: '25px',
              fontSize: '14px',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sub-task
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('whitepaper')}
            className={`px-4 py-1 rounded-full font-medium flex items-center justify-center ${
              activeTab === 'whitepaper'
                ? 'bg-[#028374] text-white'
                : 'bg-white text-black'
            }`}
            style={{ 
              minWidth: '98px',
              height: '25px',
              fontSize: '14px',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Whitepaper
          </motion.button>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-8 px-4">
        <div className="max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'sub-task' ? (
              /* Blog Cards in vertical stack */
              <motion.div 
                key="sub-task"
                className="flex flex-col gap-6"
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
                    <Link href={post.link}>
                      <MobileBlogCard post={post} />
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
                    fontSize: '24px',
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
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  We're working on bringing you amazing whitepaper content
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Mobile Blog Card Component
interface BlogCardProps {
  post: BlogPost;
}

function MobileBlogCard({ post }: BlogCardProps) {
  const cardHeight = "313px";
  const cardWidth = "319px";

  return (
    <div
      className="relative overflow-hidden cursor-pointer shadow-xl rounded-2xl mx-auto"
      style={{ 
        width: cardWidth, 
        height: cardHeight
      }}
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
      <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white text-left">
        
        {/* Date */}
        <div className="font-medium opacity-90 mb-4" style={{ fontSize: '20px', fontFamily: 'Manrope, sans-serif' }}>
          {post.date}
        </div>

        {/* Title and Description */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-light mb-3 leading-tight" style={{ fontSize: '32px', fontFamily: 'Manrope, sans-serif' }}>
            {post.title}
          </h3>
          
          <p className="opacity-90 leading-relaxed font-light" style={{ fontSize: '18px', fontFamily: 'Manrope, sans-serif' }}>
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
} 