"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Download, Calendar, TrendingUp, TrendingDown, Users, MessageSquare, Target, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
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

const sentimentData = [
  { month: "Jan", positive: 65, neutral: 25, negative: 10 },
  { month: "Feb", positive: 68, neutral: 22, negative: 10 },
  { month: "Mar", positive: 72, neutral: 20, negative: 8 },
  { month: "Apr", positive: 70, neutral: 21, negative: 9 },
  { month: "May", positive: 75, neutral: 18, negative: 7 },
  { month: "Jun", positive: 78, neutral: 16, negative: 6 },
  { month: "Jul", positive: 76, neutral: 17, negative: 7 },
  { month: "Aug", positive: 80, neutral: 14, negative: 6 },
  { month: "Sep", positive: 82, neutral: 13, negative: 5 },
  { month: "Oct", positive: 79, neutral: 15, negative: 6 },
  { month: "Nov", positive: 84, neutral: 11, negative: 5 },
]

const responseData = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 82 },
  { month: "Mar", rate: 85 },
  { month: "Apr", rate: 83 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 91 },
  { month: "Jul", rate: 89 },
  { month: "Aug", rate: 92 },
  { month: "Sep", rate: 94 },
  { month: "Oct", rate: 93 },
  { month: "Nov", rate: 94 },
]

const departmentData = [
  { name: "Engineering", score: 82 },
  { name: "Sales", score: 68 },
  { name: "Operations", score: 91 },
  { name: "Customer Success", score: 76 },
  { name: "Marketing", score: 85 },
  { name: "HR", score: 88 },
]

const themeData = [
  { name: "Work-life balance", value: 47, color: "#0066FF" },
  { name: "Manager communication", value: 38, color: "#3b82f6" },
  { name: "Career growth", value: 31, color: "#8b5cf6" },
  { name: "Compensation", value: 24, color: "#f59e0b" },
  { name: "Team collaboration", value: 19, color: "#10b981" },
]

const stats = [
  { label: "Avg. Sentiment", value: "8.2", suffix: "/10", change: "+0.4", positive: true, icon: TrendingUp },
  { label: "Total Conversations", value: "4,892", change: "+312", positive: true, icon: MessageSquare },
  { label: "Issues Resolved", value: "847", change: "94%", positive: true, icon: Target },
  { label: "Risk Alerts", value: "12", change: "+3", positive: false, icon: AlertTriangle },
]

export function AnalyticsView() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".analytics-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Deep insights into employee sentiment and engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-gray-200">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Last 12 months</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="analytics-card bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                stat.positive ? "bg-emerald-50" : "bg-red-50"
              }`}>
                <stat.icon className={`w-5 h-5 ${stat.positive ? "text-emerald-600" : "text-red-600"}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                {stat.suffix && <span className="text-lg text-gray-400">{stat.suffix}</span>}
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sentiment Over Time */}
        <div className="analytics-card bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Sentiment Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData}>
                <defs>
                  <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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
                <Area type="monotone" dataKey="positive" stroke="#0066FF" strokeWidth={2} fill="url(#positiveGradient)" name="Positive %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Rate */}
        <div className="analytics-card bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Response Rate</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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

        {/* Department Health */}
        <div className="analytics-card bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Department Health Scores</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Health Score"]}
                />
                <Bar dataKey="score" fill="#0066FF" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Theme Distribution */}
        <div className="analytics-card bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Conversation Themes</h3>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={themeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
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
            <div className="space-y-3">
              {themeData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
