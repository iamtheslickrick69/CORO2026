"use client"

import { useState } from "react"
import { Shield, Lock, Database, UserCheck, Users, ShoppingBag, Star } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { IPhoneMockup } from "@/components/ui/iphone-mockup"

export function CoroDemoSection() {
  const [activeTab, setActiveTab] = useState<"employees" | "customers">("employees")

  return (
    <section id="coro-demo" className="overflow-hidden relative">
      {/* Background Video - spans entire section */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/video-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
        // @ts-ignore - webkit attribute for iOS
        webkit-playsinline="true"
      >
        <source src="https://pub-7824dae2ffd24193b52760c54972be1d.r2.dev/000000000nick.mp4" type="video/mp4" />
      </video>
      {/* Dark Overlay - lighter on mobile for better video visibility */}
      <div className="absolute inset-0 bg-slate-900/50 md:bg-slate-900/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />

      {/* Tab Toggle */}
      <div className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full p-1 bg-slate-700">
              <button
                onClick={() => setActiveTab("employees")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "employees"
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-600"
                }`}
              >
                <Users className="w-4 h-4" />
                Employees
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "customers"
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-600"
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
        <div className="py-16 lg:py-24 min-h-[1200px] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Content Left */}
              <ScrollAnimation>
                <div className="max-w-full lg:max-w-[540px]">
                  <span className="inline-block text-sm font-semibold text-[#60A5FA] uppercase tracking-wide mb-4">
                    Meet Coro
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-white">
                    AI-Powered.
                    <br />
                    <span className="text-[#3B82F6]">Human-Protected.</span>
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    Coro uses AI to understand feedback, but your data stays yours. Never sold. Never shared. Never used to train external models. It's the neutral bridge between your employees and leadership.
                  </p>

                  <div className="bg-slate-700 backdrop-blur rounded-2xl p-6 mb-8 border border-blue-500/30 hover:border-[#3B82F6]/50 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-1">Your Data. Period.</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          We created Coro so no one profits from your sensitive information. Your data is never shared
                          with third parties. Never sold. Never used to train external models.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-600">
                      <div className="text-center">
                        <Lock className="w-5 h-5 text-[#60A5FA] mx-auto mb-2" />
                        <p className="text-xs text-slate-300">End-to-End Encrypted</p>
                      </div>
                      <div className="text-center">
                        <Database className="w-5 h-5 text-[#60A5FA] mx-auto mb-2" />
                        <p className="text-xs text-slate-300">Zero Data Selling</p>
                      </div>
                      <div className="text-center">
                        <UserCheck className="w-5 h-5 text-[#60A5FA] mx-auto mb-2" />
                        <p className="text-xs text-slate-300">You Own It All</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-700 border border-blue-500/30">
                    <UserCheck className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-white">Better than passwords:</span> Your 10-digit phone number
                      is your secure key. Only you can access your conversation history — not even executives can see who
                      said what.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              {/* iPhone Demo */}
              <ScrollAnimation delay={0.2} className="flex justify-center lg:justify-end">
                <IPhoneMockup className="scale-[0.85] lg:scale-100 origin-center" mode="employee" />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      )}

      {/* Customer Tab Content */}
      {activeTab === "customers" && (
        <div className="py-16 lg:py-24 min-h-[1200px] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* iPhone Demo */}
              <ScrollAnimation className="flex justify-center lg:justify-start">
                <IPhoneMockup className="scale-[0.85] lg:scale-100 origin-center" mode="customer" />
              </ScrollAnimation>

              {/* Content Right */}
              <ScrollAnimation delay={0.2}>
                <div className="max-w-full lg:max-w-[540px]">
                  <span className="inline-block text-sm font-semibold text-[#60A5FA] uppercase tracking-wide mb-4">
                    Customer Feedback
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-white">
                    Prevent Bad Reviews.
                    <br />
                    <span className="text-[#3B82F6]">Reward Good Ones.</span>
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    Give customers a direct line to you before they go to Google. Capture feedback, resolve issues, and
                    turn happy customers into 5-star advocates.
                  </p>

                  <div className="bg-slate-700 rounded-2xl p-6 mb-8 border border-blue-500/30 hover:border-[#3B82F6]/50 transition-colors">
                    <p className="text-sm text-slate-400 mb-2">Text feedback to</p>
                    <p className="text-2xl font-bold text-[#3B82F6] mb-4">(555) 123-Coro</p>
                    <p className="text-sm text-slate-300">
                      One number for employees and customers. Post in-store, on receipts, or on your website.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-700 border border-blue-500/30">
                    <Star className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-white">Customizable rewards:</span> Offer discounts, free
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
