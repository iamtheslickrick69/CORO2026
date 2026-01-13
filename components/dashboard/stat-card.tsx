"use client"

import type React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  suffix?: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ElementType
  gradient?: string
}

export function StatCard({
  title,
  value,
  suffix,
  change,
  changeType,
  icon: Icon,
  gradient = "from-[#0066FF] to-[#0052CC]",
}: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-200 transition-all group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{title}</span>
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {suffix && <span className="text-lg text-gray-400">{suffix}</span>}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
            changeType === "positive" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
        >
          {changeType === "positive" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
    </div>
  )
}
