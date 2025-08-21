"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function BlogResource() {
  return (
    <div className="bg-black ">
      {/* Hero Section */}
      <section id="blogs" className="relative  flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
        {/* ---- Pills ---- */}
        <div className="mt-12 mb-12 relative z-10 flex gap-4">
          <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Sub-stack
          </div>
          <div className="bg-white text-black px-6 py-1 rounded-full font-inter font-medium text-lg">
            White Papers
          </div>
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

      {/* Blog Cards Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Blog Cards in horizontal layout */}
          <div className="flex gap-6 justify-center">
            {blogPosts.map((post) => (
              <Link key={post.id} href={post.link}>
                <BlogCard 
                  post={post} 
                />
              </Link>
            ))}
          </div>
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