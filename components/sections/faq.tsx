"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const faqs = [
  {
    question: "How does Coro protect employee anonymity?",
    answer:
      "Coro uses end-to-end encryption and a zero-knowledge architecture. Messages are processed by AI without ever linking to employee identities. Even Coro staff cannot see who sent what. We aggregate insights at minimum group sizes to prevent identification through deduction.",
  },
  {
    question: "What if employees abuse the anonymous system?",
    answer:
      "Our AI is trained to identify and filter abusive content while maintaining anonymity. Pattern detection can identify coordinated misuse. We also provide guidelines to employees and have moderation tools for edge cases.",
  },
  {
    question: "How is this different from regular employee surveys?",
    answer:
      "Traditional surveys are periodic, cumbersome, and often ignored. Coro provides always-on, conversational feedback via SMS with 80% engagement rates. You get real-time insights instead of quarterly reports.",
  },
  {
    question: "What size companies benefit most from Coro?",
    answer:
      "Coro works for organizations from 50 to 50,000+ employees. The ROI is especially strong for companies with distributed workforces, frontline workers, or multiple locations where traditional communication channels fail.",
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
  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Header & CTA */}
          <ScrollAnimation>
            <div className="flex gap-8 flex-col lg:sticky lg:top-32">
              <div className="flex gap-4 flex-col">
                <div>
                  <Badge variant="outline" className="text-[#0066FF] border-[#0066FF]/30 bg-blue-50">
                    FAQ
                  </Badge>
                </div>
                <div className="flex gap-3 flex-col">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight max-w-xl text-left font-bold text-slate-900">
                    Questions?
                    <br />
                    We've Got Answers
                  </h2>
                  <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed text-slate-600 text-left">
                    Everything you need to know about Coro's anonymous feedback platform.
                    Can't find what you're looking for? Our team is here to help.
                  </p>
                </div>
                <div className="pt-2">
                  <Button className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:opacity-90 text-white px-6 py-5 text-base font-semibold whitespace-nowrap">
                    Any Questions? Reach Out
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Column - Accordion */}
          <ScrollAnimation delay={0.1}>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-slate-200 mb-3 px-1 data-[state=open]:border-blue-200 data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="px-5 py-4 text-left font-medium text-slate-900 hover:no-underline hover:text-[#0066FF] transition-colors [&[data-state=open]]:text-[#0066FF]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
