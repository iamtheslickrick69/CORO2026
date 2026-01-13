"use client"

import { MessageSquare, Users, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    label: "Active Conversations",
    value: "312",
    change: "+28",
    changeType: "positive",
    icon: MessageSquare,
    isLive: true,
  },
  {
    label: "Response Rate",
    value: "94%",
    change: "+2%",
    changeType: "positive",
    icon: Users,
    isLive: false,
  },
  {
    label: "Open Alerts",
    value: "7",
    change: "-3",
    changeType: "positive",
    icon: AlertTriangle,
    isLive: true,
  },
]

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-200 relative cursor-pointer"
        >
          {stat.isLive && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">Live</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
            <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
              stat.changeType === "positive"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}>
              {stat.changeType === "positive" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
