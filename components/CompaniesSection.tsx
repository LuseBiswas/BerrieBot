import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="py-16 sm:py-3.5 bg-[#E0E0E0]">
      <div className="relative">
        {/* Horizontal lines that extend full width */}
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-black" />
        <div className="absolute left-0 right-0 top-[96px] h-[1px] bg-black" />
        <div className="absolute left-0 right-0 bottom-[96px] h-[1px] bg-black" />
        <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-black" />
        
        {/* Content container with vertical lines */}
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Vertical lines */}
            <div className="absolute inset-y-0 left-[16.666%] border-l border-black pointer-events-none hidden lg:block" />
            <div className="absolute inset-y-0 right-0 border-l border-black pointer-events-none hidden lg:block" />

            {/* Single grid controlling all three rows */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {/* --- Top logos row (6 cols) --- */}
              {[
                { src: "/image/company/c_logo_1.png", alt: "Airbnb" },
                { src: "/image/company/c_logo_2.png", alt: "Canva" },
                { src: "/image/company/c_logo_3.png", alt: "Stripe" },
                { src: "/image/company/c_logo_4.png", alt: "Booking.com" },
                { src: "/image/company/c_logo_5.png", alt: "Amazon" },
                { src: "/image/company/c_logo_6.png", alt: "Google" },
              ].map((c, i) => (
                <div
                  key={c.alt}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 5 ? "lg:border-r" : ""
                  } lg:border-black`}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={100}
                    height={30}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}

              {/* --- Testimonial row (spans full width) --- */}
              <div className="col-span-2 sm:col-span-3 lg:col-span-6 relative py-16 px-8 text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#3D3D3D] leading-tight mx-auto max-w-2xl">
                  Used by teams at Cognizant,
                  <br />
                  Wipro, LTIMindtree,
                  <br />
                  Teleperformance and more.
                </h2>
              </div>

              {/* --- Bottom logos row --- */}
              {/* Col 1 spacer to keep the first vertical line continuous */}
              <div className="hidden lg:block border-r border-black" />

              {/* Cols 2–6: 5 logos */}
              {[
                { src: "/image/company/c_logo_1.png", alt: "Airbnb" },
                { src: "/image/company/c_logo_2.png", alt: "Canva" },
                { src: "/image/company/c_logo_3.png", alt: "Stripe" },
                { src: "/image/company/c_logo_4.png", alt: "Booking.com" },
                { src: "/image/company/c_logo_5.png", alt: "Amazon" },
              ].map((c, i) => (
                <div
                  key={c.alt}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 4 ? "lg:border-r" : ""
                  } lg:border-black`}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={100}
                    height={30}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
