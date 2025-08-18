"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const foundersData = [
  { name: "Jesse Zhang", title: "Co-founder & CEO", linkedinUrl: "#" },
  { name: "Ashwin Sreenivas", title: "Co-founder & CTO", linkedinUrl: "#" },
];

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  );
}

export default function FoundersSection() {
  const reduceMotion = useReducedMotion();

  const leftAnim = reduceMotion ? {} : { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 } };
  const rightAnim = reduceMotion ? {} : { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 } };

  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="founders-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">
          {/* Left: text list */}
          <motion.div
            className="lg:col-span-5"
            {...leftAnim}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 id="founders-heading" className="text-4xl sm:text-5xl lg:text-6xl font-inter font-medium text-black mb-8">
              Founders
            </h2>

            <ul className="space-y-10">
              {foundersData.map((f) => (
                <li key={f.name} className="space-y-3">
                  <a href={f.linkedinUrl} className="text-xl sm:text-2xl text-indigo-600 hover:underline">
                    {f.name}
                  </a>
                  <p className="text-lg text-black/70">{f.title}</p>

                  <a
                    href={f.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-neutral-900 text-white
                               hover:bg-neutral-800 transition outline-none ring-offset-2 ring-offset-white
                               focus-visible:ring-2 focus-visible:ring-neutral-800"
                    aria-label={`${f.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: large photo with precise focal position */}
          <motion.figure
            className="lg:col-span-7"
            {...rightAnim}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.12 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-neutral-100">
              {/* Aspect ratios chosen to match your screenshot */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/9]">
                <Image
                  src="/image/Founder/img_1.png"
                  alt="Founders — Jesse Zhang and Ashwin Sreenivas"
                  fill
                  className="
                    object-cover
                    /* nudge focus right & a bit up so both founders stay centered in-frame */
                    md:object-[60%_45%]
                    lg:object-[65%_45%]
                  "
                  priority
                  sizes="(min-width: 1280px) 760px, (min-width: 1024px) 640px, 100vw"
                />
              </div>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
