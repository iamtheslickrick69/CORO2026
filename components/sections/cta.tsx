"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const benefits = [
  {
    title: "Anonymous & Secure",
    description: "End-to-end encryption ensures complete employee privacy.",
  },
  {
    title: "Real-Time Insights",
    description: "Get actionable feedback instantly, not quarterly.",
  },
  {
    title: "80% Response Rate",
    description: "SMS-based engagement that employees actually use.",
  },
]

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="grid border border-slate-200 bg-white rounded-2xl p-8 lg:p-12 grid-cols-1 gap-10 items-center lg:grid-cols-2 shadow-xl shadow-slate-200/50">
            {/* Left Column - Content */}
            <div className="flex gap-8 flex-col">
              <div className="flex gap-4 flex-col">
                <div>
                  <Badge variant="outline" className="text-[#0066FF] border-[#0066FF]/30 bg-blue-50">
                    Get Started
                  </Badge>
                </div>
                <div className="flex gap-3 flex-col">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl tracking-tight max-w-xl text-left font-bold text-slate-900">
                    Syncing culture starts with listening early.
                    <span className="text-[#0066FF]"> Coro makes it effortless.</span>
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-600 max-w-xl text-left">
                    Coro closes the blind spots. See what you're missing before it's too late.
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid lg:pl-2 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-5">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex flex-row gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold text-slate-900">{benefit.title}</p>
                      <p className="text-slate-500 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white px-8 py-6 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 whitespace-nowrap"
                >
                  Book a Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base font-semibold border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-[#0066FF]/40 hover:text-[#0066FF] transition-all duration-300 whitespace-nowrap"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Column - Logo */}
            <div className="relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 rounded-xl aspect-square flex items-center justify-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08),transparent_70%)]" />
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl" />

              {/* Logo */}
              <div className="relative w-3/4 h-1/2 hover:scale-105 transition-transform duration-500">
                <Image
                  src="/logo-standard.png"
                  alt="Coro"
                  fill
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
