"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Mail, Clock, FileQuestion } from "lucide-react"

interface HelpCenterModalProps {
  isOpen: boolean
  onClose: () => void
}

const helpTopics = [
  {
    question: "How do I get started with Coro?",
    answer: "Book a demo with our team and we'll walk you through setup. Most companies are live within 2 weeks."
  },
  {
    question: "Is my feedback really anonymous?",
    answer: "Yes. We use end-to-end encryption and zero-knowledge architecture. Even our team cannot see who sent what."
  },
  {
    question: "How do employees access Coro?",
    answer: "Employees receive a text message from Coro. They simply reply - no app download, no login required."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide dedicated onboarding, training for HR teams, and ongoing support via email and chat."
  },
]

export function HelpCenterModal({ isOpen, onClose }: HelpCenterModalProps) {
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
              <h2 className="text-xl font-bold text-slate-900">Help Center</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Quick Help */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="mailto:support@coro.io"
                  className="bg-slate-50 hover:bg-slate-100 rounded-xl p-4 text-center transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-900">Email Support</p>
                  <p className="text-xs text-slate-500">support@coro.io</p>
                </a>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Clock className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-900">Response Time</p>
                  <p className="text-xs text-slate-500">Within 24 hours</p>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileQuestion className="w-5 h-5 text-[#0066FF]" />
                  <h3 className="font-semibold text-slate-900">Common Questions</h3>
                </div>
                <div className="space-y-3">
                  {helpTopics.map((topic, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-slate-900 mb-1">{topic.question}</p>
                      <p className="text-sm text-slate-600">{topic.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-xl p-5 text-center">
                <MessageCircle className="w-8 h-8 text-white/80 mx-auto mb-2" />
                <p className="text-white font-medium mb-1">Still have questions?</p>
                <p className="text-white/80 text-sm mb-3">Our team is here to help.</p>
                <a
                  href="mailto:support@coro.io"
                  className="inline-block bg-white text-[#0066FF] px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
