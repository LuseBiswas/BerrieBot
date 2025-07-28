import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto border border-white/20">
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
              className={`p-8 flex items-center justify-center h-24 border-b border-white/20 ${
                // draw vertical lines between columns on lg only
                i < 5 ? "lg:border-r" : ""
              } lg:border-white/20`}
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
          <div className="col-span-2 sm:col-span-3 lg:col-span-6 relative border-b border-white/20 py-16 px-8 text-center">
            {/* Only ONE vertical line under the first column's right edge */}
            <span
              className="hidden lg:block absolute top-0 bottom-0 border-l border-white/20 pointer-events-none"
              style={{ left: "calc(100% / 6)" }}
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight mx-auto max-w-2xl">
              Used by teams at Cognizant,
              <br />
              Wipro, LTIMindtree,
              <br />
              Teleperformance and more.
            </h2>
          </div>

          {/* --- Bottom logos row --- */}
          {/* Col 1 spacer to keep the first vertical line continuous */}
          <div className="hidden lg:block border-r border-white/20" />

          {/* Cols 2–6: 5 logos; add right border on first 4 for grid lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`p-8 flex items-center justify-center h-24 ${
                i < 4 ? "lg:border-r" : ""
              } lg:border-white/20`}
            >
              <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium">Logo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
