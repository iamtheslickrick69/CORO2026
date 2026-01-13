"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Download, Calendar, ChevronDown, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { sentimentData, responseRateData, departmentData, themeData } from "@/lib/dashboard-data"

export function AnalyticsTab() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chart-card",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
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
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500 mt-1">Deep insights into employee sentiment and engagement trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-white border-blue-100 text-gray-600 hover:bg-blue-50">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Last 12 months</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Avg. Sentiment Score</p>
          <p className="text-3xl font-bold text-gray-800">
            8.2<span className="text-lg text-gray-400">/10</span>
          </p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +0.4 from last month
          </p>
        </div>
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Conversations</p>
          <p className="text-3xl font-bold text-gray-800">4,892</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +312 this month
          </p>
        </div>
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Issues Resolved</p>
          <p className="text-3xl font-bold text-gray-800">847</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 94% resolution rate
          </p>
        </div>
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Retention Risk Alerts</p>
          <p className="text-3xl font-bold text-gray-800">12</p>
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> 3 new this week
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sentiment Over Time */}
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Sentiment Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData}>
                <defs>
                  <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="positive" stackId="1" stroke="#0066FF" fill="url(#positiveGradient)" name="Positive" />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke="#94a3b8" fill="url(#neutralGradient)" name="Neutral" />
                <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="url(#negativeGradient)" name="Negative" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Rate Trends */}
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Response Rate Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Response Rate"]}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#0066FF"
                  strokeWidth={3}
                  dot={{ fill: "#0066FF", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#0066FF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Comparison */}
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Department Health Scores</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Health Score"]}
                />
                <Bar dataKey="score" fill="#0066FF" radius={[0, 6, 6, 0]} background={{ fill: "#f1f5f9", radius: [0, 6, 6, 0] }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Theme Analysis */}
        <div className="chart-card glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Theme Distribution</h3>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={themeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {themeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value, name) => [`${value} mentions`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 ml-4">
              {themeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
