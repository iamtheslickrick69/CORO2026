"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Target, Users, Shield } from "lucide-react"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">About Coro</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Mission */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Our Mission</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We believe every voice deserves to be heard. Coro gives employees a safe, anonymous way to share feedback that actually reaches leadership — and drives real change.
                  </p>
                </div>
              </div>

              {/* Story */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Our Story</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Founded in 2024, Coro was born from a simple observation: traditional employee feedback systems fail because they're complicated, infrequent, and employees don't trust them. We built something different — SMS-based, always-on, and truly anonymous.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Our Values</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>Trust first.</strong> We protect anonymity at all costs.<br />
                    <strong>Simplicity always.</strong> If it's not easy, people won't use it.<br />
                    <strong>Action over data.</strong> Insights mean nothing without change.
                  </p>
                </div>
              </div>

              {/* Team note */}
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-600 text-center">
                  We're a small, passionate team based in San Francisco, dedicated to transforming how organizations listen to their people.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
