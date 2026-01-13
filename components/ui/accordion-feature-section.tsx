"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { BarChart3, Shield, Brain } from "lucide-react"

interface FeatureItem {
  id: number
  title: string
  image: string
  description: string
  icon: React.ReactNode
}

const coroFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "Real-Time Dashboard",
    image: "/feature-1.png",
    description:
      "See employee sentiment and trends at a glance. Track engagement across teams, departments, and locations with live data that updates as conversations happen. Identify patterns before they become problems.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Anonymous & Secure",
    image: "/feature-2.png",
    description:
      "End-to-end encryption ensures complete privacy. Employee identities are never linked to feedback — not even Coro staff can see who said what. Trust is built on true anonymity.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "AI-Powered Insights",
    image: "/feature-3.png",
    description:
      "Surface risks before they become crises. Our AI analyzes conversation patterns to detect burnout, disengagement, and cultural issues early — giving you time to act, not react.",
    icon: <Brain className="w-5 h-5" />,
  },
]

export function AccordionFeatureSection() {
  const [activeTabId, setActiveTabId] = useState<number>(1)
  const [activeImage, setActiveImage] = useState(coroFeatures[0].image)

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">
            Platform Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Everything You Need to Listen Better
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            From real-time dashboards to AI-powered insights, Coro gives you the tools to understand your workforce like never before.
          </p>
        </ScrollAnimation>

        {/* Feature Accordion with Image */}
        <ScrollAnimation delay={0.1}>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
            {/* Left - Accordion */}
            <div className="w-full lg:w-1/2">
              <Accordion type="single" className="w-full" defaultValue="item-1" collapsible>
                {coroFeatures.map((feature) => (
                  <AccordionItem
                    key={feature.id}
                    value={`item-${feature.id}`}
                    className="border-b border-slate-200 data-[state=open]:border-[#0066FF]/30"
                  >
                    <AccordionTrigger
                      onClick={() => {
                        setActiveImage(feature.image)
                        setActiveTabId(feature.id)
                      }}
                      className="cursor-pointer py-6 !no-underline transition hover:no-underline group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          feature.id === activeTabId
                            ? "bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        }`}>
                          {feature.icon}
                        </div>
                        <h3
                          className={`text-lg sm:text-xl font-semibold text-left transition-colors duration-300 ${
                            feature.id === activeTabId ? "text-slate-900" : "text-slate-500"
                          }`}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-slate-600 leading-relaxed pl-14">
                        {feature.description}
                      </p>
                      {/* Mobile image */}
                      <div className="mt-6 lg:hidden pl-14">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover object-left-top"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right - Dynamic Image */}
            <div className="hidden lg:block w-1/2 sticky top-32">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 shadow-2xl shadow-slate-300/50 border border-slate-200">
                {/* Blue glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0066FF]/10 via-transparent to-[#0066FF]/10 blur-2xl" />

                {coroFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      activeImage === feature.image
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover object-left-top"
                      priority={feature.id === 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
