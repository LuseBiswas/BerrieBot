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
              <span className="text-[#04BBA6]">One Platform.</span>{" "}
              <span className="text-white">Every</span><br />
              
              <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
               Recruiting Task.
              </span>
            </h2>
            <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              From outreach to offer, the Berri Suite delivers speed, <br /> accuracy, and security—on autopilot.
            </p>
          </div>
        </div>

        {/* Overlapping Cards Layout */}
        <div className="relative min-h-[750px] max-w-5xl mx-auto">
          {/* Recruiters Card (top-left) */}
          <div className="my-8 lg:my-0 lg:absolute lg:top-0 lg:left-[-200] lg:w-[48%] z-20">
            <TestimonialCard
              variant="gray"
              title="Digital Recruiter"
              description="Automatically search, connect and followup with candidates without getting overwhelmed."
              buttonText="Learn More"
              profileImage={{
                src: "/image/profile/profile_3.jpg",
                alt: "Recruiter Profile"
              }}
            />
          </div>

          {/* CHROs & Leaders Card (bottom-left) */}
          <div className="my-8 lg:my-0 lg:absolute lg:bottom-[310] lg:left-[220] lg:w-[48%] z-10">
            <TestimonialCard
              variant="gray"
              title="Digital Interviewer"
              description="Schedule and assess candidate skills with a 24/7 Agentic interviewer."
              buttonText="Learn More"
              profileImage={{
                src: "/image/profile/profile_2.jpg",
                alt: "CHRO Profile"
              }}
            />
          </div>

          {/* Candidates Card (center, prominent) */}
          {/* <div className="my-8 lg:my-0 lg:absolute lg:top-[100] lg:left-[650] lg:-translate-x-1/2 lg:w-[48%] z-30">
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
          </div> */}

         

          {/* Compliance Card (bottom-right) */}
          <div className="my-8 lg:my-0 lg:absolute lg:bottom-[450] lg:right-[-80] lg:w-[48%] z-40">
            <TestimonialCard
              variant="gray"
              title="Digital Proctor"
              description="Find verified candidates with advanced fraud detection, biometrics and authentication systems."
              buttonText="Learn More"
              profileImage={{
                src: "/image/profile/profile_1.jpg",
                alt: "Compliance Profile"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}