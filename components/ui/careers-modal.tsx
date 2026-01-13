"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Heart, Zap, Mail } from "lucide-react"

interface CareersModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CareersModal({ isOpen, onClose }: CareersModalProps) {
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
              <h2 className="text-xl font-bold text-slate-900">Careers at Coro</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Intro */}
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Join Our Team</h3>
                <p className="text-sm text-slate-600">
                  We're building the future of workplace communication. Come help us give every employee a voice.
                </p>
              </div>

              {/* Culture */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Heart className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-900">Remote-First</p>
                  <p className="text-xs text-slate-500">Work from anywhere</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Zap className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-900">Fast-Paced</p>
                  <p className="text-xs text-slate-500">Ship every week</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-700 mb-3">
                  We're a small but mighty team. While we don't have open roles right now, we're always looking for exceptional people.
                </p>
                <a
                  href="mailto:careers@coro.io"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0066FF] hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  careers@coro.io
                </a>
              </div>

              {/* What we look for */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">What We Look For</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] mt-1">•</span>
                    Builders who ship fast and iterate faster
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] mt-1">•</span>
                    People who care deeply about user privacy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] mt-1">•</span>
                    Clear communicators who thrive async
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] mt-1">•</span>
                    Mission-driven individuals who want to make work better
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
