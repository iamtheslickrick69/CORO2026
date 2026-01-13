"use client"

import { Send, RefreshCw, Star, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CampaignCardProps {
  name: string
  description: string
  status: "active" | "scheduled" | "draft" | "completed"
  responseRate?: number
  type: "recurring" | "one-time"
  isStarred?: boolean
}

const statusConfig = {
  active: { label: "Active", color: "bg-emerald-100 text-emerald-700" },
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700" },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600" },
}

export function CampaignCard({
  name,
  description,
  status,
  responseRate,
  type,
  isStarred = false
}: CampaignCardProps) {
  const config = statusConfig[status]

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          status === "active"
            ? "bg-gradient-to-br from-[#0066FF] to-[#0052CC]"
            : "bg-gray-100"
        }`}>
          {type === "recurring" ? (
            <RefreshCw className={`w-5 h-5 ${status === "active" ? "text-white" : "text-gray-500"}`} />
          ) : (
            <Send className={`w-5 h-5 ${status === "active" ? "text-white" : "text-gray-500"}`} />
          )}
        </div>
        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-50 rounded-lg transition-all">
          <Star className={`w-4 h-4 ${isStarred ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>

      {/* Status & Stats */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.color}`}>
          {config.label}
        </span>
        {responseRate !== undefined && (
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{responseRate}%</span> response
          </span>
        )}
      </div>

      {/* Action */}
      <Button
        variant="outline"
        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
      >
        {status === "draft" ? "Edit Draft" : "View Details"}
      </Button>
    </div>
  )
}
