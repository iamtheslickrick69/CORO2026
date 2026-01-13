"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  BarChart3,
  MessageSquare,
  Users,
  AlertTriangle,
  ChevronRight,
  Download,
  Calendar,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Send,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCard } from "./stat-card"
import { recentAlerts, topThemes, teamHealth } from "@/lib/dashboard-data"

export function OverviewTab() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stat cards
      gsap.fromTo(
        ".stat-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out"
        }
      )

      // Animate sections
      gsap.fromTo(
        ".dashboard-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.3,
          ease: "power3.out"
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Monitor employee sentiment and engagement in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-white border-blue-100 text-gray-600 hover:bg-blue-50">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Last 30 days</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <StatCard
            title="Culture Health Score"
            value="78"
            suffix="/100"
            change="+4"
            changeType="positive"
            icon={BarChart3}
            gradient="from-[#0066FF] to-[#0052CC]"
          />
        </div>
        <div className="stat-card">
          <StatCard
            title="Active Conversations"
            value="312"
            change="+28"
            changeType="positive"
            icon={MessageSquare}
            gradient="from-blue-500 to-indigo-600"
          />
        </div>
        <div className="stat-card">
          <StatCard
            title="Response Rate"
            value="94"
            suffix="%"
            change="+2%"
            changeType="positive"
            icon={Users}
            gradient="from-emerald-500 to-green-600"
          />
        </div>
        <div className="stat-card">
          <StatCard
            title="Open Alerts"
            value="7"
            change="-3"
            changeType="negative"
            icon={AlertTriangle}
            gradient="from-amber-500 to-orange-600"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Alerts */}
          <div className="dashboard-section glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-lg text-gray-800">Recent Alerts</h2>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer group ${
                    alert.type === "high"
                      ? "bg-red-50 hover:bg-red-100 border border-red-100"
                      : alert.type === "medium"
                        ? "bg-amber-50 hover:bg-amber-100 border border-amber-100"
                        : "bg-blue-50 hover:bg-blue-50 border border-blue-50"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      alert.type === "high" ? "bg-red-500" : alert.type === "medium" ? "bg-amber-500" : "bg-[#0066FF]"
                    }`}
                  >
                    <alert.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{alert.title}</p>
                    <p className="text-sm text-gray-500">{alert.team}</p>
                  </div>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Team Health */}
          <div className="dashboard-section glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-lg text-gray-800">Team Health</h2>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-5">
              {teamHealth.map((team) => (
                <div key={team.team} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{team.team}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{team.conversations} conversations</span>
                      <span
                        className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                          Number(team.change) >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {Number(team.change) >= 0 ? "+" : ""}
                        {team.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-blue-50 rounded-full overflow-hidden">
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
                    <span className="text-sm font-bold text-gray-800 w-10 text-right">{team.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Themes */}
          <div className="dashboard-section glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-5">Top Themes</h2>
            <div className="space-y-4">
              {topThemes.map((item, index) => (
                <div key={item.theme} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        index === 0
                          ? "bg-amber-100 text-amber-700"
                          : index === 1
                            ? "bg-slate-200 text-gray-600"
                            : index === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-50 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700 group-hover:text-slate-900">{item.theme}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">{item.count}</span>
                    {item.trend === "up" && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                    {item.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-5">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start gap-3 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] shadow-lg shadow-blue-500/25">
                <Send className="w-4 h-4" />
                Launch New Campaign
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
              >
                <FileText className="w-4 h-4" />
                Create Template
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
              >
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
