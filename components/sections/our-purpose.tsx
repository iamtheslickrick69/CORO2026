"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const founderTestimonial = [
  {
    quote: "The best companies aren't built on silence. They're built on trust, honesty, and the courage to hear what others won't say out loud. Coro exists to give every voice a safe place to land — and every leader the clarity to act.",
    name: "Nick Bonniksen",
    designation: "Founder",
    src: "/founder.png",
  },
]

export function OurPurposeSection() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-4">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">Our Purpose</span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Why We Built Coro
          </h2>
        </ScrollAnimation>

        {/* Founder Testimonial */}
        <ScrollAnimation delay={0.1}>
          <AnimatedTestimonials testimonials={founderTestimonial} />
        </ScrollAnimation>
      </div>

      {/* Banner Quote */}
      <ScrollAnimation delay={0.2}>
        <div className="mt-12 py-6 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 border-y border-blue-100/50 backdrop-blur-sm">
          <p className="text-center text-base md:text-lg lg:text-xl italic text-slate-700 px-4 whitespace-nowrap overflow-hidden">
            "Every customer deserves to be heard. Every employee deserves a healthy environment. Every leader deserves to stay in the <span className="font-semibold text-[#0066FF]">Loop</span>."
          </p>
        </div>
      </ScrollAnimation>
    </section>
  )
}
