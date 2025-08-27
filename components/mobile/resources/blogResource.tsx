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

// LinkedIn post data interface (same structure as BlogPost)
interface LinkedInPost {
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
    description: "Welcome to Berri Bytes, our attempt at making a guide...",
    backgroundImage: "/image/background/bg_image_3.png",
    link: "https://berribot.substack.com/p/recruitment-is-stuck-we-are-bringing?r=5zrtcb&utm_campaign=post&utm_medium=web&triedRedirect=true"
  },
  {
    id: 2,
    date: "Jul 29, 2025",
    title: "Will 'Comet' Replace Recruiters?",
    description: "AI Will Not Replace Recruiters. But Recruiters Who Use AI Will Replace Those Who Don't.",
    backgroundImage: "/image/background/bg_image_4.png",
    link: "https://berribot.substack.com/p/will-comet-replace-recruiters?r=5zrtcb&utm_campaign=post&utm_medium=web&triedRedirect=true"
  },
  {
    id: 3,
    date: "Aug 12, 2025",
    title: "The Five Rules of Building Empathetic AI in Hiring",
    description: "In a world of automation, the companies that win...",
    backgroundImage: "/image/background/bg_image_5.png",
    link: "https://berribot.substack.com/p/the-five-rules-of-building-empathetic?r=5zrtcb&utm_campaign=post&utm_medium=web&triedRedirect=true"
  }
];

// Sample LinkedIn posts data for mobile
const linkedInPosts: LinkedInPost[] = [
  {
    id: 4,
    date: "Aug 22, 2025",
    title: "Recruitment has been a $600 B problem solved with extra phone calls.",
    description: "What if technology could rewrite that?",
    backgroundImage: "/image/background/Rectangle45.png",
    link: "https://www.linkedin.com/posts/activity-7364499088538599425-NGN0?utm_source=share&utm_medium=member_android&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM"
  },
  {
    id: 5,
    date: "Aug 13, 2025",
    title: "There is a ghost in the hiring machine",
    description: "U.S. hiring managers have been ghosted by Gen Z candidates, sometimes even after an offer was accepted.",
    backgroundImage: "/image/background/2.png",
    link: "https://www.linkedin.com/posts/activity-7361362291948208128-tHMR?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 6,
    date: "Aug 06, 2025",
    title: "Candidates hate talking to bots!",
    description: "Everyone disconnects the moment they hear ‘Hello!’",
    backgroundImage: "/image/background/3.png",
    link: "https://www.linkedin.com/posts/activity-7361362291948208128-tHMR?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 7,
    date: "July 30, 2025",
    title: "Many recruiters are still living on excel sheets.",
    description: "Dozens of email threads just to share info. Systems that don’t talk to each other.",
    backgroundImage: "/image/background/4.png",
    link: "https://www.linkedin.com/posts/activity-7351936512747327491-b-eO?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 8,
    date: "August 08, 2025",
    title: "Hiring can literally make or break your brand.",
    description: " If you think that the candidate experience is just about hiring, you’re dead wrong.",
    backgroundImage: "/image/background/5.png",
    link: "https://www.linkedin.com/posts/activity-7351936512747327491-b-eO?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 9,
    date: "August 20, 2025",
    title: "Speed.",
    description: " One recruitment variable can now make or break effectiveness of modern recruiting.",
    backgroundImage: "/image/background/Variant6.png",
    link: "https://www.linkedin.com/posts/satishjeyaraman_one-recruitment-variable-can-now-make-or-activity-7361717177827184640-f8qs?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 10,
    date: "August 13, 2025",
    title: "Record-setting recruitment event.",
    description: "Hired 1,900+ people in a single day for a major services firm",
    backgroundImage: "/image/background/7.png",
    link: "https://www.linkedin.com/posts/satishjeyaraman_talentleadership-aiinhiring-recruitmentinnovation-activity-7359187811494707200-U0Sd?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 11,
    date: "August 06, 2025",
    title: "Lot of time and effort to convince.",
    description: "A senior leader of a business unit hated the idea of AI in recruiting.",
    backgroundImage: "/image/background/8.png",
    link: "https://www.linkedin.com/posts/satishjeyaraman_airecruiting-futureofwork-talentleadership-activity-7356647460968022018-6LPY?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 12,
    date: "August 26, 2025",
    title: "40% of companies now use AI.",
    description: "It’s becoming the foundation of how talent acquisition runs.",
    backgroundImage: "/image/background/9.png",
    link: "https://www.linkedin.com/posts/berribot_over-40-of-companies-now-use-ai-in-their-activity-7365965592689823744-xRKw?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 13,
    date: "August 21, 2025",
    title: "What’s worse than a bad interview?",
    description: "A bad interview with a bot.",
    backgroundImage: "/image/background/10.png",
    link: "https://www.linkedin.com/posts/berribot_empathetic-hiring-with-ai-activity-7363423489657069569-bMtS?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 14,
    date: "August 21, 2025",
    title: "78% in savings.",
    description: "One of our big customers cut offer TAT from 25 to 10 days.",
    backgroundImage: "/image/background/11.png",
    link: "https://www.linkedin.com/posts/berribot_berrimastermind-aihiring-smartscreening-activity-7361592478795194370-jkbT?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 15,
    date: "August 13, 2025",
    title: "You don’t need more recruiters.",
    description: "Hiring at scale often feels like chasing your own tail.",
    backgroundImage: "/image/background/12.png",
    link: "https://www.linkedin.com/posts/berribot_berriconnect-candidateengagement-recruitmentops-activity-7359070962983555076-KqEl?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 16,
    date: "August 13, 2025",
    title: "Juggling a dozen tools?",
    description: "We get it. We've been there.",
    backgroundImage: "/image/background/13.png",
    link: "https://www.linkedin.com/posts/berribot_we-get-it-weve-been-there-juggling-a-activity-7357983831397711872-qy3U?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  },
  {
    id: 17,
    date: "July 30, 2025",
    title: "Reality for many recruiters today,",
    description: "Imagine screening 3,000 resumes to make 30 offers.",
    backgroundImage: "/image/background/14.png",
    link: "https://www.linkedin.com/posts/berribot_imagine-screening-3000-resumes-to-make-30-activity-7355801920105537536-zMwI?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAF3CMYB_1d51Dr4a4TvfbxFzNYGEXVpeIM&utm_campaign=copy_link"
  }
];

export default function MobileBlogResource() {
  const [activeTab, setActiveTab] = useState<'all' | 'sub-task' | 'whitepaper' | 'linkedin'>('all');
  const [visibleCardsCount, setVisibleCardsCount] = useState(2);

  // Combine all posts for the "All" tab
  const allPosts = [...blogPosts, ...linkedInPosts];
  const cardsPerPage = 2; // Mobile shows 2 cards per page
  const hasMoreCards = allPosts.length > visibleCardsCount;

  const handleShowMore = () => {
    setVisibleCardsCount(prev => Math.min(prev + cardsPerPage, allPosts.length));
  };

  // Reset visible cards when switching tabs
  const handleTabChange = (tab: 'all' | 'sub-task' | 'whitepaper' | 'linkedin') => {
    setActiveTab(tab);
    if (tab === 'all') {
      setVisibleCardsCount(2);
    }
  };

  return (
    <div className="bg-transparent">
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
        <div className="grid grid-cols-2 gap-3 mb-8 px-4 max-w-xs mx-auto">
          <motion.button
            onClick={() => handleTabChange('all')}
            className={`px-4 py-1 rounded-full font-medium flex items-center justify-center ${
              activeTab === 'all'
                ? 'bg-[#028374] text-white'
                : 'bg-white text-black'
            }`}
            style={{ 
              height: '25px',
              fontSize: '14px',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            All
          </motion.button>
          <motion.button
            onClick={() => handleTabChange('sub-task')}
            className={`px-4 py-1 rounded-full font-medium flex items-center justify-center ${
              activeTab === 'sub-task'
                ? 'bg-[#028374] text-white'
                : 'bg-white text-black'
            }`}
            style={{ 
              height: '25px',
              fontSize: '14px',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sub-stack
          </motion.button>
          <motion.button
            onClick={() => handleTabChange('whitepaper')}
            className={`px-4 py-1 rounded-full font-medium flex items-center justify-center ${
              activeTab === 'whitepaper'
                ? 'bg-[#028374] text-white'
                : 'bg-white text-black'
            }`}
            style={{ 
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
          <motion.button
            onClick={() => handleTabChange('linkedin')}
            className={`px-4 py-1 rounded-full font-medium flex items-center justify-center ${
              activeTab === 'linkedin'
                ? 'bg-[#028374] text-white'
                : 'bg-white text-black'
            }`}
            style={{ 
              height: '25px',
              fontSize: '14px',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            LinkedIn
          </motion.button>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-8 px-4">
        <div className="max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'all' ? (
              /* All Posts in vertical stack */
              <motion.div 
                key="all-posts"
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {allPosts.slice(0, visibleCardsCount).map((post, index) => (
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
                      <MobileBlogCard post={post} />
                    </Link>
                  </motion.div>
                ))}
                {hasMoreCards && (
                  <motion.button
                    onClick={handleShowMore}
                    className="flex flex-col items-center justify-center py-4 group mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300 mb-2">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        className="text-white"
                      >
                        <path 
                          d="M7 10l5 5 5-5" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span 
                      className="text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        fontSize: '12px',
                        fontFamily: 'Manrope, sans-serif'
                      }}
                    >
                      Show More
                    </span>
                  </motion.button>
                )}
              </motion.div>
            ) : (
              /* Specific Tab Content */
              activeTab === 'sub-task' ? (
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
                      <Link href={post.link} target="_blank" rel="noopener noreferrer">
                        <MobileBlogCard post={post} />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : activeTab === 'whitepaper' ? (
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
                    We&apos;re working on bringing you amazing whitepaper content
                  </motion.div>
                </motion.div>
              ) : (
                /* LinkedIn Posts in vertical stack */
                <motion.div 
                  key="linkedin"
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {linkedInPosts.map((post, index) => (
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
                        <MobileBlogCard post={post} />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Mobile Blog Card Component
interface BlogCardProps {
  post: BlogPost | LinkedInPost; // Updated to accept either BlogPost or LinkedInPost
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