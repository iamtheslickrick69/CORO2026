"use client"

import { useState, useRef } from "react"
import { MessageSquare, Shield, LineChart, CheckCircle, Calendar } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { BorderBeam } from "@/components/ui/border-beam"
import { CalendlyModal } from "@/components/ui/calendly-modal"

const steps = [
  {
    number: "01",
    title: "Employees share",
    description:
      "Team members text Coro anytime. No apps, no accounts — just natural conversation via SMS.",
    icon: MessageSquare,
    color: "text-[#0066FF]",
    borderColor: "border-[#0066FF]/40",
  },
  {
    number: "02",
    title: "Identity protected",
    description:
      "All messages are anonymized and encrypted. Employee identities are never linked to feedback.",
    icon: Shield,
    color: "text-[#0052CC]",
    borderColor: "border-[#0052CC]/40",
  },
  {
    number: "03",
    title: "Insights surface",
    description:
      "AI analyzes patterns across conversations, surfacing trends and risks in real-time.",
    icon: LineChart,
    color: "text-[#3B82F6]",
    borderColor: "border-[#3B82F6]/40",
  },
  {
    number: "04",
    title: "Action taken",
    description: "Leadership receives actionable insights and responds to issues before they become crises.",
    icon: CheckCircle,
    color: "text-[#60A5FA]",
    borderColor: "border-[#60A5FA]/40",
  },
]

export function HowItWorksSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative isolate bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-blue-500/10 overflow-hidden"
          >
            {/* Cursor Glow Spotlight */}
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovering ? 1 : 0,
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 102, 255, 0.1), transparent 40%)`,
              }}
            />

            {/* Rotating Border Beam */}
            <BorderBeam duration={6} borderWidth={2} color="#0066FF" />

            <div className="w-full p-6 lg:p-10 relative">
              {/* Header inside card */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  How It Works
                </h2>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.number} className="group flex gap-4 cursor-default">
                    {/* Left: Icon with connector */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 ${step.borderColor} bg-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 group-hover:border-[#0066FF]`}>
                        <step.icon className={`w-4 h-4 ${step.color} transition-transform duration-300 group-hover:scale-110`} />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0066FF]/30 to-slate-200 mt-2 transition-all duration-300 group-hover:from-[#0066FF]/60" />
                      )}
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 pb-3">
                      <h3 className="text-base font-semibold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-[#0066FF]">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  Ready to hear your people?
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Get started in under 2 minutes.
                </p>
                <button
                  onClick={() => setIsCalendlyOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Calendly Modal */}
        <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      </div>
    </section>
  )
}
