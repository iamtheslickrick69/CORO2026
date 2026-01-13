"use client"

import { ChevronRight } from "lucide-react"

const teams = [
  { name: "Engineering", score: 82, change: "+3", conversations: 156 },
  { name: "Sales", score: 68, change: "-7", conversations: 89 },
  { name: "Operations", score: 91, change: "+5", conversations: 124 },
  { name: "Customer Success", score: 76, change: "+1", conversations: 67 },
]

export function TeamsHealth() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-900">Team Health</h2>
        <button className="text-sm text-[#0066FF] hover:text-[#0052CC] font-medium flex items-center gap-1">
          Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{team.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{team.conversations} conversations</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  Number(team.change) >= 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}>
                  {team.change}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
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
              <span className="text-sm font-bold text-gray-900 w-10 text-right">{team.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
