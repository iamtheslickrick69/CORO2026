import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="glass-card border-t border-blue-100/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-24 transition-transform group-hover:scale-105">
              <Image
                src="/logo-standard.png"
                alt="CORO"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-500">© 2025 CORO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
