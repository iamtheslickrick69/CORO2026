"use client"

import { Lock, EyeOff, Trash2, Users, Shield, Eye, Database, ChevronRight } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All messages are encrypted in transit and at rest using AES-256 encryption standards.",
    gradient: "from-blue-500/50 via-blue-600/20 to-transparent",
    glowColor: "blue",
    iconBg: "bg-blue-500/20 group-hover:bg-blue-500/30",
    iconColor: "text-blue-400",
    shadowColor: "group-hover:shadow-blue-500/20",
  },
  {
    icon: EyeOff,
    title: "Anonymous by Design",
    description: "Employee identities are never linked to feedback. True anonymity builds trust.",
    gradient: "from-emerald-500/50 via-emerald-600/20 to-transparent",
    glowColor: "emerald",
    iconBg: "bg-emerald-500/20 group-hover:bg-emerald-500/30",
    iconColor: "text-emerald-400",
    shadowColor: "group-hover:shadow-emerald-500/20",
  },
  {
    icon: Trash2,
    title: "Zero Data Retention",
    description: "Raw message content is processed and discarded. Only aggregated insights are stored.",
    gradient: "from-orange-500/50 via-orange-600/20 to-transparent",
    glowColor: "orange",
    iconBg: "bg-orange-500/20 group-hover:bg-orange-500/30",
    iconColor: "text-orange-400",
    shadowColor: "group-hover:shadow-orange-500/20",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular permissions ensure only authorized personnel see relevant insights.",
    gradient: "from-violet-500/50 via-violet-600/20 to-transparent",
    glowColor: "violet",
    iconBg: "bg-violet-500/20 group-hover:bg-violet-500/30",
    iconColor: "text-violet-400",
    shadowColor: "group-hover:shadow-violet-500/20",
  },
]

export function SecuritySection() {
  return (
    <section className="py-16 lg:py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-10">
          <span className="text-sm font-semibold text-[#60A5FA] uppercase tracking-wide">Enterprise Security</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Security That Earns
            <br />
            Employee Trust
          </h2>
          <p className="mt-3 text-base text-slate-400 max-w-3xl mx-auto">
            Built from the ground up with privacy and security as core principles, not afterthoughts.
          </p>
        </ScrollAnimation>

        {/* Escrow Model - Enhanced */}
        <ScrollAnimation delay={0.1} className="mb-12">
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 lg:p-8 border border-slate-700 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />

            <h3 className="text-lg font-bold text-white text-center mb-8 relative">The Coro Escrow Model</h3>

            <div className="grid grid-cols-3 gap-4 items-center max-w-3xl mx-auto relative">
              {/* Animated flow line */}
              <div className="absolute left-[20%] right-[20%] top-10 h-0.5 bg-slate-700">
                {/* Animated dots */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="animate-flow-right absolute w-3 h-3 -top-[5px] rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                </div>
              </div>

              {/* Left arrow */}
              <div className="absolute left-[32%] top-[38px] text-blue-500">
                <ChevronRight className="w-4 h-4" />
              </div>

              {/* Right arrow */}
              <div className="absolute right-[32%] top-[38px] text-blue-500">
                <ChevronRight className="w-4 h-4" />
              </div>

              {/* Left: Employee/Customer */}
              <div className="text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto mb-3 border border-slate-600 hover:border-blue-500/50 transition-colors">
                  <Eye className="w-8 h-8 text-[#60A5FA]" />
                </div>
                <p className="font-semibold text-white text-sm">Employees & Customers</p>
                <p className="text-xs text-slate-400 mt-1">Share feedback via SMS</p>
              </div>

              {/* Middle: Coro - Enhanced with glow ring */}
              <div className="text-center relative z-10">
                <div className="relative">
                  {/* Animated glow ring */}
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl bg-blue-500/20 animate-pulse-slow" />
                  <div className="absolute -inset-1 w-[104px] h-[104px] mx-auto rounded-2xl bg-gradient-to-r from-blue-500/30 via-blue-400/30 to-blue-500/30 blur-sm animate-spin-slow" style={{ animationDuration: '8s' }} />

                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-500/40">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </div>
                <p className="font-bold text-white text-lg mt-2">Coro</p>
                <p className="text-sm text-[#60A5FA] mt-1">Neutral Third-Party Escrow</p>
              </div>

              {/* Right: Executives */}
              <div className="text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mx-auto mb-3 border border-slate-600 hover:border-blue-500/50 transition-colors">
                  <Database className="w-8 h-8 text-[#60A5FA]" />
                </div>
                <p className="font-semibold text-white text-sm">Executives</p>
                <p className="text-xs text-slate-400 mt-1">See insights, not identities</p>
              </div>
            </div>

            {/* Key point */}
            <div className="mt-8 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center max-w-2xl mx-auto relative">
              <p className="text-slate-300 text-sm">
                <span className="text-[#60A5FA] font-semibold">Key:</span> Even executives can't see who said what — only aggregated
                insights that drive action.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Gradient Glow Cards Grid - Enhanced */}
        <ScrollAnimation delay={0.2}>
          <div className="grid md:grid-cols-2 gap-4">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${feature.shadowColor}`}
              >
                {/* Gradient glow at top with blur */}
                <div className={`absolute inset-x-0 -top-10 h-32 bg-gradient-to-b ${feature.gradient} opacity-50 group-hover:opacity-80 blur-xl transition-all duration-500`} />
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${feature.gradient} opacity-60 group-hover:opacity-90 transition-all duration-500`} />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                </div>

                {/* Content */}
                <div className="relative p-5">
                  {/* Icon with hover animation */}
                  <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor} transition-all duration-300 group-hover:scale-110`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes flow-right {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-flow-right {
          animation: flow-right 2.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
