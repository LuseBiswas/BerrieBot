export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold sm:text-6xl text-white">
          Welcome to BerriBot
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          Build amazing GPT-driven experiences in minutes.
        </p>
        <button className="rounded-md bg-white px-6 py-3 text-black font-semibold transition-colors hover:bg-gray-200">
          Get Started
        </button>
      </div>
    </section>
  );
} 