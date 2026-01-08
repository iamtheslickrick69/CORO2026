"use client"

import { useState } from "react"
import { AlertTriangle, BarChart3, CheckSquare, Target, TrendingUp } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const features = [
  {
    id: "warning",
    icon: AlertTriangle,
    title: "Early Warning System",
    category: "Detection",
    description:
      "AI-powered detection that catches emerging issues before they escalate. Real-time alerts on sentiment shifts, recurring themes, and risk signals.",
    metrics: [
      { label: "Retention Risk:", value: "high", color: "text-red-500" },
      { label: "Legal Exposure:", value: "medium", color: "text-amber-500" },
      { label: "Team Health:", value: "low", color: "text-emerald-500" },
    ],
  },
  {
    id: "health",
    icon: BarChart3,
    title: "Culture Health Score",
    category: "Analytics",
    description: "Comprehensive dashboard showing real-time culture metrics across departments, teams, and locations.",
  },
  {
    id: "tracker",
    icon: CheckSquare,
    title: "Action Tracker",
    category: "Accountability",
    description: "Track every action item from insight to resolution. Never let feedback fall through the cracks.",
  },
  {
    id: "outreach",
    icon: Target,
    title: "Targeted Outreach",
    category: "Proactive",
    description: "Automatically reach out to at-risk employees or specific segments with personalized check-ins.",
  },
  {
    id: "trends",
    icon: TrendingUp,
    title: "Trend Analysis",
    category: "Intelligence",
    description: "Spot patterns across time, teams, and topics. See what's improving and what needs attention.",
  },
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState("warning")
  const feature = features.find((f) => f.id === activeFeature)!

  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight text-balance">
            AI That Brings Humans Closer,
            <br />
            Not Further Apart
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            By guaranteeing anonymity and surfacing truth, Coro builds the trust that brings teams together.
          </p>
        </ScrollAnimation>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature List */}
          <ScrollAnimation className="lg:col-span-1 space-y-3">
            {features.map((f, index) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(f.id)}
                className={`stagger-item w-full text-left p-6 rounded-2xl transition-all duration-300 tilt-3d ${
                  activeFeature === f.id
                    ? "bg-white border-2 border-blue-300 shadow-2xl shadow-blue-500/30 scale-[1.05] -translate-y-1"
                    : "bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeFeature === f.id
                        ? "bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/20 scale-110 rotate-3"
                        : "bg-slate-100 group-hover:scale-110 group-hover:rotate-3"
                    }`}
                  >
                    <f.icon className={`w-6 h-6 transition-all duration-300 ${activeFeature === f.id ? "text-[#0066FF] scale-110" : "text-slate-400"}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{f.title}</h4>
                    <p className="text-xs text-slate-500">{f.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </ScrollAnimation>

          {/* Feature Detail */}
          <ScrollAnimation delay={0.2} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 h-full shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-100 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#0066FF]">{feature.category}</span>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                </div>
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed">{feature.description}</p>

              {/* Mock UI for Early Warning */}
              {feature.id === "warning" && feature.metrics && (
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  {feature.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{metric.label}</span>
                      <span className={`text-sm font-semibold ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholder for other features */}
              {feature.id !== "warning" && (
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 h-32 flex items-center justify-center border border-blue-100">
                  <p className="text-sm text-slate-500">Interactive preview coming soon</p>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
