import Image from "next/image";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export default function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="flex-none w-[280px] sm:w-[320px] lg:w-[360px] bg-[#111111] rounded-[32px] overflow-hidden group hover:bg-[#1a1a1a] transition-colors duration-300">
      {/* Image Container */}
      <div className="relative h-[240px] w-full bg-black">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-2 rounded-t-[32px] bg-black"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Text Content */}
      <div className="p-8">
        <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-lg leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}
