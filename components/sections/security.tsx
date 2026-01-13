"use client"

import { useState } from "react"
import { Lock, EyeOff, Trash2, Users, Shield, MessageSquare, BarChart3, ArrowRight, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Consistent spring config
const springConfig = {
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All messages encrypted in transit and at rest using AES-256.",
    color: "#3B82F6",
  },
  {
    icon: EyeOff,
    title: "Anonymous by Design",
    description: "Employee identities are never linked to feedback.",
    color: "#10B981",
  },
  {
    icon: Trash2,
    title: "Zero Data Retention",
    description: "Raw messages processed and discarded. Only insights stored.",
    color: "#F59E0B",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Granular permissions for authorized personnel only.",
    color: "#8B5CF6",
  },
]

const escrowSteps = [
  {
    id: "input",
    icon: MessageSquare,
    label: "Employees",
    sublabel: "Anonymous SMS",
    details: [
      "Text via standard SMS",
      "No app required",
      "Identity never stored",
      "Encrypted instantly",
    ],
  },
  {
    id: "process",
    icon: Shield,
    label: "Coro",
    sublabel: "Secure Processing",
    isCenter: true,
    details: [
      "AI analyzes themes",
      "Raw data discarded",
      "Aggregation applied",
      "Neutral third-party",
    ],
  },
  {
    id: "output",
    icon: BarChart3,
    label: "Leaders",
    sublabel: "Insights Only",
    details: [
      "View trends & patterns",
      "Real-time alerts",
      "No individual data",
      "Actionable reports",
    ],
  },
]

function SecurityFeatureCard({ feature, index }: { feature: typeof securityFeatures[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", ...springConfig, delay: index * 0.1 }}
      className="group relative"
    >
      <motion.div
        className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 h-full"
        whileHover={{
          borderColor: feature.color,
          y: -2,
        }}
        transition={{ type: "spring", ...springConfig }}
      >
        {/* Subtle top glow */}
        <div
          className="absolute inset-x-0 top-0 h-px opacity-50"
          style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
        />

        <div className="flex items-start gap-4">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${feature.color}15` }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", ...springConfig }}
          >
            <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
          </motion.div>

          <div>
            <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function EscrowStep({
  step,
  index,
  isSelected,
  onClick
}: {
  step: typeof escrowSteps[0]
  index: number
  isSelected: boolean
  onClick: () => void
}) {
  const isCenter = step.isCenter

  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center text-center relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", ...springConfig, delay: index * 0.15 }}
    >
      {/* Icon container */}
      <motion.div
        className={`relative ${isCenter ? 'w-20 h-20' : 'w-14 h-14'} rounded-2xl flex items-center justify-center mb-3`}
        style={{
          background: isCenter
            ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
            : 'rgba(51, 65, 85, 0.8)',
          boxShadow: isCenter
            ? '0 8px 32px rgba(59, 130, 246, 0.3)'
            : 'none',
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: isCenter
            ? '0 12px 40px rgba(59, 130, 246, 0.4)'
            : '0 8px 24px rgba(59, 130, 246, 0.2)',
        }}
        whileTap={{ scale: 0.95 }}
        animate={isSelected ? {
          boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.5)',
        } : {}}
        transition={{ type: "spring", ...springConfig }}
      >
        <step.icon className={`${isCenter ? 'w-9 h-9' : 'w-6 h-6'} text-white`} />
      </motion.div>

      {/* Labels */}
      <p className={`font-semibold text-white ${isCenter ? 'text-lg' : 'text-sm'}`}>
        {step.label}
      </p>
      <p className={`text-slate-400 mt-0.5 ${isCenter ? 'text-sm' : 'text-xs'}`}>
        {step.sublabel}
      </p>
    </motion.button>
  )
}

function FlowArrow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex-1 flex items-center justify-center px-2 relative">
      {/* Static line */}
      <div className="w-full h-0.5 bg-slate-700 rounded-full relative overflow-hidden">
        {/* Animated glow */}
        <motion.div
          className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          initial={{ left: "-20%" }}
          animate={{ left: "120%" }}
          transition={{
            duration: 1.5,
            delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Arrow head */}
      <ArrowRight className="w-4 h-4 text-slate-500 -ml-1" />
    </div>
  )
}

export function SecuritySection() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const selectedData = escrowSteps.find(s => s.id === selectedStep)

  return (
    <section id="security" className="py-20 lg:py-28 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", ...springConfig }}
        >
          <span className="inline-block text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Enterprise Security
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Security That Earns Trust
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Privacy and security built in from day one, not added as an afterthought.
          </p>
        </motion.div>

        {/* Escrow Model - Clean horizontal flow */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 lg:p-10">

            <h3 className="text-center text-lg font-semibold text-white mb-2">
              The Coro Escrow Model
            </h3>
            <p className="text-center text-sm text-slate-500 mb-10">
              Tap any step to see details
            </p>

            {/* Flow diagram */}
            <div className="flex items-center justify-center max-w-2xl mx-auto mb-8">
              <EscrowStep
                step={escrowSteps[0]}
                index={0}
                isSelected={selectedStep === "input"}
                onClick={() => setSelectedStep(selectedStep === "input" ? null : "input")}
              />

              <FlowArrow delay={0} />

              <EscrowStep
                step={escrowSteps[1]}
                index={1}
                isSelected={selectedStep === "process"}
                onClick={() => setSelectedStep(selectedStep === "process" ? null : "process")}
              />

              <FlowArrow delay={0.75} />

              <EscrowStep
                step={escrowSteps[2]}
                index={2}
                isSelected={selectedStep === "output"}
                onClick={() => setSelectedStep(selectedStep === "output" ? null : "output")}
              />
            </div>

            {/* Expanded details */}
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedStep}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ type: "spring", ...springConfig }}
                  className="overflow-hidden"
                >
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 max-w-lg mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <selectedData.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{selectedData.label}</p>
                        <p className="text-xs text-slate-400">{selectedData.sublabel}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {selectedData.details.map((detail, i) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, type: "spring", ...springConfig }}
                          className="flex items-center gap-2 text-sm text-slate-300"
                        >
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    <span className="text-blue-400 font-medium">Key insight:</span>{" "}
                    Executives see aggregated trends, never individual responses.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Security features grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <SecurityFeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
