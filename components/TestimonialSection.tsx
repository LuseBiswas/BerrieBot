import Image from "next/image";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialSection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          {/* Heading Text with Inverted Comma */}
          <div className="relative inline-block">
            {/* Inverted Comma Image - positioned at top left */}
            <Image
              src="/image/components/inverted_comma.png"
              alt="Inverted Comma"
              width={40}
              height={40}
              className="absolute -top-8 -left-10 w-12 h-12 sm:w-14 sm:h-14"
            />
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-inter font-[500] leading-snug">
              <span className="text-white">Wondering why</span><br />
              <span className="text-[#04BBA6]">BerriBot</span>{" "}
              <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                is built for<br />
                modern hiring?
              </span>
            </h2>
          </div>
        </div>

        {/* Overlapping Cards Layout */}
        <div className="relative min-h-[750px] max-w-5xl mx-auto">
          {/* Recruiters Card (top-left) */}
          <div className="my-8 lg:my-0 lg:absolute lg:top-0 lg:left-[-300] lg:w-[48%] z-20">
            <TestimonialCard
              variant="gray"
              title="Recruiters"
              description="Let AI handle repetitive tasks, so you can focus on decisions."
              buttonText="Learn More"
              icon={
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            }
          />
          </div>

           {/* CHROs & Leaders Card (bottom-left) */}
           <div className="my-8 lg:my-0 lg:absolute lg:bottom-[150] lg:left-[120] lg:w-[48%] z-10">
            <TestimonialCard
              variant="gray"
              title="CHROs & Leaders"
              description="Reduce cost per hire, stop fraud, and deliver enterprise-wide scale—without adding headcount."
              buttonText="Learn More"
              icon={
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="16,11 18,13 22,9" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            }
          />
          </div>

          {/* Candidates Card (center, prominent) */}
          <div className="my-8 lg:my-0 lg:absolute lg:top-[100] lg:left-[650] lg:-translate-x-1/2 lg:w-[48%] z-30">
            <TestimonialCard
              variant="blue"
              title="Candidates"
              description="Interview anytime, anywhere. No waiting. No awkward silence. Just a conversation with our AI."
              buttonText="Learn More"
              icon={
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            }
          />
          </div>

         

          {/* Compliance Card (bottom-right) */}
          <div className="my-8 lg:my-0 lg:absolute lg:bottom-[80] lg:right-[-280] lg:w-[48%] z-40">
            <TestimonialCard
              variant="gray"
              title="Compliance"
              description="Bias-tested. Audit-ready. Secure by design. Built for DDPR, GDPR, NYC 144."
              buttonText="Learn More"
              icon={
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            }
          />
          </div>
        </div>
      </div>
    </section>
  );
}