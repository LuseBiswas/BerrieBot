'use client';

import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  animationDelay: number;
  animationDuration: number;
}

interface StarCardBGProps {
  children?: React.ReactNode;
  className?: string;
  starCount?: number;
}

const StarCardBG: React.FC<StarCardBGProps> = ({ 
  children, 
  className = '', 
  starCount = 50 
}) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1, // 1-4px
          brightness: Math.random() * 0.8 + 0.2, // 0.2-1.0 opacity
          animationDelay: Math.random() * 4, // 0-4s delay
          animationDuration: Math.random() * 3 + 2, // 2-5s duration
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [starCount]);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {/* Stars container */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.brightness,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StarCardBG; 