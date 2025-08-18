"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type StatItem = {
  id: number;
  title: string;
  value: string;
  gradient: string; // e.g. "from-purple-200 to-blue-200"
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  layoutMd: string; // md col placement
  layoutLg: string; // lg precise col placement
};

const statsData: StatItem[] = [
  {
    id: 1,
    title: "Customers served",
    value: "10M+",
    gradient: "from-purple-200 to-blue-200",
    layoutMd: "md:col-span-6",
    layoutLg: "lg:col-[1/9]", // 40% of 20 cols
  },
  {
    id: 2,
    title: "Deflection rate",
    value: "80%",
    gradient: "from-purple-300 to-pink-200",
    icon: "/image/icons/computer.png",
    iconWidth: 32,
    iconHeight: 32,
    layoutMd: "md:col-span-3",
    layoutLg: "lg:col-[9/15]", // 30% of 20 cols
  },
  {
    id: 3,
    title: "Resolution rate",
    value: "70%",
    gradient: "from-blue-200 to-teal-200",
    icon: "/image/icons/web.png",
    iconWidth: 32,
    iconHeight: 32,
    layoutMd: "md:col-span-3",
    layoutLg: "lg:col-[15/21]", // 30% of 20 cols
  },
  {
    id: 4,
    title: "Decrease in support operations costs",
    value: "65%",
    gradient: "from-green-200 to-yellow-200",
    image: "/image/screenshot_2.png",
    imageWidth: 180,
    imageHeight: 220,
    layoutMd: "md:col-span-3",
    // Ends 40% into Tile 2 above (Tile 2 spans 6 cols → 40% ≈ 2.4 → snap to 2 cols):
    // Tile 2 starts at 9 → 9 + 2 = 11 ⇒ end at line 11
    layoutLg: "lg:col-[1/11]",
  },
  {
    id: 5,
    title: "Agent quality score",
    value: "93%",
    gradient: "from-pink-200 to-purple-200",
    image: "/image/screenshot_2.png",
    imageWidth: 180,
    imageHeight: 220,
    layoutMd: "md:col-span-3",
    // Starts where Tile 4 ended (line 11) and fills to the end:
    layoutLg: "lg:col-[11/21]",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white">
            Driving results that truly matter
          </h2>
        </motion.div>

        {/* Soft background wash (optional, like your screenshot) */}
        <div className="relative rounded-3xl p-2 sm:p-3 lg:p-4 overflow-visible">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" />

          {/* Grid */}
          <div
            className={`
              grid gap-6
              grid-cols-1
              md:grid-cols-6
              lg:[grid-template-columns:repeat(20,minmax(0,1fr))]
            `}
          >
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.id}
                className={`
                  col-span-1 ${stat.layoutMd} ${stat.layoutLg}
                  relative min-h-[16rem]
                  rounded-3xl p-8
                  bg-gradient-to-br ${stat.gradient}
                  overflow-hidden flex flex-col justify-between
                `}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Top-right icon (decorative) */}
                {stat.icon && stat.iconWidth && stat.iconHeight && (
                  <div
                    className="absolute right-4 top-4 rounded-2xl bg-black/10 flex items-center justify-center"
                    style={{ width: 64, height: 64 }}
                    aria-hidden="true"
                  >
                    <Image
                      src={stat.icon}
                      alt=""
                      width={stat.iconWidth}
                      height={stat.iconHeight}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Bottom-right image (decorative) */}
                {stat.image && stat.imageWidth && stat.imageHeight && (
                  <div
                    className="absolute right-4 bottom-4 rounded-2xl overflow-hidden"
                    style={{
                      width: stat.imageWidth,
                      height: stat.imageHeight,
                    }}
                    aria-hidden="true"
                  >
                    <Image
                      src={stat.image}
                      alt=""
                      width={stat.imageWidth}
                      height={stat.imageHeight}
                      className="object-cover w-full h-full"
                      priority={idx < 3}
                    />
                  </div>
                )}

                {/* Title */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg text-black/80 leading-tight">
                    {stat.title}
                  </h3>
                </div>

                {/* Value */}
                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl font-bold tracking-tight text-black">
                    {stat.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
