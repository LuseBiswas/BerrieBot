import Image from "next/image";

export default function Message() {
  return (
    <section className=" px-4 sm:px-6 relative overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-12 gap-x-4 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white/10"></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Main Heading */}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-inter font-[500] leading-tight mb-12">
          <span className="text-white">No more theatrics.</span><br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white to-[#252527] bg-clip-text text-transparent">
              Let&apos;s show you the magic.
            </span>
            {/* Star Image */}
            <Image
              src="/image/components/Start_blue.png"
              alt="Star"
              width={50}
              height={50}
              className="absolute -top-4 -right-12"
            />
          </span>
        </h2>

        {/* Subtext */}
        <div className="text-lg sm:text-[36px] text-white/80 font-inter font-[400]">
          <p className="mb-2">Pssst....</p>
          <p>We&apos;ll keep it short. We know you&apos;ve got</p>
          <p>interviews to run.</p>
        </div>
      </div>
    </section>
  );
} 