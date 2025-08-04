"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogDetail() {
  return (
    <div className="mt-36 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link 
              href="/resources/explore" 
              className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Blog
            </Link>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              className="text-gray-400"
            >
              <path 
                d="M6 3l5 5-5 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <div className="bg-[#04BBA6] text-white px-6 py-3 rounded-full font-medium">
              Berri-Bytes
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-96 rounded-3xl overflow-hidden">
            <Image
              src="/image/background/detail_1.png"
              alt="Blog Hero Image"
              fill
              className="object-cover"
            />
            
            
            {/* Hero Text */}
            <div className="absolute inset-0 flex flex-col justify-center font-inter px-12">
              <h1 className="text-[48px] font-light text-black leading-tight mb-6">
                So... What Can AI Actually Do for Hiring?
              </h1>
              <p className="text-[22px] font-light text-black/90 max-w-2xl">
                Here&apos;s what smart teams are automating with tools like Berribot!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/image/profile/profile_1.jpg"
                alt="Sai Krishna"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Author Details */}
            <div className="flex items-center justify-between flex-1 text-[#04BBA6] font-inter text-[24px] font-light">
              <span>Sai Krishna, Design Responsible</span>
              <span className="text-gray-400">|</span>
              <span>5 - Minute Read</span>
              <span className="text-gray-400">|</span>
              <span>12 Dec 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Let&apos;s cut through the buzz. Everyone&apos;s talking about AI like it&apos;s the solution to everything from your inbox overload to world peace. But when it comes to hiring, what can it actually &ldquo;do&rdquo;—like, in real life, on your real team, with your real &ldquo;we-needed-this-yesterday&rdquo; timelines?
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Glad you asked.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Automate Candidate Outreach (Yes, Even the Follow-Ups)
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Sending messages to 200+ candidates manually is... well, not the best use of anyone&apos;s day. AI tools like Berribot can personalise outreach at scale—without sounding like a robot from 1999. It remembers names, roles, and context, and even nudges candidates who haven&apos;t responded.
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              <strong>Result:</strong> More replies. Less repetitive strain injury.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Screen Resumes Like a Machine (Because It Is One)
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              AI doesn&apos;t get bored reading résumés. It doesn&apos;t zone out after the 17th bullet point. It just reads, ranks, and sorts based on skills, keywords, experience, and relevance. Bonus: It does this in seconds, not hours.
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Double bonus: It&apos;s not judging fonts.
            </p>

            
          </div>
        </div>
      </div>
    </div>
  );
}
