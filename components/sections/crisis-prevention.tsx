"use client"

import { useState } from "react"
import { AlertTriangle, Users, UserX, HeartCrack, TrendingDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const crises = [
  {
    id: "harassment",
    label: "Harassment Crisis",
    icon: AlertTriangle,
    without: {
      title: "The Problem",
      description: "Anonymous harassment claim. No paper trail. No pattern detection. No early warning.",
      points: ["No documentation", "Fear of retaliation", "Delayed reporting", "Pattern blindness"],
      stat: "$200K+",
      statLabel: "Avg. lawsuit cost",
    },
    with: {
      title: "The Solution",
      description: "Full conversation history. Timestamped evidence. Pattern detection alerts. Early intervention.",
      points: ["Complete audit trail", "Anonymous reporting", "Real-time alerts", "Pattern recognition"],
      stat: "72 hrs",
      statLabel: "Average detection time",
    },
  },
  {
    id: "turnover",
    label: "Turnover Risk",
    icon: Users,
    without: {
      title: "The Problem",
      description: "Key employees leave without warning. Exit interviews reveal nothing actionable.",
      points: ["No early signals", "Reactive only", "Lost institutional knowledge", "Hiring costs spike"],
      stat: "33%",
      statLabel: "Annual turnover",
    },
    with: {
      title: "The Solution",
      description: "Sentiment tracking identifies at-risk employees. Proactive retention interventions.",
      points: ["Early warning alerts", "Proactive outreach", "Retention playbooks", "Manager coaching"],
      stat: "60%",
      statLabel: "Reduction in turnover",
    },
  },
  {
    id: "toxic",
    label: "Toxic Manager",
    icon: UserX,
    without: {
      title: "The Problem",
      description: "One bad manager destroys team morale. HR finds out when everyone quits.",
      points: ["Fear of speaking up", "Team-wide impact", "Delayed discovery", "Legal exposure"],
      stat: "5x",
      statLabel: "Higher quit rates",
    },
    with: {
      title: "The Solution",
      description: "Anonymous feedback surfaces patterns. Early coaching or intervention.",
      points: ["Safe reporting channel", "Pattern detection", "Manager scorecards", "Coaching triggers"],
      stat: "30 days",
      statLabel: "To intervention",
    },
  },
  {
    id: "trust",
    label: "Broken Trust",
    icon: HeartCrack,
    without: {
      title: "The Problem",
      description: "Employees stop sharing concerns. Leadership operates blind.",
      points: ["Silent workforce", "Hidden problems", "Surprise departures", "Culture decay"],
      stat: "12%",
      statLabel: "Survey participation",
    },
    with: {
      title: "The Solution",
      description: "Always-on anonymous channel rebuilds trust. Consistent engagement.",
      points: ["98% engagement", "Continuous feedback", "Trust metrics", "Culture health score"],
      stat: "85%",
      statLabel: "Engagement rate",
    },
  },
  {
    id: "churn",
    label: "Customer Churn",
    icon: TrendingDown,
    without: {
      title: "The Problem",
      description: "Customers leave without feedback. NPS surveys ignored.",
      points: ["Low response rates", "Delayed feedback", "No pattern detection", "Reactive support"],
      stat: "25%",
      statLabel: "Annual churn",
    },
    with: {
      title: "The Solution",
      description: "Proactive check-ins catch issues early. AI identifies churn signals.",
      points: ["Proactive outreach", "Sentiment tracking", "Churn prediction", "Save campaigns"],
      stat: "40%",
      statLabel: "Churn reduction",
    },
  },
]

export function CrisisPreventionSection() {
  const [activeCrisis, setActiveCrisis] = useState("harassment")
  const crisis = crises.find((c) => c.id === activeCrisis)!

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">
            Real Problems, Real Solutions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            The Crises CORO Prevents
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            These aren't hypotheticals. These are the crises that keep executives up at night — from toxic culture to
            customer churn.
          </p>
        </ScrollAnimation>

        {/* Crisis Tabs */}
        <ScrollAnimation delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {crises.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCrisis(c.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCrisis === c.id
                    ? "bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.label}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Comparison */}
        <ScrollAnimation delay={0.2}>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 lg:p-10 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Without CORO */}
              <div className="p-6 rounded-xl bg-white border border-red-100 hover:border-red-200 transition-colors">
                <h4 className="font-semibold text-red-600 mb-2">Without CORO</h4>
                <h5 className="text-lg font-semibold text-gray-900 mb-3">{crisis.without.title}</h5>
                <p className="text-sm text-gray-600 mb-4">{crisis.without.description}</p>
                <ul className="space-y-2 mb-6">
                  {crisis.without.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-red-100">
                  <p className="text-3xl font-bold text-red-600">{crisis.without.stat}</p>
                  <p className="text-xs text-slate-500">{crisis.without.statLabel}</p>
                </div>
              </div>

              {/* With CORO */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 hover:border-blue-300 transition-colors">
                <h4 className="font-semibold text-[#0066FF] mb-2">With CORO</h4>
                <h5 className="text-lg font-semibold text-gray-900 mb-3">{crisis.with.title}</h5>
                <p className="text-sm text-gray-600 mb-4">{crisis.with.description}</p>
                <ul className="space-y-2 mb-6">
                  {crisis.with.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-blue-200">
                  <p className="text-3xl font-bold text-[#0066FF]">{crisis.with.stat}</p>
                  <p className="text-xs text-gray-500">{crisis.with.statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* CTA */}
        <ScrollAnimation delay={0.3} className="text-center">
          <p className="text-slate-600 mb-4">Which crisis are you trying to prevent?</p>
          <Button className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] hover:bg-blue-50/50 text-white group">
            Book a Demo
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </ScrollAnimation>
      </div>
    </section>
  )
}
