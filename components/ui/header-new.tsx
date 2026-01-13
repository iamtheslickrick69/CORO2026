"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Sparkles, Workflow, ShieldCheck, DollarSign, Calendar, LogIn, Menu, X } from "lucide-react"
import { LoginModal } from "./login-modal"
import { CalendlyModal } from "./calendly-modal"
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock"

export function HeaderNew() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      title: "Home",
      href: "#",
      icon: (
        <Image
          src="/icon.png"
          alt="Home"
          width={20}
          height={20}
          className="object-contain"
        />
      ),
    },
    {
      title: "Features",
      href: "#features",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      title: "How It Works",
      href: "#how-it-works",
      icon: <Workflow className="h-4 w-4" />,
    },
    {
      title: "Security",
      href: "#security",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      title: "Pricing",
      href: "#pricing",
      icon: <DollarSign className="h-4 w-4" />,
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Logo - Top Left (Always Visible) */}
      <div className="fixed top-4 left-4 sm:left-6 lg:left-8 z-50">
        <Link href="/" className="flex items-center">
          <div className="relative w-32 h-8">
            <Image
              src="/logo-standard.png"
              alt="Coro"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>
        </Link>
      </div>

      {/* CTA Buttons - Top Right (Always Visible) */}
      <div className="fixed top-4 right-4 sm:right-6 lg:right-8 z-50 flex items-center gap-3">
        <button
          onClick={() => setIsCalendlyOpen(true)}
          className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          <Calendar className="w-4 h-4" />
          Book Demo
        </button>

        <button
          onClick={() => setIsLoginOpen(true)}
          className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:border-[#0066FF] hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          <LogIn className="w-4 h-4" />
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#0066FF] hover:border-[#0066FF] transition-all duration-500"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 md:hidden w-64 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-[#0066FF] transition-all duration-500"
              >
                <span className="text-[#0066FF] dark:text-blue-400">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  setIsCalendlyOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-semibold"
              >
                <Calendar className="w-4 h-4" />
                Book Demo
              </button>
              <button
                onClick={() => {
                  setIsLoginOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Floating Dock - Only visible on scroll */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <Dock
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
          magnification={60}
          distance={120}
          panelHeight={44}
        >
          {navItems.map((item, idx) => (
            <DockItem
              key={idx}
              className="aspect-square rounded-xl bg-transparent hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-500"
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                {item.title === "Home" ? (
                  <button
                    onClick={scrollToTop}
                    className="flex items-center justify-center w-full h-full text-[#0066FF] dark:text-blue-400"
                  >
                    {item.icon}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-center w-full h-full text-[#0066FF] dark:text-blue-400"
                  >
                    {item.icon}
                  </Link>
                )}
              </DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  )
}
