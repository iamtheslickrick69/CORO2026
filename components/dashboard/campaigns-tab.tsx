"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Plus,
  RefreshCw,
  Users,
  Eye,
  Edit3,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockCampaigns, campaignStatuses } from "@/lib/dashboard-data"

interface CampaignsTabProps {
  onCreateCampaign: () => void
}

export function CampaignsTab({ onCreateCampaign }: CampaignsTabProps) {
  const [filter, setFilter] = useState("all")
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredCampaigns = filter === "all" ? mockCampaigns : mockCampaigns.filter((c) => c.status === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".campaign-row",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out"
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [filter])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Campaigns</h1>
          <p className="text-gray-500 mt-1">Create and manage employee outreach campaigns</p>
        </div>
        <Button onClick={onCreateCampaign} className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "active", "scheduled", "pending", "draft", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status
                ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/25"
                : "bg-blue-50 text-gray-600 hover:text-gray-800"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="glass-card rounded-2xl border border-blue-100/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50">
                <th className="text-left p-4 font-semibold text-sm text-gray-500">Campaign</th>
                <th className="text-left p-4 font-semibold text-sm text-gray-500">Status</th>
                <th className="text-left p-4 font-semibold text-sm text-gray-500 hidden md:table-cell">Audience</th>
                <th className="text-left p-4 font-semibold text-sm text-gray-500 hidden lg:table-cell">
                  Response Rate
                </th>
                <th className="text-left p-4 font-semibold text-sm text-gray-500 hidden lg:table-cell">Next Send</th>
                <th className="text-right p-4 font-semibold text-sm text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => {
                const statusConfig = campaignStatuses[campaign.status as keyof typeof campaignStatuses]
                const StatusIcon = statusConfig.icon
                return (
                  <tr
                    key={campaign.id}
                    className="campaign-row border-b border-blue-50 last:border-0 hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-800">{campaign.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              campaign.type === "recurring"
                                ? "bg-blue-100 text-[#0052CC]"
                                : "bg-slate-200 text-gray-600"
                            }`}
                          >
                            {campaign.type === "recurring" ? (
                              <span className="flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" /> Recurring
                              </span>
                            ) : (
                              "One-time"
                            )}
                          </span>
                          <span className="text-xs text-gray-500">{campaign.template}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-800">{campaign.audience}</span>
                        <span className="text-xs text-gray-500">({campaign.audienceCount})</span>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {campaign.responseRate ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0066FF] rounded-full"
                              style={{ width: `${campaign.responseRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-800">{campaign.responseRate}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-500">{campaign.nextSend || "—"}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
