"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Lock, MessageSquare, ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const ParticleInfinity = dynamic(() => import("@/components/particle-infinity").then((mod) => mod.ParticleInfinity), {
  ssr: false,
})

const rotatingWords = ["Employees", "Customers", "Team", "Frontline"]

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length)
        setIsVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-white">
      {/* Animated gradient mesh background - Enhanced */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white via-purple-50/30 to-blue-50/40 animate-gradient" />

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-blue-50/40 to-white/60" />

      {/* Multiple gradient orbs for depth - 5 orbs with parallax */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse transition-transform" style={{ animationDuration: '8s', transform: `translateY(${scrollY * 0.1}px)` }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/12 rounded-full blur-3xl animate-pulse transition-transform" style={{ animationDuration: '10s', animationDelay: '2s', transform: `translateY(${scrollY * -0.15}px)` }} />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-[100px] animate-pulse transition-transform" style={{ animationDuration: '12s', animationDelay: '4s', transform: `translateY(${scrollY * 0.2}px)` }} />
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-indigo-400/8 rounded-full blur-[90px] animate-pulse transition-transform" style={{ animationDuration: '14s', animationDelay: '1s', transform: `translateY(${scrollY * -0.1}px)` }} />
      <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-cyan-400/6 rounded-full blur-[80px] animate-pulse transition-transform" style={{ animationDuration: '16s', animationDelay: '3s', transform: `translateY(${scrollY * 0.25}px)` }} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.15),transparent_70%)]" />

      {/* Enhanced grid pattern with blue tint */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Cursor-following spotlight */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 102, 255, 0.15), transparent 40%)`
        }}
      />

      {/* Particle Infinity - Enhanced size */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 flex items-center justify-center opacity-80 scale-125">
        <ParticleInfinity />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 text-center">
        {/* Badge with entrance animation */}
        <div
          className={`inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2 mb-8 backdrop-blur-sm transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
          </div>
          <span className="text-sm font-medium text-gray-700">Introducing CORO</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#0066FF]" />
        </div>

        {/* Headline with staggered animation - Condensed to 2 lines */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="block">Introducing CORO: The #1 Platform to Collect</span>
          <span className="block">
            Real Feedback From Your{" "}
            <span className="relative inline-block">
              <span
                className={`inline-block bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#0066FF] bg-clip-text text-transparent transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>
            </span>
            <span className="text-gray-900">.</span>
          </span>
        </h1>

        <p
          className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-gray-900 font-medium">CORO is your secure third-party escrow.</span> Real conversations
          with employees and customers via text. Real insights to leadership — with your data never shared or sold.
        </p>

        {/* Trust Points with stagger - Enhanced with floating animation */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 mb-10 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-4 text-lg font-semibold text-gray-700 glass-card px-8 py-5 rounded-xl hover:border-[#0066FF]/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#0066FF]" />
            </div>
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-4 text-lg font-semibold text-gray-700 glass-card px-8 py-5 rounded-xl hover:border-[#0066FF]/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/30 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#0066FF]" />
            </div>
            <span>End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-4 text-lg font-semibold text-gray-700 glass-card px-8 py-5 rounded-xl hover:border-[#0066FF]/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer animate-float" style={{ animationDelay: '4s', animationDuration: '6s' }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/30 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#0066FF]" />
            </div>
            <span>98% Response Rate</span>
          </div>
        </div>

        {/* CTA Buttons - Primary 40% Larger */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#0066FF] to-[#3385FF] rounded-3xl opacity-60 blur-2xl group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500" />
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white px-16 py-8 text-xl font-bold rounded-2xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-110 transition-all duration-300"
            >
              See CORO in Action
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="px-8 py-5 text-base font-semibold border-2 border-blue-200 hover:bg-blue-50/50 rounded-xl glass-card text-gray-700 backdrop-blur-sm hover:border-[#0066FF] hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            <Play className="mr-2 w-4 h-4 text-[#0066FF]" />
            Watch Demo
          </Button>
        </div>

        <p
          className={`text-sm text-gray-500 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          No credit card required • Your data stays yours • 2 min setup
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[#0066FF]" />
        </div>
      </div>
    </section>
  )
}
