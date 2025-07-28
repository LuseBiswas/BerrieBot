import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 my-4 rounded-full bg-teal-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          {/* Left side - Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/product" className="text-black/80 font-medium hover:text-black transition-colors">
              Product
            </Link>
            <Link href="/solution" className="text-black/80 font-medium hover:text-black transition-colors">
              Solution
            </Link>
            <Link href="/resources" className="text-black/80 font-medium hover:text-black transition-colors">
              Resources
            </Link>
            <Link href="/pricing" className="text-black/80 font-medium hover:text-black transition-colors">
              Pricing
            </Link>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-400" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">BerriBot</span>
          </Link>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-8 py-2 text-black border-2 border-black/80 rounded-full font-medium hover:bg-black/5 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-8 py-2 bg-white rounded-full font-medium text-lg hover:bg-gray-50 transition-colors text-black"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}