"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Investor = { name: string; src: string };

const investors: Investor[] = [
  { name: "Accel", src: "/image/company/c_logo_1.png" },
  { name: "Andreessen Horowitz", src: "/image/company/c_logo_2.png" },
  { name: "BCV", src: "/image/company/c_logo_3.png" },
  { name: "A*", src: "/image/company/c_logo_4.png" },
  { name: "avra", src: "/image/company/c_logo_5.png" },
  { name: "BOND", src: "/image/company/c_logo_6.png" },
  { name: "Forerunner", src: "/image/company/c_logo_1.png" },
  { name: "Ribbit Capital", src: "/image/company/c_logo_2.png" },
];

export default function InvestorsSection() {
  const reduceMotion = useReducedMotion();
  const fadeUp = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="investors-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          id="investors-heading"
          className="mb-10 text-4xl font-medium tracking-tight text-neutral-900 sm:mb-12 sm:text-5xl lg:text-6xl"
          {...fadeUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          Investors
        </motion.h2>

        {/* Grid container with gradient background */}
        <motion.div
          className="mx-auto max-w-[1200px]"
          {...fadeUp}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.08 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Grid with direct gradient background */}
          <ul
            role="list"
            className="
              grid items-center justify-items-center
              grid-cols-2 gap-x-8 gap-y-12
              sm:grid-cols-3 sm:gap-x-10 sm:gap-y-14
              lg:grid-cols-4 lg:gap-x-16 lg:gap-y-16
              bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100
              rounded-3xl p-8 sm:p-12 lg:p-16
              shadow-sm
            "
          >
            {investors.map((inv) => (
              <li key={inv.name} className="flex w-full items-center justify-center">
                <div className="relative h-10 w-full sm:h-12 lg:h-14">
                  <Image
                    src={inv.src}
                    alt={inv.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="(min-width:1280px) 260px, (min-width:1024px) 220px, (min-width:640px) 200px, 45vw"
                    loading="lazy"
                  />
                </div>
                <span className="sr-only">{inv.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
