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
      { label: "Retention Risk", value: "High", color: "bg-red-500" },
      { label: "Legal Exposure", value: "Medium", color: "bg-amber-500" },
      { label: "Team Health", value: "Good", color: "bg-emerald-500" },
    ],
  },
  {
    id: "health",
    icon: BarChart3,
    title: "Culture Health Score",
    category: "Analytics",
    description: "Comprehensive dashboard showing real-time culture metrics across departments, teams, and locations. Track engagement, satisfaction, and sentiment over time.",
    metrics: [
      { label: "Overall Score", value: "78/100", color: "bg-blue-500" },
      { label: "Trend", value: "+5%", color: "bg-emerald-500" },
      { label: "Participation", value: "89%", color: "bg-blue-500" },
    ],
  },
  {
    id: "tracker",
    icon: CheckSquare,
    title: "Action Tracker",
    category: "Accountability",
    description: "Track every action item from insight to resolution. Never let feedback fall through the cracks. Assign owners and set deadlines.",
    metrics: [
      { label: "Open Items", value: "12", color: "bg-amber-500" },
      { label: "Resolved", value: "47", color: "bg-emerald-500" },
      { label: "Avg. Resolution", value: "3 days", color: "bg-blue-500" },
    ],
  },
  {
    id: "outreach",
    icon: Target,
    title: "Targeted Outreach",
    category: "Proactive",
    description: "Automatically reach out to at-risk employees or specific segments with personalized check-ins. Smart scheduling for optimal engagement.",
    metrics: [
      { label: "Active Campaigns", value: "3", color: "bg-blue-500" },
      { label: "Response Rate", value: "82%", color: "bg-emerald-500" },
      { label: "At-Risk Flagged", value: "8", color: "bg-amber-500" },
    ],
  },
  {
    id: "trends",
    icon: TrendingUp,
    title: "Trend Analysis",
    category: "Intelligence",
    description: "Spot patterns across time, teams, and topics. See what's improving and what needs attention. AI-powered insights surfaced automatically.",
    metrics: [
      { label: "Top Theme", value: "Workload", color: "bg-amber-500" },
      { label: "Improving", value: "Communication", color: "bg-emerald-500" },
      { label: "Watch", value: "Benefits", color: "bg-red-500" },
    ],
  },
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState("warning")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const feature = features.find((f) => f.id === activeFeature)!

  const handleFeatureChange = (id: string) => {
    if (id === activeFeature) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveFeature(id)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-10">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight text-balance">
            AI That Brings Humans Closer,
            <br />
            Not Further Apart
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            By guaranteeing anonymity and surfacing truth, Coro builds the trust that brings teams together.
          </p>
        </ScrollAnimation>

        {/* Horizontal Tabs */}
        <ScrollAnimation className="mb-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 px-2 scrollbar-hide">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFeatureChange(f.id)}
                className={`group flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  activeFeature === f.id
                    ? "bg-white shadow-md border border-slate-200"
                    : "hover:bg-white/60"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeFeature === f.id
                      ? "bg-blue-50"
                      : "bg-slate-100 group-hover:bg-slate-50"
                  }`}
                >
                  <f.icon
                    className={`w-4 h-4 transition-colors duration-300 ${
                      activeFeature === f.id ? "text-[#0066FF]" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeFeature === f.id ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {f.title}
                </span>
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Feature Content - Compact */}
        <ScrollAnimation delay={0.1}>
          <div
            className={`transition-all duration-150 ${
              isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Header Row */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                <feature.icon className="w-5 h-5 text-[#0066FF]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#0066FF] uppercase tracking-wide">
                  {feature.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 mb-6 leading-relaxed max-w-3xl mx-auto text-center">{feature.description}</p>

            {/* Metrics - Compact Row */}
            {feature.metrics && (
              <div className="flex flex-wrap justify-center gap-3">
                {feature.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-white rounded-lg px-4 py-3 border border-slate-200 flex items-center gap-3 hover:border-blue-200 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${metric.color}`} />
                    <span className="text-sm text-slate-500">{metric.label}</span>
                    <span className="text-sm font-bold text-slate-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
