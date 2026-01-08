"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Shield, Lock, Database, UserCheck, Users, ShoppingBag, Star } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { IPhoneFrame } from "@/components/ui/iphone-frame"

// Dynamically import MessagesApp to avoid SSR issues with Zustand
const MessagesApp = dynamic(() => import("@/components/messages/messages-app").then(mod => ({ default: mod.MessagesApp })), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
})

export function CoroDemoSection() {
  const [activeTab, setActiveTab] = useState<"employees" | "customers">("employees")

  return (
    <section className="overflow-hidden">
      {/* Tab Toggle */}
      <div
        className={`py-8 transition-colors duration-500 ${activeTab === "employees" ? "bg-blue-50/50" : "bg-slate-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div
              className={`inline-flex rounded-full p-1 ${activeTab === "employees" ? "bg-blue-100/50" : "bg-white shadow-md border border-slate-300"}`}
            >
              <button
                onClick={() => setActiveTab("employees")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "employees"
                    ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <Users className="w-4 h-4" />
                Employees
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "customers"
                    ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Customers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Tab Content */}
      {activeTab === "employees" && (
        <div className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white min-h-[1200px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Content Left */}
              <ScrollAnimation>
                <div className="max-w-full lg:max-w-[540px]">
                  <span className="inline-block text-sm font-semibold text-[#0066FF] uppercase tracking-wide mb-4">
                    Meet CORO
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-gray-900">
                    Not AI. Not a Bot.
                    <br />
                    <span className="text-[#0066FF]">A Trusted Third-Party Escrow.</span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    CORO is an intelligent closed-source script, trained by AI but not AI itself. It's the neutral bridge
                    between your employees and leadership — a third-party escrow that protects both sides.
                  </p>

                  <div className="glass-card backdrop-blur rounded-2xl p-6 mb-8 border border-blue-200/50 hover:border-[#0066FF]/30 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Your Data. Period.</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          We created CORO so no one profits from your sensitive information. Your data is never shared
                          with third parties. Never sold. Never used to train external models.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-100">
                      <div className="text-center">
                        <Lock className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                        <p className="text-xs text-gray-600">End-to-End Encrypted</p>
                      </div>
                      <div className="text-center">
                        <Database className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                        <p className="text-xs text-gray-600">Zero Data Selling</p>
                      </div>
                      <div className="text-center">
                        <UserCheck className="w-5 h-5 text-[#0066FF] mx-auto mb-2" />
                        <p className="text-xs text-gray-600">You Own It All</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl glass-card border border-blue-200/50">
                    <UserCheck className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Better than passwords:</span> Your 10-digit phone number
                      is your secure key. Only you can access your conversation history — not even executives can see who
                      said what.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* iPhone Demo */}
              <ScrollAnimation delay={0.2} className="flex justify-center lg:justify-end">
                <div className="scale-90 lg:scale-100">
                  <IPhoneFrame>
                    <MessagesApp />
                  </IPhoneFrame>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      )}

      {/* Customer Tab Content */}
      {activeTab === "customers" && (
        <div className="py-16 lg:py-24 bg-slate-200 min-h-[1200px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* iPhone Demo */}
              <ScrollAnimation className="flex justify-center lg:justify-start">
                <div className="scale-90 lg:scale-100">
                  <IPhoneFrame>
                    <MessagesApp />
                  </IPhoneFrame>
                </div>
              </ScrollAnimation>

              {/* Content Right */}
              <ScrollAnimation delay={0.2}>
                <div className="max-w-full lg:max-w-[540px]">
                  <span className="inline-block text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                    Customer Feedback
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-gray-900">
                    Prevent Bad Reviews.
                    <br />
                    <span className="text-[#0066FF]">Reward Good Ones.</span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Give customers a direct line to you before they go to Google. Capture feedback, resolve issues, and
                    turn happy customers into 5-star advocates.
                  </p>

                  <div className="glass-card rounded-2xl p-6 mb-8 border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-500 mb-2">Text feedback to</p>
                    <p className="text-2xl font-bold text-[#0066FF] mb-4">(555) 123-CORO</p>
                    <p className="text-sm text-gray-600">
                      One number for employees and customers. Post in-store, on receipts, or on your website.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl glass-card border border-blue-200/50">
                    <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Customizable rewards:</span> Offer discounts, free
                      items, loyalty points, or any reward you choose to thank customers for positive reviews.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
