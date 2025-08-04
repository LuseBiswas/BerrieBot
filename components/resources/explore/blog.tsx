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

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: "12 Dec 2025",
    title: "So... What Can AI Actually Do for Hiring?",
    description: "Here's what smart teams are automating with tools like Berribot!",
    backgroundImage: "/image/background/bg_image_2.png",
    link: "/explore/details"
  },
  {
    id: 2,
    date: "14 Aug 2025",
    title: "But Doesn't That Make Hiring... Less Human?",
    description: "Great question. And nope. Quite the opposite, actually.",
    backgroundImage: "/image/background/bg_image_3.png",
    link: "/explore/details"
  },
  {
    id: 3,
    date: "18 Aug 2025",
    title: "TL;DR?",
    description: "Hiring doesn't have to feel like herding cats while answering emails in a burning building.",
    backgroundImage: "/image/background/bg_image_4.png",
    link: "/explore/details"
  },
  {
    id: 4,
    date: "18 Aug 2025",
    title: "Real Talk: What Kind of Results Are We Talking?",
    description: "Increased peace of mind, slightly smug smiles, and more lunch breaks.",
    backgroundImage: "/image/background/bg_image_5.png",
    link: "/explore/details"
  },
  {
    id: 5,
    date: "18 Aug 2025",
    title: "How Smart Teams Are Using AI to Simplify Hiring?",
    description: "Welcome to modern recruitment—powered by panic, fuelled by caffeine.",
    backgroundImage: "/image/background/bg_image_6.png",
    link: "/explore/details"
  }
];

const categories = ["Berri-Byte", "Product", "Solutions", "Culture"];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("Berri-Byte");

  return (
    <div className="bg-transparent min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Navigation Pills */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-4 bg-transparent rounded-full p-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${
                  activeCategory === category
                    ? "bg-white text-[#04BBA6] border-[#04BBA6] hover:cursor-pointer"
                    : "text-white border-white hover:bg-white/10 hover:cursor-pointer"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="flex gap-6 justify-center">
          
          {/* Left Column - Tall Card */}
          <div className="flex-shrink-0">
            <Link href={blogPosts[0].link}>
              <BlogCard 
                post={blogPosts[0]} 
                isLarge={true}
              />
            </Link>
          </div>

          {/* Right Column - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.id} href={post.link}>
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  isLarge={false}
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
  isLarge: boolean;
}

function BlogCard({ post, isLarge }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardHeight = isLarge ? "666px" : "408px";
  const cardWidth = "416px";

  return (
    <div
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isHovered ? "scale-105 shadow-2xl" : "shadow-xl"
      }`}
      style={{ width: cardWidth, height: cardHeight }}
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
      
      {/* Dark overlay for text readability */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* Content */}
      <div className={`font-inter relative z-10 h-full flex flex-col justify-between p-8 ${
        isLarge ? "text-black" : "text-white"
      }`}>
        
        {/* Date */}
        <div className="text-[20px] font-medium opacity-90 mb-4">
          {post.date}
        </div>

        {/* Title and Description */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className={`font-light mb-4 leading-tight ${
            isLarge ? "text-[48px]" : "text-2xl"
          }`}>
            {post.title}
          </h3>
          
          <p className={`opacity-90 leading-relaxed font-light ${
            isLarge ? "text-[22px]" : "text-base"
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
              className={isLarge ? "text-black" : "text-white"}
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
