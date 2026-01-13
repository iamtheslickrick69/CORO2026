"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Search,
  Users,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  MoreHorizontal
} from "lucide-react"

const teams = [
  {
    id: 1,
    name: "Engineering",
    members: 156,
    score: 82,
    change: "+3",
    positive: true,
    conversations: 156,
    alerts: 2,
    topTheme: "Work-life balance",
    manager: "Sarah Chen",
  },
  {
    id: 2,
    name: "Sales",
    members: 89,
    score: 68,
    change: "-7",
    positive: false,
    conversations: 89,
    alerts: 4,
    topTheme: "Manager communication",
    manager: "Mike Johnson",
  },
  {
    id: 3,
    name: "Operations",
    members: 124,
    score: 91,
    change: "+5",
    positive: true,
    conversations: 124,
    alerts: 0,
    topTheme: "Career growth",
    manager: "Lisa Park",
  },
  {
    id: 4,
    name: "Customer Success",
    members: 67,
    score: 76,
    change: "+1",
    positive: true,
    conversations: 67,
    alerts: 1,
    topTheme: "Compensation",
    manager: "David Kim",
  },
  {
    id: 5,
    name: "Marketing",
    members: 45,
    score: 85,
    change: "+4",
    positive: true,
    conversations: 45,
    alerts: 0,
    topTheme: "Team collaboration",
    manager: "Emily Davis",
  },
  {
    id: 6,
    name: "Human Resources",
    members: 32,
    score: 88,
    change: "+2",
    positive: true,
    conversations: 32,
    alerts: 0,
    topTheme: "Work environment",
    manager: "Rachel Torres",
  },
]

export function TeamsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [searchQuery])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-500 mt-1">Monitor health and engagement across your organization</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="team-card group bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{team.name}</h3>
                <p className="text-sm text-gray-500">{team.manager}</p>
              </div>
              <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-50 rounded-lg transition-all">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Health Score</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    team.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  }`}>
                    {team.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {team.change}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        team.score >= 80
                          ? "bg-gradient-to-r from-emerald-500 to-green-500"
                          : team.score >= 60
                            ? "bg-gradient-to-r from-amber-500 to-yellow-500"
                            : "bg-gradient-to-r from-red-500 to-rose-500"
                      }`}
                      style={{ width: `${team.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-900">{team.score}%</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{team.members}</p>
                <p className="text-xs text-gray-400">Members</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{team.conversations}</p>
                <p className="text-xs text-gray-400">Chats</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <p className={`text-sm font-semibold ${team.alerts > 0 ? "text-red-600" : "text-gray-900"}`}>{team.alerts}</p>
                <p className="text-xs text-gray-400">Alerts</p>
              </div>
            </div>

            {/* Top Theme */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 mb-1">Top Theme</p>
                <p className="text-sm font-medium text-gray-700">{team.topTheme}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
