import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto border border-white/20">
        {/* Top Company Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <div className="border-r border-b border-white/20 p-8 flex items-center justify-center h-24">
            <Image
              src="/image/company/c_logo_1.png"
              alt="Airbnb"
              width={100}
              height={30}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="border-r border-b border-white/20 p-8 flex items-center justify-center h-24">
            <Image
              src="/image/company/c_logo_2.png"
              alt="Canva"
              width={100}
              height={30}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="border-r border-b border-white/20 p-8 flex items-center justify-center h-24">
            <Image
              src="/image/company/c_logo_3.png"
              alt="Stripe"
              width={100}
              height={30}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="border-r border-b border-white/20 p-8 flex items-center justify-center h-24">
            <Image
              src="/image/company/c_logo_4.png"
              alt="Booking.com"
              width={100}
              height={30}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="border-r border-b border-white/20 p-8 flex items-center justify-center h-24">
            <Image
              src="/image/company/c_logo_5.png"
              alt="Amazon"
              width={100}
              height={30}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="border-b border-white/20 p-8 flex items-center justify-center h-24">
            <Image
              src="/image/company/c_logo_6.png"
              alt="Google"
              width={100}
              height={30}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="border-b border-white/20 py-16 px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight">
            Used by teams at Cognizant,
            <br />
            Wipro, LTIMindtree,
            <br />
            Teleperformance and more.
          </h2>
        </div>

        {/* Bottom Company Logos Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
  <div className="lg:col-start-2 border-r border-white/20 p-8 flex items-center justify-center h-24">
    <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-medium">Logo</span>
    </div>
  </div>
  <div className="border-r border-white/20 p-8 flex items-center justify-center h-24">
    <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-medium">Logo</span>
    </div>
  </div>
  <div className="border-r border-white/20 p-8 flex items-center justify-center h-24">
    <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-medium">Logo</span>
    </div>
  </div>
  <div className="border-r border-white/20 p-8 flex items-center justify-center h-24">
    <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-medium">Logo</span>
    </div>
  </div>
  <div className="p-8 flex items-center justify-center h-24">
    <div className="w-20 h-10 bg-teal-600 rounded flex items-center justify-center">
      <span className="text-white text-xs font-medium">Logo</span>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}