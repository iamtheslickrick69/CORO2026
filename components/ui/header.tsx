"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, LogIn } from "lucide-react"
import { LoginModal } from "./login-modal"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  ]

  return (
    <>
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "top-2 translate-y-0" : "top-4 translate-y-0"
      } animate-slide-down`}
      style={{ boxShadow: scrolled ? '0 8px 32px rgba(0, 102, 255, 0.12)' : 'none' }}
    >
      <div className="relative">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-blue-400/30 to-blue-500/20 rounded-2xl opacity-60 blur-sm animate-pulse" />

        <div
          className={`relative flex items-center gap-2 px-2 py-2 rounded-2xl transition-all duration-500 border ${
            scrolled
              ? "glass-strong border-blue-200/40"
              : "glass-header border-blue-100/30"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pl-3 pr-4 group relative">
            <div className="absolute inset-0 rounded-lg bg-[#0066FF]/0 group-hover:bg-[#0066FF]/10 blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative h-12 w-40 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]">
              <Image
                src="/logo-standard.png"
                alt="Coro"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-white/40 backdrop-blur-md rounded-xl p-1 border border-white/30">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setActiveLink(link.id)}
                className={`relative px-6 py-2.5 text-base font-semibold rounded-lg transition-all duration-300 ${
                  activeLink === link.id ? "text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {activeLink === link.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg shadow-blue-500/30" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Login Button */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-gray-700 hover:text-[#0066FF] bg-white/60 hover:bg-white rounded-xl border border-white/50 hover:border-[#0066FF]/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ml-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-gray-700 hover:text-blue-600 rounded-xl hover:bg-blue-50/50 transition-colors mr-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with slide animation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 animate-slide-down">
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-blue-400/30 to-blue-500/20 rounded-2xl opacity-60 blur-sm animate-pulse" />
            <div className="relative glass-strong rounded-2xl p-4 shadow-2xl">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`stagger-item px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                      activeLink === link.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-700 hover:bg-blue-50/50 hover:text-blue-600"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Mobile Login Button */}
                <button
                  onClick={() => {
                    setIsLoginOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="stagger-item flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-all active:scale-95"
                  style={{ animationDelay: `${navLinks.length * 0.1}s` }}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

    </header>

    {/* Login Modal - rendered outside header to avoid transform containment issues */}
    <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
