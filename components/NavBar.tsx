import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-white">
          BerriBot
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/" className="text-gray-300 transition-colors hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-gray-300 transition-colors hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-300 transition-colors hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
} 