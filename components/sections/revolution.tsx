"use client"

import { Check, X } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const oldWayItems = [
  "Emails nobody reads (20% open rate)",
  "Quarterly surveys with stale data",
  "Exit interviews—after they quit",
  "6+ weeks to see results",
]

const newWayItems = [
  "SMS everyone reads (98% open rate)",
  "Continuous real-time feedback",
  "Catch issues before they escalate",
  "Instant insights, immediate action",
]

export function RevolutionSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">The Revolution</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
            Old HR tools <span className="text-gray-400">vs.</span> CORO
          </h2>
        </ScrollAnimation>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Old Way */}
          <ScrollAnimation delay={0.1}>
            <div className="relative group">
              <div className="absolute inset-0 bg-slate-100 rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300" />
              <div className="relative p-8">
                <div className="mb-6">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">The Old Way</span>
                </div>
                <ul className="space-y-4">
                  {oldWayItems.map((item, index) => (
                    <li key={item} className="flex items-start gap-3" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5 text-slate-400" />
                      </span>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollAnimation>

          {/* New Way - CORO approach */}
          <ScrollAnimation delay={0.2}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300" />
              <div className="absolute inset-0 rounded-2xl border-2 border-[#0066FF]/50 group-hover:border-[#3385FF] transition-colors" />
              <div className="relative p-8">
                <div className="mb-6">
                  <span className="text-xs font-medium text-white/90 uppercase tracking-wider">With CORO</span>
                </div>
                <ul className="space-y-4">
                  {newWayItems.map((item, index) => (
                    <li key={item} className="flex items-start gap-3" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span className="text-white font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
