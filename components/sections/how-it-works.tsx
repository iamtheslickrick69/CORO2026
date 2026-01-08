"use client"

import { MessageSquare, Shield, LineChart, CheckCircle } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const steps = [
  {
    number: "01",
    title: "Employees share",
    description:
      "Team members text CORO anytime. No apps, no accounts — just natural conversation via SMS.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Identity protected",
    description:
      "All messages are anonymized and encrypted. Employee identities are never linked to feedback.",
    icon: Shield,
  },
  {
    number: "03",
    title: "Insights surface",
    description:
      "AI analyzes patterns across conversations, surfacing trends and risks in real-time.",
    icon: LineChart,
  },
  {
    number: "04",
    title: "Action taken",
    description: "Leadership receives actionable insights and responds to issues before they become crises.",
    icon: CheckCircle,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <span className="text-xs font-semibold text-[#0066FF] uppercase tracking-widest">How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            More Personal Than a Manager.
            <br />
            More Scalable Than Software.
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            Whether it's 50 warehouse workers or 5,000 customers, CORO remembers every conversation.
          </p>
        </ScrollAnimation>

        {/* Vertical Timeline */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <ScrollAnimation key={step.number} delay={index * 0.1}>
              <div className="flex gap-6">
                {/* Left: Number and Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0066FF] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#0066FF]">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-[#0066FF] to-slate-200 mt-2" />
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
