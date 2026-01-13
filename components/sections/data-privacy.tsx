"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Lock, Eye, ShieldCheck } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!startOnView || !isInView) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

export function DataPrivacySection() {
  const breaches = useCounter(0, 1000)
  const encryption = useCounter(256, 1500)

  return (
    <section className="py-16 lg:py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12">
          <span className="text-xs font-semibold text-[#60A5FA] uppercase tracking-wider">Data Privacy</span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Your Data Stays <span className="text-[#3B82F6]">Yours.</span>
          </h2>
        </ScrollAnimation>

        {/* Main 3 Cards */}
        <ScrollAnimation delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* Zero Breaches */}
            <motion.div
              ref={breaches.ref}
              className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-6 border border-emerald-500/30 text-center"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-emerald-400 mb-1">{breaches.count}</div>
              <div className="text-sm text-emerald-300 font-medium">Data Breaches</div>
              <div className="text-xs text-slate-400 mt-1">Since 2024</div>
            </motion.div>

            {/* 256-bit Encryption */}
            <motion.div
              ref={encryption.ref}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Lock className="w-10 h-10 text-[#60A5FA] mx-auto mb-4" />
              <div className="text-5xl font-bold text-white mb-1">{encryption.count}</div>
              <div className="text-sm text-slate-300 font-medium">Bit Encryption</div>
              <div className="text-xs text-slate-400 mt-1">AES Standard</div>
            </motion.div>

            {/* 100% Anonymous */}
            <motion.div
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Eye className="w-10 h-10 text-[#60A5FA] mx-auto mb-4" />
              <div className="text-5xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-slate-300 font-medium">Anonymous</div>
              <div className="text-xs text-slate-400 mt-1">Insights, not identities</div>
            </motion.div>

          </div>
        </ScrollAnimation>

        {/* Compliance Badges Row */}
        <ScrollAnimation delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <motion.div
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-xs sm:text-sm font-semibold text-white">SOC 2</span>
              <span className="text-[10px] sm:text-xs text-slate-400">Type II</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-xs sm:text-sm font-semibold text-white">GDPR</span>
              <span className="text-[10px] sm:text-xs text-slate-400">Compliant</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="text-xs sm:text-sm font-semibold text-white">CCPA</span>
              <span className="text-[10px] sm:text-xs text-slate-400">Compliant</span>
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Bottom Banner */}
        <ScrollAnimation delay={0.3}>
          <motion.div
            className="bg-gradient-to-r from-[#3B82F6]/10 via-slate-800 to-[#3B82F6]/10 rounded-2xl p-6 border border-blue-500/20 text-center"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center gap-4">
              <Shield className="w-6 h-6 text-[#60A5FA]" />
              <div>
                <div className="text-base font-semibold text-white">We Never Sell, Share, or Train on Your Data</div>
                <div className="text-sm text-slate-400">Your data belongs to you — not advertisers, not us.</div>
              </div>
              <Shield className="w-6 h-6 text-[#60A5FA]" />
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
