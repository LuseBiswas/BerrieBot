"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  href: string;
  children: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function AnimatedButton({ href, children, className = "", icon }: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Split text into individual characters
  const characters = children.split("");

  return (
    <Link href={href}>
      <motion.div
        className={`relative overflow-hidden px-6 py-2 rounded-full font-medium cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ backgroundColor: "#ffffff", scale: 1, borderColor: "transparent" }}
        animate={{ 
          backgroundColor: isHovered ? "#000000" : "#ffffff",
          scale: isHovered ? 1.05 : 1,
          borderColor: isHovered ? "#ffffff" : "transparent"
        }}
        transition={{ duration: 0.2 }}
        style={{ border: "2px solid" }}
      >
        <div className="relative flex items-center">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ color: "#000000" }}
              animate={{ 
                color: isHovered ? "#ffffff" : "#000000",
                y: isHovered ? [-20, 0] : [0, -20, 0]
              }}
              transition={{ 
                duration: 0.25,
                delay: index * 0.03,
                ease: "easeInOut"
              }}
              style={{ minWidth: char === " " ? "0.25rem" : "auto" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {icon && (
            <motion.span
              className="inline-block ml-2"
              initial={{ color: "#000000" }}
              animate={{ 
                color: isHovered ? "#ffffff" : "#000000",
                y: isHovered ? [-20, 0] : [0, -20, 0]
              }}
              transition={{ 
                duration: 0.25,
                delay: characters.length * 0.03,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.span>
          )}
        </div>
        
        {/* Duplicate text for slot machine effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          {characters.map((char, index) => (
            <motion.span
              key={`duplicate-${index}`}
              className="inline-block"
              initial={{ 
                color: "#ffffff",
                y: 20,
                opacity: 0
              }}
              animate={{ 
                color: isHovered ? "#ffffff" : "#000000",
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ 
                duration: 0.25,
                delay: index * 0.03,
                ease: "easeInOut"
              }}
              style={{ minWidth: char === " " ? "0.25rem" : "auto" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {icon && (
            <motion.span
              className="inline-block ml-2"
              initial={{ 
                color: "#ffffff",
                y: 20,
                opacity: 0
              }}
              animate={{ 
                color: isHovered ? "#ffffff" : "#000000",
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ 
                duration: 0.25,
                delay: characters.length * 0.03,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.span>
          )}
        </div>
      </motion.div>
    </Link>
  );
} 