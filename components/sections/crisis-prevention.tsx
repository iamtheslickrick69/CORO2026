"use client"

import { useState } from "react"
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

// Featured crisis (Broken Systems) - shown first as horizontal card
const featuredCrisis: CrisisData = {
  id: "systems",
  label: "Broken Systems",
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
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
    id: "harassment",
    label: "Harassment",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "Victims stay silent for 14 months on average.",
      stat: "$200K+",
      statLabel: "When it finally surfaces",
    },
    with: {
      description: "Coro breaks the silence.",
      stat: "90%",
      statLabel: "Early resolution",
    },
  },
  {
    id: "turnover",
    label: "Turnover",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "67% of employees who quit never told anyone.",
      stat: "33%",
      statLabel: "Of your team, gone",
    },
    with: {
      description: "Coro breaks the silence.",
      stat: "60%",
      statLabel: "Reduction in turnover",
    },
  },
  {
    id: "toxic",
    label: "Toxic Manager",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "Everyone knows. No one says anything.",
      stat: "1 manager",
      statLabel: "= 12 resignations",
    },
    with: {
      description: "Coro breaks the silence.",
      stat: "30 days",
      statLabel: "To detection",
    },
  },
  {
    id: "churn",
    label: "Customer Churn",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    without: {
      description: "Customers don't complain. They just leave.",
      stat: "25%",
      statLabel: "Annual churn",
    },
    with: {
      description: "Coro breaks the silence.",
      stat: "40%",
      statLabel: "Churn reduction",
    },
  },
]

// Featured Crisis Card - Horizontal layout for hero position
const FeaturedCrisisCard = ({ crisis }: { crisis: CrisisData }) => {
  return (
    <div className="group relative h-40 md:h-42 w-full cursor-pointer overflow-hidden rounded-xl shadow-lg">
      {/* Background Image - Grayscale by default, color on hover */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out scale-100 grayscale group-hover:grayscale-0 group-hover:scale-105"
        style={{
          backgroundImage: `url(${crisis.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 transition-all duration-500 group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/30" />

      {/* Content Container - Horizontal layout */}
      <div className="relative z-10 flex h-full items-center p-6 md:p-8">
        {/* Left side - Content */}
        <div className="flex-1 max-w-2xl">
          {/* WITHOUT CORO - Shows by default, hides on hover */}
          <div className="transition-all duration-500 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-4">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Without Coro</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed max-w-lg">{crisis.without.description}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl md:text-4xl font-bold text-red-400">{crisis.without.stat}</p>
              <p className="text-xs text-gray-400">{crisis.without.statLabel}</p>
            </div>
          </div>

          {/* WITH CORO - Hidden by default, shows on hover */}
          <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-8 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-[-50%]">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">With Coro</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
            <p className="text-sm text-gray-200 mb-3 leading-relaxed max-w-lg">{crisis.with.description}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl md:text-4xl font-bold text-emerald-400">{crisis.with.stat}</p>
              <p className="text-xs text-gray-300">{crisis.with.statLabel}</p>
            </div>
          </div>
        </div>

        {/* Right side - Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="w-7 h-7 text-white/60 transition-all duration-500 group-hover:text-white group-hover:-rotate-45" />
        </div>
      </div>
    </div>
  )
}

// Crisis Card component - Simple CSS approach (for 2x2 grid)
const CrisisCard = ({ crisis }: { crisis: CrisisData }) => {
  return (
    <div className="group relative h-60 w-full cursor-pointer overflow-hidden rounded-xl shadow-lg">
      {/* Background Image - Grayscale by default, color on hover */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out scale-100 grayscale group-hover:grayscale-0 group-hover:scale-110"
        style={{
          backgroundImage: `url(${crisis.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-all duration-500 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/10" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        {/* Top - Arrow */}
        <div className="flex justify-end">
          <ArrowRight className="w-5 h-5 text-white/60 transition-all duration-500 group-hover:text-white group-hover:-rotate-45" />
        </div>

        {/* Bottom - Content */}
        <div>
          {/* WITHOUT CORO - Shows by default, hides on hover */}
          <div className="transition-all duration-500 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-4">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Without Coro</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">{crisis.without.description}</p>
            <div className="pt-3 border-t border-white/20">
              <p className="text-2xl font-bold text-red-400">{crisis.without.stat}</p>
              <p className="text-xs text-gray-400">{crisis.without.statLabel}</p>
            </div>
          </div>

          {/* WITH CORO - Hidden by default, shows on hover */}
          <div className="absolute bottom-5 left-5 right-5 transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">With Coro</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">{crisis.label}</h3>
            <p className="text-xs text-gray-200 mb-3 leading-relaxed">{crisis.with.description}</p>
            <div className="pt-3 border-t border-white/30">
              <p className="text-2xl font-bold text-emerald-400">{crisis.with.stat}</p>
              <p className="text-xs text-gray-300">{crisis.with.statLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CrisisPreventionSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            The Cost of Silence
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
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
            {crises.slice(0, 2).map((crisis) => (
              <CrisisCard key={crisis.id} crisis={crisis} />
            ))}
          </div>

          {/* Row 3 - Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {crises.slice(2, 4).map((crisis) => (
              <CrisisCard key={crisis.id} crisis={crisis} />
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
