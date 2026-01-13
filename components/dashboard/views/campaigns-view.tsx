"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Plus,
  Search,
  Filter,
  RefreshCw,
  Send,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Eye,
  Edit3,
  Trash2,
  Users,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"

const campaigns = [
  {
    id: 1,
    name: "Q4 Engagement Check-in",
    type: "recurring",
    status: "active",
    audience: "All Employees",
    audienceCount: 1247,
    responseRate: 89,
    nextSend: "Nov 15, 2024",
    template: "Quarterly Pulse",
  },
  {
    id: 2,
    name: "New Hire 30-Day Check-in",
    type: "recurring",
    status: "active",
    audience: "New Hires",
    audienceCount: 34,
    responseRate: 94,
    nextSend: "Triggered",
    template: "Onboarding Check-in",
  },
  {
    id: 3,
    name: "Post-Layoff Sentiment",
    type: "one-time",
    status: "scheduled",
    audience: "Engineering",
    audienceCount: 156,
    responseRate: null,
    nextSend: "Nov 20, 2024",
    template: "Crisis Response",
  },
  {
    id: 4,
    name: "Manager Feedback Initiative",
    type: "one-time",
    status: "scheduled",
    audience: "All Managers",
    audienceCount: 89,
    responseRate: null,
    nextSend: "Nov 22, 2024",
    template: "Leadership 360",
  },
  {
    id: 5,
    name: "Remote Work Survey",
    type: "one-time",
    status: "completed",
    audience: "Remote Workers",
    audienceCount: 312,
    responseRate: 76,
    nextSend: null,
    template: "Work Environment",
  },
  {
    id: 6,
    name: "Benefits Feedback",
    type: "one-time",
    status: "draft",
    audience: "Full-time Employees",
    audienceCount: 1089,
    responseRate: null,
    nextSend: null,
    template: "Custom",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-emerald-100 text-emerald-700", icon: Play },
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700", icon: Calendar },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-600", icon: Clock },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600", icon: CheckCircle2 },
  paused: { label: "Paused", color: "bg-amber-100 text-amber-700", icon: Pause },
}

const filters = ["All", "Active", "Scheduled", "Draft", "Completed"]

export function CampaignsView() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = activeFilter === "All" || campaign.status === activeFilter.toLowerCase()
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".campaign-row",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [activeFilter, searchQuery])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your employee outreach campaigns</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:shadow-lg hover:shadow-blue-500/25 transition-all">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/25"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left p-4 font-semibold text-sm text-gray-500">Campaign</th>
              <th className="text-left p-4 font-semibold text-sm text-gray-500">Status</th>
              <th className="text-left p-4 font-semibold text-sm text-gray-500 hidden md:table-cell">Audience</th>
              <th className="text-left p-4 font-semibold text-sm text-gray-500 hidden lg:table-cell">Response</th>
              <th className="text-left p-4 font-semibold text-sm text-gray-500 hidden lg:table-cell">Next Send</th>
              <th className="text-right p-4 font-semibold text-sm text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign) => {
              const config = statusConfig[campaign.status as keyof typeof statusConfig]
              const StatusIcon = config.icon
              return (
                <tr
                  key={campaign.id}
                  className="campaign-row border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          campaign.type === "recurring"
                            ? "bg-blue-50 text-[#0066FF]"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {campaign.type === "recurring" ? (
                            <span className="flex items-center gap-1">
                              <RefreshCw className="w-3 h-3" /> Recurring
                            </span>
                          ) : "One-time"}
                        </span>
                        <span className="text-xs text-gray-400">{campaign.template}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${config.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{campaign.audience}</span>
                      <span className="text-xs text-gray-400">({campaign.audienceCount})</span>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {campaign.responseRate ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-full"
                            style={{ width: `${campaign.responseRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{campaign.responseRate}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-500">{campaign.nextSend || "—"}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No campaigns found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
