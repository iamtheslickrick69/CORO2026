"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const faqs = [
  {
    question: "How does CORO protect employee anonymity?",
    answer:
      "CORO uses end-to-end encryption and a zero-knowledge architecture. Messages are processed by AI without ever linking to employee identities. Even CORO staff cannot see who sent what. We aggregate insights at minimum group sizes to prevent identification through deduction.",
  },
  {
    question: "What if employees abuse the anonymous system?",
    answer:
      "Our AI is trained to identify and filter abusive content while maintaining anonymity. Pattern detection can identify coordinated misuse. We also provide guidelines to employees and have moderation tools for edge cases.",
  },
  {
    question: "How is this different from regular employee surveys?",
    answer:
      "Traditional surveys are periodic, cumbersome, and often ignored. CORO provides always-on, conversational feedback via SMS with 98% engagement rates. You get real-time insights instead of quarterly reports.",
  },
  {
    question: "What size companies benefit most from CORO?",
    answer:
      "CORO works for organizations from 50 to 50,000+ employees. The ROI is especially strong for companies with distributed workforces, frontline workers, or multiple locations where traditional communication channels fail.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most companies are up and running within 2 weeks. We handle SMS setup, integrate with your HRIS, and train your team. No IT resources required beyond initial data sync.",
  },
  {
    question: "Can managers retaliate against employees?",
    answer:
      "No. Managers never see individual feedback or identities. They only see aggregated insights at the team level (minimum 5 respondents). Our system is designed to make retaliation impossible.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Questions?
            <br />
            We've Got Answers
          </h2>
        </ScrollAnimation>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} delay={index * 0.05}>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180 text-[#0066FF]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Contact CTA */}
        <ScrollAnimation delay={0.3} className="text-center mt-12">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <Button variant="outline" className="border-slate-300 hover:bg-slate-100 hover:border-blue-300 bg-white">
            Contact Our Team
          </Button>
        </ScrollAnimation>
      </div>
    </section>
  )
}
