"use client"

import { useState } from "react"
import { Check, MessageSquare, Users, Zap, Mail, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const comparisonData = {
  hrTools: {
    stats: [
      { icon: Mail, value: "20%", label: "Open Rate", description: "Emails nobody reads" },
      { icon: Users, value: "35%", label: "Response Rate", description: "Survey fatigue" },
      { icon: Clock, value: "6 weeks", label: "Time to Insights", description: "Data already stale" },
    ],
  },
  coro: {
    stats: [
      { icon: MessageSquare, value: "98%", label: "Open Rate", description: "SMS everyone reads" },
      { icon: TrendingUp, value: "80%", label: "Response Rate", description: "Real engagement" },
      { icon: Zap, value: "Instant", label: "Time to Insights", description: "Act immediately" },
    ],
  },
}

const features = [
  {
    title: "98% Open Rate",
    description: "SMS messages get read in under 3 minutes, not buried in inboxes.",
  },
  {
    title: "80% Response Rate",
    description: "No logins, no apps, no friction. Just text and talk.",
  },
  {
    title: "Instant Insights",
    description: "See trends as they happen, not 6 weeks later in a PDF.",
  },
]

export function StatsCardsSection() {
  const [activeTab, setActiveTab] = useState<"hrTools" | "coro">("coro")
  const [isAnimating, setIsAnimating] = useState(false)
  const isHrTools = activeTab === "hrTools"
  const data = comparisonData[activeTab]

  const handleTabChange = (tab: "hrTools" | "coro") => {
    if (tab === activeTab) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tab)
      setTimeout(() => setIsAnimating(false), 50)
    }, 200)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="grid border border-slate-200 rounded-3xl p-8 lg:p-12 grid-cols-1 gap-10 items-center lg:grid-cols-2 bg-white shadow-xl shadow-slate-200/50">
            {/* Left Column: Content */}
            <div className="flex gap-8 flex-col">
              <div className="flex gap-4 flex-col">
                <div>
                  <Badge variant="outline" className="text-[#0066FF] border-[#0066FF]/30 bg-[#0066FF]/5">
                    Why Coro
                  </Badge>
                </div>
                <div className="flex gap-3 flex-col">
                  <h2 className="text-3xl lg:text-5xl tracking-tight max-w-xl text-left font-bold text-slate-900">
                    Stop Asking.<br />Start Listening.
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-500 max-w-xl text-left">
                    Annual surveys ask questions. Coro hears answers — in real time, on their terms.
                  </p>
                </div>
              </div>

              {/* Feature List */}
              <div className="grid lg:pl-2 grid-cols-1 gap-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-row gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#0066FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#0066FF]" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold text-slate-900">{feature.title}</p>
                      <p className="text-slate-500 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Comparison */}
            <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
              isHrTools ? "bg-slate-50" : "bg-gradient-to-br from-[#0066FF]/5 to-blue-50"
            }`}>
              {/* Toggle */}
              <div className="px-6 py-5 flex justify-center">
                <div className="inline-flex rounded-full p-1.5 bg-white border border-slate-200 shadow-sm">
                  <button
                    onClick={() => handleTabChange("hrTools")}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                      isHrTools
                        ? "bg-slate-700 text-white shadow-lg"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    HR Tools
                  </button>
                  <button
                    onClick={() => handleTabChange("coro")}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                      !isHrTools
                        ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Coro
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-px transition-all duration-500 ${
                isHrTools ? "bg-slate-200" : "bg-[#0066FF]/20"
              }`} />

              {/* Stats */}
              <div className="p-6 lg:p-8">
                <div className={`grid grid-cols-3 gap-4 transition-all duration-500 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}>
                  {data.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isHrTools
                            ? "bg-slate-200"
                            : "bg-gradient-to-br from-[#0066FF] to-[#3B82F6] shadow-lg shadow-blue-500/30"
                        }`}>
                          <stat.icon className={`w-6 h-6 transition-all duration-500 ${
                            isHrTools ? "text-slate-400" : "text-white"
                          }`} />
                        </div>
                      </div>
                      <div className={`text-2xl lg:text-3xl font-bold mb-1 transition-all duration-500 ${
                        isHrTools ? "text-slate-400" : "text-[#0066FF]"
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs font-semibold mb-0.5 transition-all duration-500 ${
                        isHrTools ? "text-slate-400" : "text-slate-900"
                      }`}>
                        {stat.label}
                      </div>
                      <div className={`text-xs transition-all duration-500 ${
                        isHrTools ? "text-slate-300" : "text-slate-500"
                      }`}>
                        {stat.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Accent */}
              <div className={`h-1 transition-all duration-500 ${
                isHrTools
                  ? "bg-slate-200"
                  : "bg-gradient-to-r from-[#0066FF] via-[#3B82F6] to-[#60A5FA]"
              }`} />
            </div>
          </div>
        </ScrollAnimation>

        {/* Hint text */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Click the toggle to compare
        </p>
      </div>
    </section>
  )
}
