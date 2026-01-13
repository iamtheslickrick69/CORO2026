"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "privacy" | "terms"
}

export function LegalModal({ isOpen, onClose, initialTab = "privacy" }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab)

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
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-bold text-slate-900">Legal</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 py-3 border-b border-slate-100 flex-shrink-0">
              <div className="inline-flex rounded-full p-1 bg-slate-100">
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === "privacy"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab("terms")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === "terms"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Terms of Service
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {activeTab === "privacy" ? (
                  <motion.div
                    key="privacy"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PrivacyPolicy />
                  </motion.div>
                ) : (
                  <motion.div
                    key="terms"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TermsOfService />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function PrivacyPolicy() {
  return (
    <div className="prose prose-sm prose-slate max-w-none">
      <p className="text-xs text-slate-400 mb-4">Last Updated: January 13, 2026</p>

      <h3 className="text-lg font-semibold text-slate-900">Privacy Policy</h3>
      <p className="text-slate-600">
        Coro Inc. ("Coro," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our employee feedback platform.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">1. Information We Collect</h4>

      <p className="text-slate-600 font-medium">Information Provided by Employers:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Employee phone numbers for SMS communication</li>
        <li>Organizational structure data (departments, teams, locations)</li>
        <li>Company contact information</li>
      </ul>

      <p className="text-slate-600 font-medium mt-3">Information from Employees:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Feedback and responses submitted via SMS</li>
        <li>Message metadata (timestamps, response rates)</li>
      </ul>

      <p className="text-slate-600 font-medium mt-3">Automatically Collected Information:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Device and browser information when accessing our web platform</li>
        <li>Usage analytics and performance data</li>
        <li>Cookies and similar tracking technologies</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">2. How We Protect Anonymity</h4>
      <p className="text-slate-600">
        <strong>Employee anonymity is fundamental to our service.</strong> We implement the following safeguards:
      </p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>End-to-end encryption for all feedback data</li>
        <li>Zero-knowledge architecture — feedback is processed without linking to individual identities</li>
        <li>Minimum group sizes (5+) for any aggregated reporting to prevent identification</li>
        <li>No individual-level feedback is ever shared with employers</li>
        <li>Automatic data anonymization at the point of collection</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">3. How We Use Your Information</h4>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>To provide and maintain our feedback platform</li>
        <li>To generate aggregated, anonymized insights for employers</li>
        <li>To improve our AI analysis and platform features</li>
        <li>To communicate with employers about their account</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">4. SMS Communication</h4>
      <p className="text-slate-600">
        By participating in Coro through your employer, you consent to receive SMS messages related to workplace feedback. Message and data rates may apply. You can opt out at any time by replying STOP to any message. Message frequency varies based on employer configuration.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">5. Data Retention</h4>
      <p className="text-slate-600">
        We retain aggregated, anonymized feedback data for the duration of the employer's subscription plus 90 days. Individual message content is processed and anonymized within 24 hours. Employers may request data deletion in accordance with their agreement.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">6. Data Sharing</h4>
      <p className="text-slate-600">We do not sell personal information. We may share data with:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Service providers who assist in operating our platform (under strict confidentiality agreements)</li>
        <li>Law enforcement when required by valid legal process</li>
        <li>Successors in the event of a merger or acquisition (with equivalent privacy protections)</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">7. Your Rights</h4>
      <p className="text-slate-600">Depending on your jurisdiction, you may have the right to:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt out of SMS communications</li>
        <li>Lodge a complaint with a supervisory authority</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">8. GDPR & CCPA Compliance</h4>
      <p className="text-slate-600">
        We comply with the General Data Protection Regulation (GDPR) for EU residents and the California Consumer Privacy Act (CCPA) for California residents. For data subject requests, contact privacy@coro.io.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">9. Security</h4>
      <p className="text-slate-600">
        We implement industry-standard security measures including encryption in transit and at rest, regular security audits, access controls, and employee training. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">10. Contact Us</h4>
      <p className="text-slate-600">
        For privacy-related inquiries:<br />
        Email: privacy@coro.io<br />
        Address: Coro Inc., San Francisco, CA
      </p>
    </div>
  )
}

function TermsOfService() {
  return (
    <div className="prose prose-sm prose-slate max-w-none">
      <p className="text-xs text-slate-400 mb-4">Last Updated: January 13, 2026</p>

      <h3 className="text-lg font-semibold text-slate-900">Terms of Service</h3>
      <p className="text-slate-600">
        These Terms of Service ("Terms") govern your access to and use of the Coro platform and services. By using Coro, you agree to be bound by these Terms.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">1. Definitions</h4>
      <ul className="text-slate-600 text-sm space-y-1">
        <li><strong>"Platform"</strong> refers to Coro's employee feedback software, including web applications and SMS services</li>
        <li><strong>"Employer"</strong> refers to the organization that has subscribed to Coro's services</li>
        <li><strong>"Employee"</strong> refers to individuals who submit feedback through the Platform</li>
        <li><strong>"Content"</strong> refers to feedback, data, and materials submitted through the Platform</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">2. Account Registration</h4>
      <p className="text-slate-600">
        Employers must provide accurate, complete registration information and maintain the security of their account credentials. You are responsible for all activities under your account.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">3. Permitted Use</h4>
      <p className="text-slate-600">You agree to use the Platform only for:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Collecting legitimate employee feedback</li>
        <li>Improving workplace culture and conditions</li>
        <li>Purposes consistent with applicable law</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">4. Prohibited Conduct</h4>
      <p className="text-slate-600">You may not:</p>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Attempt to identify anonymous employees</li>
        <li>Retaliate against employees based on feedback</li>
        <li>Use the Platform for harassment or discrimination</li>
        <li>Reverse engineer or attempt to access source code</li>
        <li>Interfere with Platform security or integrity</li>
        <li>Violate any applicable laws or regulations</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">5. Employee Participation</h4>
      <p className="text-slate-600">
        Employers must inform employees about Coro and ensure participation is voluntary. Employees have the right to opt out at any time without consequence. Employers shall not coerce, incentivize, or penalize employees based on participation.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">6. Data Ownership</h4>
      <ul className="text-slate-600 text-sm space-y-1">
        <li>Employers retain ownership of organizational data provided to Coro</li>
        <li>Aggregated, anonymized insights generated by Coro are licensed to Employers for internal use</li>
        <li>Coro may use anonymized, aggregated data to improve its services</li>
      </ul>

      <h4 className="text-base font-semibold text-slate-900 mt-6">7. Confidentiality</h4>
      <p className="text-slate-600">
        Each party agrees to maintain the confidentiality of the other party's proprietary information. Employers shall not disclose individual feedback or attempt to identify respondents.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">8. Payment Terms</h4>
      <p className="text-slate-600">
        Subscription fees are billed according to the pricing plan selected. Fees are non-refundable except as required by law. We reserve the right to modify pricing with 30 days' notice.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">9. Service Availability</h4>
      <p className="text-slate-600">
        We strive for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance with reasonable notice. We are not liable for third-party service disruptions (SMS carriers, cloud providers).
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">10. Limitation of Liability</h4>
      <p className="text-slate-600">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, CORO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">11. Disclaimer of Warranties</h4>
      <p className="text-slate-600">
        THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">12. Indemnification</h4>
      <p className="text-slate-600">
        You agree to indemnify and hold harmless Coro from claims arising from your use of the Platform, violation of these Terms, or infringement of third-party rights.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">13. Termination</h4>
      <p className="text-slate-600">
        Either party may terminate with 30 days' written notice. We may terminate immediately for material breach. Upon termination, your access will be revoked and data will be handled per our Privacy Policy.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">14. Dispute Resolution</h4>
      <p className="text-slate-600">
        Any disputes shall be resolved through binding arbitration in San Francisco, California, under AAA Commercial Arbitration Rules. You waive the right to participate in class actions.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">15. Governing Law</h4>
      <p className="text-slate-600">
        These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">16. Changes to Terms</h4>
      <p className="text-slate-600">
        We may update these Terms with 30 days' notice. Continued use after changes constitutes acceptance. Material changes will be communicated via email.
      </p>

      <h4 className="text-base font-semibold text-slate-900 mt-6">17. Contact</h4>
      <p className="text-slate-600">
        For questions about these Terms:<br />
        Email: legal@coro.io<br />
        Address: Coro Inc., San Francisco, CA
      </p>
    </div>
  )
}
