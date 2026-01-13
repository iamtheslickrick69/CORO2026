"use client"

import { useState, useEffect, useRef } from "react"
import { Warehouse, Building2, Home, Headphones } from "lucide-react"
import { ScrollAnimation, CountUp } from "@/components/ui/scroll-animation"

const organizationTabs = [
  { id: "warehouse", label: "Warehouse", icon: Warehouse, traditional: 35, sms: 78 },
  { id: "office", label: "Office", icon: Building2, traditional: 45, sms: 85 },
  { id: "remote", label: "Remote", icon: Home, traditional: 30, sms: 80 },
  { id: "frontline", label: "Frontline", icon: Headphones, traditional: 25, sms: 75 },
]

export function ChannelSection() {
  const [activeTab, setActiveTab] = useState("warehouse")
  const [animatedBars, setAnimatedBars] = useState(false)
  const barsRef = useRef<HTMLDivElement>(null)
  const activeOrg = organizationTabs.find((t) => t.id === activeTab)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedBars(true)
        }
      },
      { threshold: 0.3 },
    )

    if (barsRef.current) {
      observer.observe(barsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">The Channel</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            One Channel.{" "}
            <span className="text-[#0066FF]">
              <CountUp end={98} suffix="%" />
            </span>{" "}
            Open Rate. Zero Friction.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            While emails sit unread at 20%, SMS gets opened in under 3 minutes.
          </p>
        </ScrollAnimation>

        {/* Simple Comparison Bars */}
        <ScrollAnimation delay={0.1}>
          <div className="max-w-xl mx-auto mb-16" ref={barsRef}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Email</span>
                  <span className="text-sm font-semibold text-slate-400">20%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animatedBars ? "20%" : "0%" }}
                  />
                </div>
              </div>

              {/* SMS - Coro Blue */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">SMS</span>
                  <span className="text-sm font-semibold text-[#0066FF]">98%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-full transition-all duration-1000 ease-out delay-300"
                    style={{ width: animatedBars ? "98%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Organization Comparison */}
        <ScrollAnimation delay={0.2}>
          <div className="glass-card rounded-2xl border border-blue-100/50 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">
              Response Rates Across Your Organization
            </h3>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {organizationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white shadow-lg scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Comparison Visualization */}
            {activeOrg && (
              <div className="max-w-lg mx-auto">
                {/* Traditional */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">Traditional Surveys</span>
                    <span className="text-sm font-semibold text-slate-400">{activeOrg.traditional}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-300 rounded-full transition-all duration-500"
                      style={{ width: `${activeOrg.traditional}%` }}
                    />
                  </div>
                </div>

                {/* SMS - Coro Blue */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">Coro SMS</span>
                    <span className="text-sm font-semibold text-[#0066FF]">{activeOrg.sms}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-full transition-all duration-500"
                      style={{ width: `${activeOrg.sms}%` }}
                    />
                  </div>
                </div>

                {/* Improvement - Coro Blue */}
                <div className="text-center pt-6 border-t border-blue-100">
                  <span className="text-3xl font-bold text-[#0066FF]">+{activeOrg.sms - activeOrg.traditional}%</span>
                  <span className="text-sm text-gray-500 ml-2">improvement</span>
                </div>
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
