"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { CalendlyModal } from "@/components/ui/calendly-modal"

interface CrisisData {
  id: string
  label: string
  image: string
  without: {
    description: string
    stat: string
    statLabel: string
  }
  with: {
    description: string
    stat: string
    statLabel: string
  }
}

// Spring configuration for smooth, natural animations
const springConfig = {
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

// Featured crisis (Broken Systems) - shown first as horizontal card
const featuredCrisis: CrisisData = {
  id: "systems",
  label: "Broken Systems",
  image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80",
  without: {
    description: "They don't want another dashboard. They want to be heard.",
    stat: "3 days",
    statLabel: "Avg. email response time",
  },
  with: {
    description: "Just text. No app. No login. No friction.",
    stat: "3 min",
    statLabel: "Avg. text response time",
  },
}

// Other crises in 2-2 grid
const crises: CrisisData[] = [
  {
    id: "feedback",
    label: "Feedback",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "Annual reviews miss 90% of what matters.",
      stat: "1x/year",
      statLabel: "When employees are heard",
    },
    with: {
      description: "Always-on pulse. No surveys required.",
      stat: "Daily",
      statLabel: "Continuous insights",
    },
  },
  {
    id: "turnover",
    label: "Turnover",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "67% of employees who quit never told anyone.",
      stat: "33%",
      statLabel: "Of your team, gone",
    },
    with: {
      description: "Coro catches the signs before the resignation.",
      stat: "60%",
      statLabel: "Reduction in turnover",
    },
  },
  {
    id: "connection",
    label: "Staying Connected",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "Remote teams drift apart silently.",
      stat: "47%",
      statLabel: "Feel disconnected at work",
    },
    with: {
      description: "Bridge the gap without another meeting.",
      stat: "3x",
      statLabel: "More team engagement",
    },
  },
  {
    id: "churn",
    label: "Customer Churn",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "Customers don't complain. They just leave.",
      stat: "25%",
      statLabel: "Annual churn rate",
    },
    with: {
      description: "Catch friction before it costs you.",
      stat: "40%",
      statLabel: "Churn reduction",
    },
  },
]

// Featured Crisis Card - Horizontal layout for hero position
const FeaturedCrisisCard = ({ crisis }: { crisis: CrisisData }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative h-40 md:h-44 w-full cursor-pointer overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", ...springConfig }}
      style={{
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.35)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Background Image - Grayscale by default, color on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: isHovered ? "grayscale(0) brightness(1.1)" : "grayscale(1) brightness(0.7)",
        }}
        transition={{ type: "spring", ...springConfig }}
        style={{
          backgroundImage: `url(${crisis.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"
        animate={{
          opacity: isHovered ? 0.9 : 1,
        }}
        transition={{ type: "spring", ...springConfig }}
      />

      {/* Content Container - Horizontal layout */}
      <div className="relative z-10 flex h-full items-center p-5 sm:p-6 md:p-8">
        {/* Left side - Content */}
        <div className="flex-1 max-w-full sm:max-w-2xl">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="without"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", ...springConfig }}
              >
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Without Coro</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-3 leading-relaxed">{crisis.without.description}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl md:text-4xl font-bold text-red-400">{crisis.without.stat}</p>
                  <p className="text-xs text-gray-400">{crisis.without.statLabel}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", ...springConfig }}
              >
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">With Coro</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
                <p className="text-xs sm:text-sm text-gray-200 mb-3 leading-relaxed">{crisis.with.description}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl md:text-4xl font-bold text-emerald-400">{crisis.with.stat}</p>
                  <p className="text-xs text-gray-300">{crisis.with.statLabel}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Arrow */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          animate={{
            rotate: isHovered ? -45 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: "spring", ...springConfig }}
        >
          <ArrowRight className="w-7 h-7 text-white/60" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Crisis Card component - For 2x2 grid
const CrisisCard = ({ crisis, index }: { crisis: CrisisData; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative h-60 w-full cursor-pointer overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", ...springConfig }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.35)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Background Image - Grayscale by default, color on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: isHovered ? "grayscale(0) brightness(1.1)" : "grayscale(1) brightness(0.7)",
        }}
        transition={{ type: "spring", ...springConfig }}
        style={{
          backgroundImage: `url(${crisis.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
        animate={{
          opacity: isHovered ? 0.85 : 1,
        }}
        transition={{ type: "spring", ...springConfig }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        {/* Top - Arrow */}
        <motion.div
          className="flex justify-end"
          animate={{
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ type: "spring", ...springConfig }}
        >
          <ArrowRight className="w-5 h-5 text-white/60" />
        </motion.div>

        {/* Bottom - Content */}
        <div>
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="without"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", ...springConfig }}
              >
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Without Coro</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">{crisis.without.description}</p>
                <div className="pt-3 border-t border-white/20">
                  <p className="text-2xl font-bold text-red-400">{crisis.without.stat}</p>
                  <p className="text-xs text-gray-400">{crisis.without.statLabel}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", ...springConfig }}
              >
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">With Coro</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
                <p className="text-xs text-gray-200 mb-3 leading-relaxed">{crisis.with.description}</p>
                <div className="pt-3 border-t border-white/30">
                  <p className="text-2xl font-bold text-emerald-400">{crisis.with.stat}</p>
                  <p className="text-xs text-gray-300">{crisis.with.statLabel}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export function CrisisPreventionSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  return (
    <section className="py-16 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            The Cost of Silence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Every crisis starts the same way: someone didn't speak up. Not because they didn't care — because no one was listening.
          </p>
        </ScrollAnimation>

        {/* Crisis Cards Grid - 1-2-2 Layout */}
        <ScrollAnimation delay={0.1}>
          {/* Featured Card - Full Width */}
          <div className="mb-5">
            <FeaturedCrisisCard crisis={featuredCrisis} />
          </div>

          {/* Row 2 - Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {crises.slice(0, 2).map((crisis, index) => (
              <CrisisCard key={crisis.id} crisis={crisis} index={index} />
            ))}
          </div>

          {/* Row 3 - Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {crises.slice(2, 4).map((crisis, index) => (
              <CrisisCard key={crisis.id} crisis={crisis} index={index + 2} />
            ))}
          </div>
        </ScrollAnimation>

        {/* CTA */}
        <ScrollAnimation delay={0.3} className="text-center">
          <p className="text-slate-600 mb-4">Which crisis are you trying to prevent?</p>
          <Button
            onClick={() => setIsCalendlyOpen(true)}
            className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] hover:opacity-90 text-white px-8 py-6 text-lg font-semibold whitespace-nowrap"
          >
            Book a Demo
          </Button>
        </ScrollAnimation>

        {/* Calendly Modal */}
        <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      </div>
    </section>
  )
}
