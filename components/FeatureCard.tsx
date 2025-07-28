import Image from "next/image";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export default function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#111111] rounded-[32px] overflow-hidden group hover:bg-[#1a1a1a] transition-colors">
      {/* Image Container */}
      <div className="relative h-[240px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      </div>

      {/* Text Content */}
      <div className="p-8">
        <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-400 text-lg">
          {description}
        </p>
      </div>
    </div>
  );
} 