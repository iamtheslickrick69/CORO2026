"use client"

import { Shield, Lock, UserX, Eye, CheckCircle2 } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function DataPrivacySection() {
  return (
    <section className="py-20 lg:py-32 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12">
          <span className="text-sm font-semibold text-[#60A5FA] uppercase tracking-wide">Data Privacy</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            We Created Coro So
            <br />
            <span className="text-[#3B82F6]">No One Profits From Your Data.</span>
          </h2>
        </ScrollAnimation>

        {/* Bento Grid */}
        <ScrollAnimation delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Featured Card - Your Data. Period. (spans 2 cols on lg) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/40 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Your Data. Period.</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Unlike other platforms, we don't sell data, share with third parties, or use your sensitive
                    information to train models. Your data belongs to you — not advertisers, not data brokers, not us.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-slate-700 text-sm text-slate-300 border border-slate-600">
                      No data selling
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-slate-700 text-sm text-slate-300 border border-slate-600">
                      No third-party sharing
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-slate-700 text-sm text-slate-300 border border-slate-600">
                      No model training
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone = Your Key */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Lock className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phone = Your Key</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your 10-digit phone number is your secure login. Only you can access your conversation history — not even executives.
              </p>
            </div>

            {/* Anonymous to Leadership */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Eye className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Anonymous to Leadership</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Executives get actionable insights, never raw conversations or identities. The trust layer that makes honesty possible.
              </p>
            </div>

            {/* SOC 2 + GDPR - spans 2 cols on lg */}
            <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/40 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-[#60A5FA]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Enterprise-Grade Compliance</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    SOC 2 Type II certified. GDPR compliant. Built for regulated industries with independently audited security practices.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      SOC 2 Type II
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      GDPR Compliant
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      End-to-End Encrypted
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
