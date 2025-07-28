import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold">
          BerriBot
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/" className="text-gray-600 transition-colors hover:text-black">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-gray-600 transition-colors hover:text-black">
              About
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-600 transition-colors hover:text-black">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
} 