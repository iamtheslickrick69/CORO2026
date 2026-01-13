import { HeaderNew } from "@/components/ui/header-new"
import { Footer } from "@/components/ui/footer"
import { HeroSection } from "@/components/sections/hero"
import { StatsCardsSection } from "@/components/sections/stats-cards"
import { CoroDemoSection } from "@/components/sections/coro-demo"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { CrisisPreventionSection } from "@/components/sections/crisis-prevention"
import { AccordionFeatureSection } from "@/components/ui/accordion-feature-section"
import { DataPrivacySection } from "@/components/sections/data-privacy"
import { OurPurposeSection } from "@/components/sections/our-purpose"
import { SecuritySection } from "@/components/sections/security"
import { FAQSection } from "@/components/sections/faq"
import { CTASection } from "@/components/sections/cta"
import { MobileChatSheet } from "@/components/ui/mobile-chat-sheet"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white overflow-x-hidden">
      <HeaderNew />
      <main>
        <HeroSection />
        <CrisisPreventionSection />
        <StatsCardsSection />
        <CoroDemoSection />
        <HowItWorksSection />
        <AccordionFeatureSection />
        <DataPrivacySection />
        <OurPurposeSection />
        <SecuritySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MobileChatSheet />
    </div>
  )
}
