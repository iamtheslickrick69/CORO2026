"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, LogIn, LayoutGrid, Menu, X } from "lucide-react"
import { LoginModal } from "./login-modal"
import { CalendlyModal } from "./calendly-modal"

const navItems = [
  { id: "home", label: "Home", href: "#", icon: null, lucideIcon: null },
  { id: "how-it-works", label: "Problem", href: "#how-it-works", icon: null, lucideIcon: null },
  { id: "coro-demo", label: "Coro", href: "#coro-demo", icon: "/taurus.png", lucideIcon: null },
  { id: "security", label: "Security", href: "#security", icon: null, lucideIcon: null },
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: null, lucideIcon: LayoutGrid },
]

export function HeaderNew() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we've scrolled at all (for shadow)
      setHasScrolled(currentScrollY > 10)

      // Show/hide based on scroll direction
      if (currentScrollY < 100) {
        // Always show near top
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling down (with threshold) - hide
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY

      // Update active tab based on scroll position (only for anchor links)
      const sections = navItems.map(item => ({
        id: item.id,
        element: item.href.startsWith("#") && item.href !== "#" ? document.querySelector(item.href) : null
      }))

      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveTab(section.id)
            return
          }
        }
      }
      setActiveTab("home")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string, id: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    // Page routes (like /dashboard) are handled by Next.js Link
    setActiveTab(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-white/95 backdrop-blur-xl border-b transition-all duration-300 ${
            hasScrolled
              ? "border-slate-200 shadow-sm"
              : "border-transparent"
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="relative w-28 h-8">
                <Image
                  src="/loopsync-logo.png"
                  alt="LoopSync"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Navigation - Clean text links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const IconComponent = item.lucideIcon

                // Dashboard is a real link, others are scroll buttons
                if (item.href.startsWith("/")) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                      activeTab === item.id
                        ? "text-[#0066FF]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        width={18}
                        height={18}
                        className="object-contain"
                      />
                    )}
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {item.label}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCalendlyOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF] text-white text-sm font-medium hover:bg-[#0052CC] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Demo
              </button>

              <button
                onClick={() => setIsLoginOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-700 text-sm font-medium bg-white hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
            </div>
          </div>
        </div>

      </motion.header>

      {/* Mobile Menu Dropdown - Outside header for proper positioning */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-14 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-lg"
          >
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.lucideIcon

                if (item.href.startsWith("/")) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      )}
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-[#0066FF]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    )}
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    {item.label}
                  </button>
                )
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="px-4 pb-4 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsCalendlyOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0066FF] text-white text-sm font-medium hover:bg-[#0052CC] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14" />

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  )
}
