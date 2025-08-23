"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { 
  trackYouTubePlay, 
  trackYouTubePause, 
  trackYouTubeComplete, 
  trackYouTubeSeek, 
  trackYouTubeMute, 
  trackYouTubeProgress 
} from "@/utils/analytics";

// YouTube Player type definitions
interface YTPlayer {
  getPlayerState(): number;
  getCurrentTime(): number;
  getDuration(): number;
  isMuted(): boolean;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

// Declare YouTube API types
declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement, config: {
        videoId: string;
        playerVars: Record<string, unknown>;
        events: {
          onReady: (event: YTEvent) => void;
          onStateChange: (event: YTEvent) => void;
        };
      }) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MobileHeroSection() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');
  const [player, setPlayer] = useState<YTPlayer | null>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [progressMarkers, setProgressMarkers] = useState<Record<number, boolean>>({
    25: false, 50: false, 75: false, 100: false
  });
  const playerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lastSeekTime = useRef<number>(0);

  const VIDEO_ID = "ww3flTt--Xw";

  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else {
      setIsAPIReady(true);
    }
  }, []);

  const handleStateChange = useCallback((event: YTEvent) => {
    const state = event.data;
    const currentTime = player?.getCurrentTime() || 0;
    const duration = player?.getDuration() || 0;

    switch (state) {
      case window.YT.PlayerState.PLAYING:
        // Check if user seeked (significant time jump)
        if (Math.abs(currentTime - lastSeekTime.current) > 2) {
          trackYouTubeSeek(VIDEO_ID, pathname, 'mobile', lastSeekTime.current, currentTime);
        }
        trackYouTubePlay(VIDEO_ID, pathname, 'mobile', 'Hero Video');
        lastSeekTime.current = currentTime;
        break;
      
      case window.YT.PlayerState.PAUSED:
        trackYouTubePause(VIDEO_ID, pathname, 'mobile', currentTime);
        lastSeekTime.current = currentTime;
        break;
      
      case window.YT.PlayerState.ENDED:
        trackYouTubeComplete(VIDEO_ID, pathname, 'mobile', duration);
        // Reset progress markers for potential replay
        setProgressMarkers({ 25: false, 50: false, 75: false, 100: false });
        break;
    }
  }, [player, pathname]);

  // Initialize YouTube player when API is ready
  useEffect(() => {
    if (isAPIReady && playerRef.current && !player) {
      new window.YT.Player(playerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (event: YTEvent) => {
            setPlayer(event.target);
          },
          onStateChange: handleStateChange
        }
      });
    }
  }, [isAPIReady, player, handleStateChange]);

  // Track video progress
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player.getPlayerState() === 1) { // Playing
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progress = Math.round((currentTime / duration) * 100);

        // Track progress milestones
        Object.keys(progressMarkers).forEach(milestone => {
          const milestoneNum = parseInt(milestone);
          if (progress >= milestoneNum && !progressMarkers[milestoneNum]) {
            setProgressMarkers(prev => ({ ...prev, [milestoneNum]: true }));
            trackYouTubeProgress(VIDEO_ID, pathname, 'mobile', milestoneNum);
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, progressMarkers, pathname]);

  // Track mute/unmute (check periodically as YouTube doesn't provide direct event)
  useEffect(() => {
    if (!player) return;

    let lastMuteState = true; // Video starts muted
    const checkMuteState = setInterval(() => {
      if (player.isMuted && player.isMuted() !== lastMuteState) {
        const isMuted = player.isMuted();
        trackYouTubeMute(VIDEO_ID, pathname, 'mobile', isMuted);
        lastMuteState = isMuted;
      }
    }, 1000);

    return () => clearInterval(checkMuteState);
  }, [player, pathname]);

  // Responsive sizing based on mobile dimensions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          videoWidth: '480px',
          videoHeight: '497px',
          pillWidth: '228px',
          pillHeight: '36px'
        };
      case 'tablet':
        return {
          videoWidth: '412px',
          videoHeight: '426px',
          pillWidth: '196px',
          pillHeight: '31px'
        };
      default: // mobile
        return {
          videoWidth: '343px',
          videoHeight: '355px',
          pillWidth: '163px',
          pillHeight: '26px'
        };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <motion.section 
      className="bg-transparent flex flex-col items-center justify-start px-4 pt-20 pb-8 relative overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="max-w-sm md:max-w-md lg:max-w-lg mx-auto relative flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* YouTube Video with Analytics Tracking */}
        <motion.div 
          className="rounded-2xl overflow-hidden mb-8 relative mx-auto"
          style={{
            width: sizes.videoWidth,
            height: sizes.videoHeight
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div
            ref={playerRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ 
              border: 'none',
              transform: 'scale(1.9)',
              transformOrigin: 'center center'
            }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="text-center px-4 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <p 
            className="text-white leading-relaxed text-[24px] md:text-[28px] lg:text-[32px]"
            style={{
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            Hi, This is Berri! <br /> Your AI recruiter
who interviews hundreds of candidates
while you focus on real work.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 