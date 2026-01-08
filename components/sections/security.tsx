import { Lock, EyeOff, Trash2, Users, Shield, Scale } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All messages are encrypted in transit and at rest using AES-256 encryption standards.",
  },
  {
    icon: EyeOff,
    title: "Anonymous by Design",
    description: "Employee identities are never linked to feedback. True anonymity builds trust.",
  },
  {
    icon: Trash2,
    title: "Zero Data Retention",
    description: "Raw message content is processed and discarded. Only aggregated insights are stored.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular permissions ensure only authorized personnel see relevant insights.",
  },
]

const certifications = [
  { icon: Shield, title: "SOC 2 Type II Compliant", description: "Independently audited security controls" },
  { icon: Scale, title: "GDPR & CCPA Ready", description: "Full regulatory compliance" },
]

export function SecuritySection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-16">
          <span className="text-sm font-semibold text-[#0066FF] uppercase tracking-wide">Enterprise Security</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-balance">
            Security That Earns
            <br />
            Employee Trust
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Built from the ground up with privacy and security as core principles, not afterthoughts.
          </p>
        </ScrollAnimation>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <ScrollAnimation key={feature.title} delay={index * 0.1}>
              <div className="glass-card rounded-2xl border border-blue-100/50 p-8 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 hover:scale-[1.05] hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#3385FF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Certifications */}
        <ScrollAnimation delay={0.4}>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-4 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-xl p-5 hover:scale-[1.02] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center shrink-0">
                  <cert.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{cert.title}</h4>
                  <p className="text-sm text-slate-400">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
