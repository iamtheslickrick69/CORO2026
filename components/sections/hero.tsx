"use client"

import { ArrowRight, Calendar, Lock, MessageSquare, ChevronDown } from "lucide-react"
import { ImageAccordion } from "@/components/ui/image-accordion"
import { CalendlyModal } from "@/components/ui/calendly-modal"
import { useEffect, useState } from "react"

const rotatingWords = ["Employees", "Customers", "Team", "Frontline"]

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setIsVisible(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-white">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white via-purple-50/30 to-blue-50/40 animate-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-blue-50/40 to-white/60" />

      {/* Gradient orbs for depth */}
      <div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse transition-transform"
        style={{ animationDuration: "8s", transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/12 rounded-full blur-3xl animate-pulse transition-transform"
        style={{ animationDuration: "10s", animationDelay: "2s", transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-[100px] animate-pulse transition-transform"
        style={{ animationDuration: "12s", animationDelay: "4s", transform: `translateY(${scrollY * 0.2}px)` }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.15),transparent_70%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Cursor-following spotlight */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 102, 255, 0.15), transparent 40%)`,
        }}
      />

      {/* Content - Stacked Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Top: Text Content - Centered */}
          <div className="w-full max-w-3xl text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2 mb-8 backdrop-blur-sm transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
              </div>
              <span className="text-sm font-medium text-gray-700">Introducing Coro</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0066FF]" />
            </div>

            {/* Headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block">The #1 Platform to Collect</span>
              <span className="block whitespace-nowrap">
                Real Feedback From{" "}
                <span
                  className={`inline-block bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#0066FF] bg-clip-text text-transparent transition-all duration-700 ease-in-out ${
                    isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-sm"
                  }`}
                >
                  {rotatingWords[wordIndex]}
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-gray-900 font-medium">Coro is your secure third-party escrow.</span> Real
              conversations with employees and customers via text. Real insights to leadership — with your data never
              shared or sold.
            </p>

            {/* Trust Points */}
            <div
              className={`flex flex-wrap items-center justify-center gap-3 mb-8 transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 glass-card px-3 py-2.5 rounded-xl hover:border-[#0066FF]/60 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/30 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-[#0066FF]" />
                </div>
                <span className="whitespace-nowrap">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 glass-card px-3 py-2.5 rounded-xl hover:border-[#0066FF]/60 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/30 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0066FF]" />
                </div>
                <span className="whitespace-nowrap">80% Response Rate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 transition-all duration-700 delay-400 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#0066FF] to-[#3385FF] rounded-2xl opacity-60 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500" />
                <a
                  href="#coro-demo"
                  className="relative bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white h-12 px-6 text-base font-bold rounded-xl shadow-xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  See Coro in Action
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              <button
                onClick={() => setIsCalendlyOpen(true)}
                className="h-12 px-6 text-base font-semibold border-2 border-blue-200 hover:bg-blue-50/50 rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 hover:border-[#0066FF] hover:scale-105 transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#0066FF]" />
                Book Demo
              </button>
            </div>

            {/* Calendly Modal */}
            <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
          </div>

          {/* Bottom: Image Accordion - Full Width Centered */}
          <div
            className={`w-full transition-all duration-700 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ImageAccordion />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#0066FF]" />
      </div>
    </section>
  )
}
