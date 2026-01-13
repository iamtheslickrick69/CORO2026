"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Users, Zap, Mail, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

// Spring configuration for smooth, natural animations
const springConfig = {
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

const comparisonData = {
  hrTools: {
    stats: [
      { icon: Mail, value: "20%", label: "Open Rate", description: "Lost in inbox, ignored" },
      { icon: Users, value: "35%", label: "Response Rate", description: "Survey fatigue is real" },
      { icon: Clock, value: "6 weeks", label: "Time to Insights", description: "Stale before you see it" },
    ],
    accentColor: "slate",
  },
  coro: {
    stats: [
      { icon: MessageSquare, value: "98%", label: "Open Rate", description: "Everyone reads texts" },
      { icon: TrendingUp, value: "80%", label: "Response Rate", description: "Real conversations" },
      { icon: Zap, value: "Real-time", label: "Time to Insights", description: "Act on day one, not day sixty" },
    ],
    accentColor: "blue",
  },
}

export function StatsCardsSection() {
  const [activeTab, setActiveTab] = useState<"hrTools" | "coro">("coro")
  const isHrTools = activeTab === "hrTools"
  const data = comparisonData[activeTab]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollAnimation>
            <Badge variant="outline" className="text-[#0066FF] border-[#0066FF]/30 bg-[#0066FF]/5 mb-4">
              Why Coro
            </Badge>
            <h2 className="text-4xl lg:text-5xl tracking-tight font-bold text-slate-900">
              Stop Asking. Start Listening.
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Traditional surveys miss the moment. Coro catches it.
            </p>
          </ScrollAnimation>
        </div>

        {/* Interactive Comparison */}
        <ScrollAnimation>
          <div className="border rounded-2xl bg-white shadow-lg max-w-3xl mx-auto overflow-hidden">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              animate={{
                backgroundColor: isHrTools ? "rgb(248, 250, 252)" : "rgb(239, 246, 255)",
              }}
              transition={{ type: "spring", ...springConfig }}
            >
              {/* Toggle */}
              <div className="px-6 py-6 flex justify-center">
                <div className="inline-flex rounded-full p-1 bg-slate-100 border border-slate-200">
                  <button
                    onClick={() => setActiveTab("hrTools")}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      isHrTools
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    HR Software
                  </button>
                  <button
                    onClick={() => setActiveTab("coro")}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      !isHrTools
                        ? "bg-[#0066FF] text-white shadow-md"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Coro
                  </button>
                </div>
              </div>

              {/* Divider */}
              <motion.div
                className="h-px"
                animate={{
                  backgroundColor: isHrTools ? "rgb(226, 232, 240)" : "rgba(0, 102, 255, 0.2)",
                }}
                transition={{ type: "spring", ...springConfig }}
              />

              {/* Stats */}
              <div className="p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", ...springConfig }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {data.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          ...springConfig,
                          delay: index * 0.1,
                        }}
                      >
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <motion.div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            animate={{
                              backgroundColor: isHrTools ? "rgb(226, 232, 240)" : "rgb(0, 102, 255)",
                              boxShadow: isHrTools
                                ? "none"
                                : "0 10px 15px -3px rgba(0, 102, 255, 0.25)",
                            }}
                            transition={{ type: "spring", ...springConfig }}
                          >
                            <stat.icon
                              className="w-6 h-6"
                              style={{ color: isHrTools ? "#94a3b8" : "#ffffff" }}
                            />
                          </motion.div>
                        </div>

                        {/* Value */}
                        <motion.div
                          className="text-3xl lg:text-4xl font-bold mb-1"
                          animate={{
                            color: isHrTools ? "#94a3b8" : "#0066FF",
                          }}
                          transition={{ type: "spring", ...springConfig }}
                        >
                          {stat.value}
                        </motion.div>

                        <motion.div
                          className="text-sm font-semibold mb-2"
                          animate={{
                            color: isHrTools ? "#94a3b8" : "#0f172a",
                          }}
                          transition={{ type: "spring", ...springConfig }}
                        >
                          {stat.label}
                        </motion.div>
                        <motion.div
                          className="text-sm leading-relaxed"
                          animate={{
                            color: isHrTools ? "#94a3b8" : "#475569",
                          }}
                          transition={{ type: "spring", ...springConfig }}
                        >
                          {stat.description}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footnote */}
              <div className="px-8 pb-4">
                <p className="text-xs text-slate-400 text-center">
                  Based on SMS vs. email engagement benchmarks
                </p>
              </div>

              {/* Bottom Accent */}
              <motion.div
                className="h-1.5"
                animate={{
                  background: isHrTools
                    ? "rgb(226, 232, 240)"
                    : "linear-gradient(to right, #0066FF, #3B82F6, #60A5FA)",
                }}
                transition={{ type: "spring", ...springConfig }}
              />
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
