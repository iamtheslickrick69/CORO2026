import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { HeroSection } from "@/components/sections/hero"
import { RevolutionSection } from "@/components/sections/revolution"
import { ChannelSection } from "@/components/sections/channel"
import { CoroDemoSection } from "@/components/sections/coro-demo"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { CrisisPreventionSection } from "@/components/sections/crisis-prevention"
import { FeaturesSection } from "@/components/sections/features"
import { DataPrivacySection } from "@/components/sections/data-privacy"
import { SecuritySection } from "@/components/sections/security"
import { FAQSection } from "@/components/sections/faq"
import { CTASection } from "@/components/sections/cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      <Header />
      <main>
        <HeroSection />
        <RevolutionSection />
        <ChannelSection />
        <CoroDemoSection />
        <HowItWorksSection />
        <CrisisPreventionSection />
        <FeaturesSection />
        <DataPrivacySection />
        <SecuritySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
