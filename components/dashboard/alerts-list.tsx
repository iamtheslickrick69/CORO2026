"use client"

import { AlertTriangle, TrendingDown, MessageSquare, ChevronRight } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Retention Risk Detected",
    team: "Engineering",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "warning",
    title: "Sentiment Decline",
    team: "Sales",
    time: "4 hours ago",
    icon: TrendingDown,
  },
  {
    id: 3,
    type: "info",
    title: "New Theme Emerging",
    team: "Operations",
    time: "6 hours ago",
    icon: MessageSquare,
  },
]

const typeConfig = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-500",
    hover: "hover:bg-red-100"
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconBg: "bg-amber-500",
    hover: "hover:bg-amber-100"
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-[#0066FF]",
    hover: "hover:bg-blue-100"
  },
}

export function AlertsList() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900">Active Alerts</h2>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </div>
        <button className="text-sm text-[#0066FF] hover:text-[#0052CC] font-medium inline-flex items-center gap-1">
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = typeConfig[alert.type as keyof typeof typeConfig]
          return (
            <div
              key={alert.id}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 group hover:scale-[1.01] ${config.bg} ${config.border} ${config.hover}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.iconBg}`}>
                <alert.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{alert.title}</p>
                <p className="text-sm text-gray-500">{alert.team}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{alert.time}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
