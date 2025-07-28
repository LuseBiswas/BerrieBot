import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto border border-white/20">
        {/* Top Company Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
  {/* Top Company Logos */}
  {[
    { src: "/image/company/c_logo_1.png", alt: "Airbnb" },
    { src: "/image/company/c_logo_2.png", alt: "Canva" },
    { src: "/image/company/c_logo_3.png", alt: "Stripe" },
    { src: "/image/company/c_logo_4.png", alt: "Booking.com" },
    { src: "/image/company/c_logo_5.png", alt: "Amazon" },
    { src: "/image/company/c_logo_6.png", alt: "Google" },
  ].map((company, index) => (
    <div
      key={company.alt}
      className={`border-b border-white/20 p-8 flex items-center justify-center h-24 ${
        index < 5 ? "border-r" : ""
      } border-white/20`}
    >
      <Image
        src={company.src}
        alt={company.alt}
        width={100}
        height={30}
        className="opacity-60 hover:opacity-100 transition-opacity"
      />
    </div>
  ))}

  {/* Testimonial Text in full row, but part of grid */}
  <div className="col-span-6 border-b border-white/20 py-16 px-8 text-center">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight">
      Used by teams at Cognizant,
      <br />
      Wipro, LTIMindtree,
      <br />
      Teleperformance and more.
    </h2>
  </div>

  {/* Bottom logos: aligned under column 2–6 */}
  <div className="hidden lg:block border-r border-white/20"></div>
  {[...Array(5)].map((_, index) => (
    <div
      key={index}
      className={`p-8 flex items-center justify-center h-24 ${
        index < 4 ? "border-r" : ""
      } border-white/20`}
    >
      <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
        <span className="text-white text-xs font-medium">Logo</span>
      </div>
    </div>
  ))}
  <div className="hidden lg:block border-l border-white/20"></div>
</div>

      </div>
    </section>
  );
}
