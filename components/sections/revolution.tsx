"use client"

import { useState } from "react"
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const oldWayItems = [
  "Emails nobody reads (20% open rate)",
  "Quarterly surveys with stale data",
  "Exit interviews—after they quit",
  "6+ weeks to see results",
]

const newWayItems = [
  "SMS everyone reads (80% open rate)",
  "Continuous real-time feedback",
  "Catch issues before they escalate",
  "Instant insights, immediate action",
]

export function RevolutionSection() {
  const [showNewWay, setShowNewWay] = useState(false)

  const toggleView = () => {
    setShowNewWay(!showNewWay)
  }

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">The Revolution</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight">
            Old HR tools <span className="text-gray-400">vs.</span> Coro
          </h2>
        </ScrollAnimation>

        {/* Single Card with Slide Animation */}
        <ScrollAnimation delay={0.1}>
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={toggleView}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:bg-gray-50"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={toggleView}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:bg-gray-50"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Card Container */}
            <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: "450px" }}>
              {/* Old Way Card */}
              <div
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  showNewWay ? "-translate-x-full" : "translate-x-0"
                }`}
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-slate-100 rounded-3xl" />
                  <div className="relative p-10 lg:p-12 h-full flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        The Old Way
                      </span>
                    </div>
                    <ul className="space-y-6 max-w-2xl mx-auto">
                      {oldWayItems.map((item, index) => (
                        <li key={item} className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                            <X className="w-5 h-5 text-slate-500" />
                          </span>
                          <span className="text-slate-700 text-lg lg:text-xl font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* New Way Card */}
              <div
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  showNewWay ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-3xl" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-[#0066FF]/30" />
                  <div className="relative p-10 lg:p-12 h-full flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">With Coro</span>
                    </div>
                    <ul className="space-y-6 max-w-2xl mx-auto">
                      {newWayItems.map((item, index) => (
                        <li key={item} className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Check className="w-5 h-5 text-white" />
                          </span>
                          <span className="text-white text-lg lg:text-xl font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setShowNewWay(false)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  !showNewWay ? "bg-gray-900 w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label="Show old way"
              />
              <button
                onClick={() => setShowNewWay(true)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  showNewWay ? "bg-[#0066FF] w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label="Show new way"
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* Instruction hint */}
        <p className="text-center mt-6 text-sm text-gray-500">Click the arrows or dots to compare</p>
      </div>
    </section>
  )
}
