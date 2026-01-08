"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Bell,
  Search,
  Calendar,
  ChevronDown,
  Plus,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  FileText,
  Users,
  Zap,
  MoreHorizontal,
  Edit3,
  Copy,
  Trash2,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Shield,
  Settings,
  GitBranch,
  Sparkles,
  RefreshCw,
  Download,
  ChevronRight,
  X,
  GripVertical,
  ArrowRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Gift,
  Filter,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  Globe,
  Key,
  UserPlus,
} from "lucide-react"
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

// Tab definitions - Consolidated to 3 main sections
const tabs = [
  { id: "home", label: "Home", icon: BarChart3 },
  { id: "campaigns", label: "Campaigns", icon: Send },
  { id: "insights", label: "Insights", icon: TrendingUp },
]

// Sub-navigation for Campaigns
const campaignSubTabs = [
  { id: "campaigns-list", label: "All Campaigns", icon: Send },
  { id: "templates", label: "Templates", icon: FileText },
]

// Sub-navigation for Insights
const insightSubTabs = [
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "customer-feedback", label: "Customer Feedback", icon: Star },
]

// Campaign status options
const campaignStatuses = {
  draft: { label: "Draft", color: "bg-blue-50 text-gray-600", icon: FileText },
  pending: { label: "Pending Approval", color: "bg-amber-100 text-amber-700", icon: Clock },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700", icon: Calendar },
  active: { label: "Active", color: "bg-emerald-100 text-emerald-700", icon: Play },
  paused: { label: "Paused", color: "bg-blue-50 text-gray-600", icon: Pause },
  completed: { label: "Completed", color: "bg-blue-50 text-gray-600", icon: CheckCircle2 },
}

// Mock campaigns data
const mockCampaigns = [
  {
    id: 1,
    name: "Q4 Engagement Check-in",
    type: "recurring",
    status: "active",
    audience: "All Employees",
    audienceCount: 1247,
    responseRate: 89,
    sentDate: "Oct 15, 2024",
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
    sentDate: "Ongoing",
    nextSend: "Triggered",
    template: "Onboarding Check-in",
  },
  {
    id: 3,
    name: "Post-Layoff Sentiment",
    type: "one-time",
    status: "pending",
    audience: "Engineering",
    audienceCount: 156,
    responseRate: null,
    sentDate: null,
    nextSend: "Awaiting Approval",
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
    sentDate: null,
    nextSend: "Nov 20, 2024",
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
    sentDate: "Oct 1, 2024",
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
    sentDate: null,
    nextSend: null,
    template: "Custom",
  },
]

// Mock templates data
const mockTemplates = [
  {
    id: 1,
    name: "Quarterly Pulse",
    description: "Standard quarterly engagement check-in with sentiment analysis",
    category: "Engagement",
    messages: 5,
    branches: 3,
    usedCount: 24,
    isDefault: true,
  },
  {
    id: 2,
    name: "Onboarding Check-in",
    description: "30/60/90 day check-ins for new employees",
    category: "Onboarding",
    messages: 8,
    branches: 4,
    usedCount: 156,
    isDefault: true,
  },
  {
    id: 3,
    name: "Crisis Response",
    description: "Sensitive conversation flow for difficult company events",
    category: "Crisis",
    messages: 6,
    branches: 5,
    usedCount: 3,
    isDefault: true,
  },
  {
    id: 4,
    name: "Leadership 360",
    description: "Manager effectiveness and leadership feedback",
    category: "Leadership",
    messages: 7,
    branches: 4,
    usedCount: 12,
    isDefault: true,
  },
  {
    id: 5,
    name: "Exit Interview",
    description: "Departure feedback collection with follow-up branches",
    category: "Offboarding",
    messages: 9,
    branches: 6,
    usedCount: 45,
    isDefault: true,
  },
  {
    id: 6,
    name: "Custom Warehouse Survey",
    description: "Custom template for warehouse safety concerns",
    category: "Custom",
    messages: 4,
    branches: 2,
    usedCount: 8,
    isDefault: false,
  },
]

// Mock overview data
const recentAlerts = [
  {
    id: 1,
    type: "high",
    title: "Retention Risk Detected",
    team: "Engineering",
    time: "2 hours ago",
    icon: AlertTriangle,
  },
  { id: 2, type: "medium", title: "Sentiment Decline", team: "Sales", time: "4 hours ago", icon: TrendingDown },
  { id: 3, type: "low", title: "New Theme Emerging", team: "Operations", time: "6 hours ago", icon: MessageSquare },
]

const topThemes = [
  { theme: "Work-life balance", count: 47, trend: "up", change: "+12%" },
  { theme: "Manager communication", count: 38, trend: "down", change: "-5%" },
  { theme: "Career growth", count: 31, trend: "up", change: "+8%" },
  { theme: "Compensation", count: 24, trend: "neutral", change: "0%" },
]

const teamHealth = [
  { team: "Engineering", score: 82, change: "+3", conversations: 156 },
  { team: "Sales", score: 68, change: "-7", conversations: 89 },
  { team: "Operations", score: 91, change: "+5", conversations: 124 },
  { team: "Customer Success", score: 76, change: "+1", conversations: 67 },
]

const mockCustomerFeedback = [
  {
    id: 1,
    sentiment: "positive",
    message:
      "Amazing service! Sarah at the downtown location went above and beyond to help me find exactly what I needed.",
    phone: "***-***-4521",
    location: "Downtown Store",
    time: "2 hours ago",
    googleReview: true,
    rewardSent: true,
    rewardType: "15% discount code",
  },
  {
    id: 2,
    sentiment: "negative",
    message: "Waited 45 minutes for help. Staff seemed overwhelmed and disorganized. Very disappointed.",
    phone: "***-***-8734",
    location: "Mall Location",
    time: "4 hours ago",
    googleReview: false,
    resolved: false,
    escalated: true,
  },
  {
    id: 3,
    sentiment: "positive",
    message: "Quick checkout, friendly staff, great prices. Will definitely be back!",
    phone: "***-***-2198",
    location: "Northside Branch",
    time: "5 hours ago",
    googleReview: true,
    rewardSent: true,
    rewardType: "Free coffee voucher",
  },
  {
    id: 4,
    sentiment: "neutral",
    message: "Product was fine but took longer to arrive than expected. Communication could be better.",
    phone: "***-***-6543",
    location: "Online",
    time: "6 hours ago",
    googleReview: false,
    resolved: true,
  },
  {
    id: 5,
    sentiment: "negative",
    message: "Return policy is confusing. Had to call three times to get a straight answer.",
    phone: "***-***-9012",
    location: "Customer Service",
    time: "Yesterday",
    googleReview: false,
    resolved: true,
    escalated: false,
  },
  {
    id: 6,
    sentiment: "positive",
    message: "Best experience I've had in retail in years. The personal shopping service is incredible!",
    phone: "***-***-3456",
    location: "Flagship Store",
    time: "Yesterday",
    googleReview: true,
    rewardSent: true,
    rewardType: "VIP membership upgrade",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home")
  const [campaignSubTab, setCampaignSubTab] = useState("campaigns-list")
  const [insightSubTab, setInsightSubTab] = useState("analytics")
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false)
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<(typeof mockTemplates)[0] | null>(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-white flex flex-col">
      <header className="sticky top-0 z-50 px-4 py-3">
        <div className="max-w-[1600px] mx-auto">
          <div className="glass-header backdrop-blur-xl border border-blue-100/50 rounded-2xl shadow-lg shadow-blue-500/10 px-4">
            <div className="h-16 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative h-10 w-36 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(0,102,255,0.4)]">
                  <Image
                    src="/logo-standard.png"
                    alt="CORO"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <nav className="hidden lg:flex items-center bg-blue-50/50 rounded-xl p-1 relative">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all z-10 ${
                      activeTab === tab.id ? "text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-lg shadow-lg shadow-blue-500/30" />
                    )}
                    <tab.icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="hidden xl:flex items-center gap-2 bg-blue-50/50 rounded-xl px-3 py-2 group focus-within:ring-2 focus-within:ring-[#0066FF]/20 transition-all">
                  <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#0066FF]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none w-40"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white rounded border border-blue-100">
                    ⌘K
                  </kbd>
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/50 transition-colors group">
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#0066FF]" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#0066FF] rounded-full ring-2 ring-white" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center shadow-sm">
                      <span className="text-sm font-semibold text-white">JD</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-blue-100 overflow-hidden z-50">
                      <div className="p-4 border-b border-blue-50">
                        <p className="font-semibold text-gray-800">John Doe</p>
                        <p className="text-sm text-gray-500">john@company.com</p>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                          <User className="w-4 h-4" />
                          Profile Settings
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                          <CreditCard className="w-4 h-4" />
                          Billing
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                          <HelpCircle className="w-4 h-4" />
                          Help & Support
                        </button>
                      </div>
                      <div className="p-2 border-t border-blue-50">
                        <button
                          onClick={() => {
                            setActiveTab("settings")
                            setShowProfileMenu(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>
                      <div className="p-2 border-t border-blue-50">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Tabs - Updated to slate colors */}
            <div className="lg:hidden flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-4">
          {/* Sub-navigation for Campaigns */}
          {activeTab === "campaigns" && (
            <div className="flex items-center gap-2 bg-blue-50/50 rounded-xl p-1 w-fit">
              {campaignSubTabs.map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setCampaignSubTab(subTab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    campaignSubTab === subTab.id
                      ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <subTab.icon className="w-4 h-4" />
                  {subTab.label}
                </button>
              ))}
            </div>
          )}

          {/* Sub-navigation for Insights */}
          {activeTab === "insights" && (
            <div className="flex items-center gap-2 bg-blue-50/50 rounded-xl p-1 w-fit">
              {insightSubTabs.map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setInsightSubTab(subTab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    insightSubTab === subTab.id
                      ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <subTab.icon className="w-4 h-4" />
                  {subTab.label}
                </button>
              ))}
            </div>
          )}

          {/* Tab Content */}
          <div>
            {activeTab === "home" && <OverviewTab />}
            {activeTab === "campaigns" && campaignSubTab === "campaigns-list" && (
              <CampaignsTab onCreateCampaign={() => setShowCampaignBuilder(true)} />
            )}
            {activeTab === "campaigns" && campaignSubTab === "templates" && (
              <TemplatesTab
                onCreateTemplate={() => {
                  setEditingTemplate(null)
                  setShowTemplateBuilder(true)
                }}
                onEditTemplate={(template) => {
                  setEditingTemplate(template)
                  setShowTemplateBuilder(true)
                }}
              />
            )}
            {activeTab === "insights" && insightSubTab === "analytics" && <AnalyticsTab />}
            {activeTab === "insights" && insightSubTab === "customer-feedback" && <CustomerFeedbackTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </main>

      {/* Campaign Builder Modal */}
      {showCampaignBuilder && <CampaignBuilder onClose={() => setShowCampaignBuilder(false)} />}

      {/* Template Builder Modal */}
      {showTemplateBuilder && (
        <TemplateBuilder
          template={editingTemplate}
          onClose={() => {
            setShowTemplateBuilder(false)
            setEditingTemplate(null)
          }}
        />
      )}

      {/* Click outside to close profile menu */}
      {showProfileMenu && <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />}
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
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

      {/* Top Stats - Enhanced with gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Culture Health Score"
          value="78"
          suffix="/100"
          change="+4"
          changeType="positive"
          icon={BarChart3}
          gradient="from-[#0066FF] to-[#0052CC]"
        />
        <StatCard
          title="Active Conversations"
          value="312"
          change="+28"
          changeType="positive"
          icon={MessageSquare}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Response Rate"
          value="94"
          suffix="%"
          change="+2%"
          changeType="positive"
          icon={Users}
          gradient="from-emerald-500 to-green-600"
        />
        <StatCard
          title="Open Alerts"
          value="7"
          change="-3"
          changeType="negative"
          icon={AlertTriangle}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Alerts - Enhanced */}
          <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
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

          {/* Team Health - Enhanced */}
          <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
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
          <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
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
          <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
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

// Campaigns Tab Component
function CampaignsTab({ onCreateCampaign }: { onCreateCampaign: () => void }) {
  const [filter, setFilter] = useState("all")

  const filteredCampaigns = filter === "all" ? mockCampaigns : mockCampaigns.filter((c) => c.status === filter)

  return (
    <div className="space-y-6">
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
                    className="border-b border-blue-50 last:border-0 hover:bg-blue-50 transition-colors"
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

// Templates Tab Component
function TemplatesTab({
  onCreateTemplate,
  onEditTemplate,
}: {
  onCreateTemplate: () => void
  onEditTemplate: (template: (typeof mockTemplates)[0]) => void
}) {
  const [filter, setFilter] = useState("all")

  const categories = ["all", "Engagement", "Onboarding", "Crisis", "Leadership", "Offboarding", "Custom"]
  const filteredTemplates = filter === "all" ? mockTemplates : mockTemplates.filter((t) => t.category === filter)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Templates</h1>
          <p className="text-gray-500 mt-1">Manage conversation templates with branching logic</p>
        </div>
        <Button onClick={onCreateTemplate} className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Create Template
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === category
                ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/25"
                : "bg-blue-50 text-gray-600 hover:text-gray-800"
            }`}
          >
            {category === "all" ? "All Templates" : category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="glass-card rounded-2xl border border-blue-100/50 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  template.isDefault ? "bg-blue-100" : "bg-blue-100"
                }`}
              >
                {template.isDefault ? (
                  <FileText className="w-5 h-5 text-[#0066FF]" />
                ) : (
                  <Sparkles className="w-5 h-5 text-[#0066FF]" />
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800"
                  onClick={() => onEditTemplate(template)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                {!template.isDefault && (
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-1">{template.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{template.description}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {template.messages} messages
              </span>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                {template.branches} branches
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-2.5 py-1 rounded-full ${
                  template.isDefault ? "bg-slate-200 text-gray-600" : "bg-blue-100 text-[#0052CC]"
                }`}
              >
                {template.isDefault ? "Default" : "Custom"}
              </span>
              <span className="text-xs text-gray-500">Used {template.usedCount} times</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomerFeedbackTab() {
  const [filter, setFilter] = useState("all")
  const [showRewardModal, setShowRewardModal] = useState(false)

  const filteredFeedback =
    filter === "all" ? mockCustomerFeedback : mockCustomerFeedback.filter((f) => f.sentiment === filter)

  const stats = {
    total: mockCustomerFeedback.length,
    positive: mockCustomerFeedback.filter((f) => f.sentiment === "positive").length,
    negative: mockCustomerFeedback.filter((f) => f.sentiment === "negative").length,
    googleReviews: mockCustomerFeedback.filter((f) => f.googleReview).length,
    rewardsSent: mockCustomerFeedback.filter((f) => f.rewardSent).length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Feedback</h1>
          <p className="text-gray-500 mt-1">Monitor customer sentiment and manage reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white border-blue-100 text-gray-600 hover:bg-blue-50">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20" onClick={() => setShowRewardModal(true)}>
            <Gift className="w-4 h-4" />
            Manage Rewards
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total Feedback</span>
            <MessageSquare className="w-5 h-5 text-[#0066FF]" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-xs text-emerald-600 mt-1">+12 this week</p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Positive</span>
            <ThumbsUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.positive}</p>
          <p className="text-xs text-green-500 mt-1">{Math.round((stats.positive / stats.total) * 100)}% rate</p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Needs Attention</span>
            <ThumbsDown className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.negative}</p>
          <p className="text-xs text-red-500 mt-1">{stats.negative > 0 ? "Action required" : "All clear"}</p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Google Reviews</span>
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.googleReviews}</p>
          <p className="text-xs text-amber-500 mt-1">Generated this month</p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Rewards Sent</span>
            <Gift className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.rewardsSent}</p>
          <p className="text-xs text-purple-500 mt-1">Thank you rewards</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "positive", "neutral", "negative"].map((sentiment) => (
          <button
            key={sentiment}
            onClick={() => setFilter(sentiment)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === sentiment
                ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/25"
                : "bg-blue-50 text-gray-600 hover:text-gray-800"
            }`}
          >
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </button>
        ))}
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white border-blue-100 text-gray-600 hover:bg-blue-50"
        >
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className={`bg-white rounded-2xl border p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20 ${
              feedback.sentiment === "negative" && !feedback.resolved
                ? "border-red-200 bg-red-50/50"
                : "border-blue-100"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Sentiment Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  feedback.sentiment === "positive"
                    ? "bg-green-100"
                    : feedback.sentiment === "negative"
                      ? "bg-red-100"
                      : "bg-amber-100"
                }`}
              >
                {feedback.sentiment === "positive" ? (
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                ) : feedback.sentiment === "negative" ? (
                  <ThumbsDown className="w-6 h-6 text-red-600" />
                ) : (
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-800">{feedback.phone}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{feedback.location}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{feedback.time}</span>

                  {feedback.escalated && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
                      Escalated
                    </span>
                  )}
                  {feedback.resolved && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      Resolved
                    </span>
                  )}
                </div>

                <p className="text-gray-800 mb-4">{feedback.message}</p>

                {/* Actions/Status Row */}
                <div className="flex items-center gap-3 flex-wrap">
                  {feedback.googleReview && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      Posted Google Review
                    </div>
                  )}
                  {feedback.rewardSent && (
                    <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                      <Gift className="w-3.5 h-3.5" />
                      {feedback.rewardType}
                    </div>
                  )}

                  {feedback.sentiment === "negative" && !feedback.resolved && (
                    <Button size="sm" variant="destructive" className="ml-auto">
                      Respond & Resolve
                    </Button>
                  )}
                  {feedback.sentiment === "positive" && !feedback.googleReview && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-auto gap-1.5 bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Request Review
                    </Button>
                  )}
                  {feedback.sentiment === "positive" && feedback.googleReview && !feedback.rewardSent && (
                    <Button size="sm" className="ml-auto gap-1.5">
                      <Gift className="w-3.5 h-3.5" />
                      Send Reward
                    </Button>
                  )}
                </div>
              </div>

              {/* Actions Menu */}
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800 shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Reward Settings Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl border border-blue-100/50 w-full max-w-lg overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-blue-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Reward Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Configure rewards for positive reviews</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRewardModal(false)}
                className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Reward Type</label>
                <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                  <option>Discount Code (% off)</option>
                  <option>Fixed Amount Discount</option>
                  <option>Free Item/Service</option>
                  <option>Loyalty Points</option>
                  <option>VIP Upgrade</option>
                  <option>Custom Reward</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Amount</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    defaultValue="15"
                    className="flex-1 px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                  />
                  <span className="text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thank You Message</label>
                <textarea
                  rows={3}
                  defaultValue="Thank you for sharing your experience! Here's a special thank you from us. 🎁"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                <div>
                  <p className="font-medium text-gray-800">Auto-send Rewards</p>
                  <p className="text-sm text-gray-500">Automatically reward after Google review is posted</p>
                </div>
                <button className="w-12 h-7 rounded-full bg-[#0066FF] transition-colors">
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm transform translate-x-6" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-blue-100">
              <Button variant="ghost" onClick={() => setShowRewardModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowRewardModal(false)}>Save Settings</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Campaign Builder Modal
function CampaignBuilder({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [campaignType, setCampaignType] = useState<"one-time" | "recurring">("one-time")
  const [requiresApproval, setRequiresApproval] = useState(true)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl border border-blue-100/50 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Create Campaign</h2>
            <p className="text-sm text-gray-500 mt-1">Step {step} of 4</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-[#0066FF]" : "bg-slate-200"}`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Details</span>
            <span>Audience</span>
            <span>Template</span>
            <span>Review</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Q4 Engagement Check-in"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCampaignType("one-time")}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      campaignType === "one-time"
                        ? "border-[#0066FF] bg-teal-50"
                        : "border-blue-100 hover:border-blue-300"
                    }`}
                  >
                    <Zap
                      className={`w-6 h-6 mb-2 ${campaignType === "one-time" ? "text-[#0066FF]" : "text-gray-500"}`}
                    />
                    <p className="font-medium text-gray-800">One-time</p>
                    <p className="text-sm text-gray-500 mt-1">Send once to selected audience</p>
                  </button>
                  <button
                    onClick={() => setCampaignType("recurring")}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      campaignType === "recurring"
                        ? "border-[#0066FF] bg-teal-50"
                        : "border-blue-100 hover:border-blue-300"
                    }`}
                  >
                    <RefreshCw
                      className={`w-6 h-6 mb-2 ${campaignType === "recurring" ? "text-[#0066FF]" : "text-gray-500"}`}
                    />
                    <p className="font-medium text-gray-800">Recurring</p>
                    <p className="text-sm text-gray-500 mt-1">Automatically repeat on schedule</p>
                  </button>
                </div>
              </div>

              {campaignType === "recurring" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#0066FF]" />
                  <div>
                    <p className="font-medium text-gray-800">Require Approval</p>
                    <p className="text-sm text-gray-500">Campaign must be approved before sending</p>
                  </div>
                </div>
                <button
                  onClick={() => setRequiresApproval(!requiresApproval)}
                  className={`w-12 h-7 rounded-full transition-colors ${requiresApproval ? "bg-[#0066FF]" : "bg-slate-300"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      requiresApproval ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                  <option>All Employees</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Operations</option>
                  <option>Customer Success</option>
                  <option>New Hires (Last 90 days)</option>
                  <option>Remote Workers</option>
                  <option>Managers Only</option>
                  <option>Custom Segment...</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-800">Audience Preview</span>
                  <span className="text-sm text-gray-500">1,247 recipients</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Departments</span>
                    <span className="font-medium text-gray-800">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Locations</span>
                    <span className="font-medium text-gray-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Avg. Response Rate</span>
                    <span className="font-medium text-gray-800">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Last Contacted</span>
                    <span className="font-medium text-gray-800">14 days ago</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exclude (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., contractors, interns"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
                <div className="space-y-3">
                  {mockTemplates.slice(0, 4).map((template) => (
                    <label
                      key={template.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 hover:border-blue-300 cursor-pointer transition-all"
                    >
                      <input type="radio" name="template" className="w-4 h-4 text-[#0066FF]" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{template.name}</p>
                        <p className="text-sm text-gray-500">{template.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{template.messages} messages</span>
                          <span>{template.branches} branches</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
                        Preview
                      </Button>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-blue-50 space-y-4">
                <h3 className="font-semibold text-gray-800">Campaign Summary</h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-800">Q4 Engagement Check-in</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-800 capitalize">{campaignType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Audience</span>
                    <span className="font-medium text-gray-800">All Employees (1,247)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Template</span>
                    <span className="font-medium text-gray-800">Quarterly Pulse</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Requires Approval</span>
                    <span className="font-medium text-gray-800">{requiresApproval ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              {requiresApproval && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-700">Approval Required</p>
                    <p className="text-sm text-amber-600 mt-1">
                      This campaign will be sent to your manager for approval before being scheduled.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-blue-100">
          <Button variant="ghost" onClick={() => (step > 1 ? setStep(step - 1) : onClose())}>
            {step > 1 ? "Back" : "Cancel"}
          </Button>
          <Button onClick={() => (step < 4 ? setStep(step + 1) : onClose())} className="gap-2">
            {step < 4 ? (
              <>
                Continue <ArrowRight className="w-4 h-4" />
              </>
            ) : requiresApproval ? (
              <>
                Submit for Approval <Send className="w-4 h-4" />
              </>
            ) : (
              <>
                Schedule Campaign <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Template Builder Modal
function TemplateBuilder({
  template,
  onClose,
}: {
  template: (typeof mockTemplates)[0] | null
  onClose: () => void
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "greeting",
      content: "Hey {{first_name}}! This is Coro from {{company}}. Got a minute for a quick check-in?",
      branches: [],
    },
    {
      id: 2,
      type: "question",
      content: "On a scale of 1-10, how are you feeling about work lately?",
      branches: [
        { condition: "1-4", nextMessage: "I hear you. What's been the biggest challenge?" },
        { condition: "5-7", nextMessage: "Thanks for sharing. Anything specific on your mind?" },
        { condition: "8-10", nextMessage: "That's great to hear! What's been going well?" },
      ],
    },
    { id: 3, type: "followup", content: "Thanks for sharing that. Your feedback helps us improve.", branches: [] },
  ])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl border border-blue-100/50 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {template ? `Edit: ${template.name}` : "Create Template"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Design your conversation flow with branching logic</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] shadow-lg shadow-blue-500/25">
              <CheckCircle2 className="w-4 h-4" />
              Save Template
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left: Message List */}
          <div className="w-80 border-r border-blue-100 p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Messages</h3>
              <Button variant="ghost" size="sm" className="gap-1 text-[#0066FF] hover:text-[#0052CC]">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-xl border border-blue-100 bg-blue-50 hover:border-blue-300 cursor-pointer transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-[#0066FF]">#{index + 1}</span>
                        <span className="text-xs text-gray-500 capitalize">{msg.type}</span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2">{msg.content}</p>
                      {msg.branches.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-[#0066FF]">
                          <GitBranch className="w-3 h-3" />
                          {msg.branches.length} branches
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Editor */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  defaultValue={template?.name || ""}
                  placeholder="e.g., Weekly Check-in"
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  defaultValue={template?.description || ""}
                  placeholder="Brief description of this template's purpose"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                  <option>Engagement</option>
                  <option>Onboarding</option>
                  <option>Crisis</option>
                  <option>Leadership</option>
                  <option>Offboarding</option>
                  <option>Custom</option>
                </select>
              </div>

              <div className="pt-4 border-t border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-4">Message Editor</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                    <textarea
                      defaultValue={messages[0].content}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all resize-none font-mono text-sm"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-gray-500">Variables:</span>
                      {["{{first_name}}", "{{company}}", "{{department}}", "{{manager}}"].map((v) => (
                        <button
                          key={v}
                          className="text-xs px-2 py-1 rounded-md bg-blue-100 text-[#0052CC] hover:bg-teal-200 transition-colors"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Branching Logic</label>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs text-[#0066FF] hover:text-[#0052CC]">
                        <Plus className="w-3 h-3" />
                        Add Branch
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg border border-blue-100 bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-500">IF response is</span>
                          <input
                            type="text"
                            defaultValue="1-4"
                            className="w-20 px-2 py-1 text-xs rounded border border-blue-100 bg-white"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-[#0066FF]" />
                          <input
                            type="text"
                            defaultValue="I hear you. What's been the biggest challenge?"
                            className="flex-1 px-2 py-1 text-xs rounded border border-blue-100 bg-white"
                          />
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-blue-100 bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-500">IF response is</span>
                          <input
                            type="text"
                            defaultValue="5-7"
                            className="w-20 px-2 py-1 text-xs rounded border border-blue-100 bg-white"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-[#0066FF]" />
                          <input
                            type="text"
                            defaultValue="Thanks for sharing. Anything specific on your mind?"
                            className="flex-1 px-2 py-1 text-xs rounded border border-blue-100 bg-white"
                          />
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-blue-100 bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-500">IF response is</span>
                          <input
                            type="text"
                            defaultValue="8-10"
                            className="w-20 px-2 py-1 text-xs rounded border border-blue-100 bg-white"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-[#0066FF]" />
                          <input
                            type="text"
                            defaultValue="That's great to hear! What's been going well?"
                            className="flex-1 px-2 py-1 text-xs rounded border border-blue-100 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsTab() {
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
    { month: "Dec", positive: 86, neutral: 10, negative: 4 },
  ]

  const responseRateData = [
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
    { month: "Nov", rate: 95 },
    { month: "Dec", rate: 94 },
  ]

  const departmentData = [
    { name: "Engineering", score: 82, conversations: 156 },
    { name: "Sales", score: 68, conversations: 89 },
    { name: "Operations", score: 91, conversations: 124 },
    { name: "Customer Success", score: 76, conversations: 67 },
    { name: "Marketing", score: 85, conversations: 45 },
    { name: "HR", score: 88, conversations: 32 },
  ]

  const themeData = [
    { name: "Work-life balance", value: 47, color: "#14b8a6" },
    { name: "Manager communication", value: 38, color: "#3b82f6" },
    { name: "Career growth", value: 31, color: "#8b5cf6" },
    { name: "Compensation", value: 24, color: "#f59e0b" },
    { name: "Team collaboration", value: 19, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
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
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Avg. Sentiment Score</p>
          <p className="text-3xl font-bold text-gray-800">
            8.2<span className="text-lg text-gray-400">/10</span>
          </p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +0.4 from last month
          </p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Conversations</p>
          <p className="text-3xl font-bold text-gray-800">4,892</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +312 this month
          </p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Issues Resolved</p>
          <p className="text-3xl font-bold text-gray-800">847</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 94% resolution rate
          </p>
        </div>
        <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm">
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
        <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Sentiment Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData}>
                <defs>
                  <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
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
                <Area
                  type="monotone"
                  dataKey="positive"
                  stackId="1"
                  stroke="#14b8a6"
                  fill="url(#positiveGradient)"
                  name="Positive"
                />
                <Area
                  type="monotone"
                  dataKey="neutral"
                  stackId="1"
                  stroke="#94a3b8"
                  fill="url(#neutralGradient)"
                  name="Neutral"
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  stackId="1"
                  stroke="#ef4444"
                  fill="url(#negativeGradient)"
                  name="Negative"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Rate Trends */}
        <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Response Rate Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseRateData}>
                <defs>
                  <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Comparison */}
        <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Department Health Scores</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value, name) => [`${value}%`, "Health Score"]}
                />
                <Bar
                  dataKey="score"
                  fill="#14b8a6"
                  radius={[0, 6, 6, 0]}
                  background={{ fill: "#f1f5f9", radius: [0, 6, 6, 0] }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Theme Analysis */}
        <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Theme Distribution</h3>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={themeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
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

function SettingsTab() {
  const [activeSettingsTab, setActiveSettingsTab] = useState("general")

  const settingsTabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "team", label: "Team Members", icon: Users },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your CORO workspace configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64 shrink-0">
          <div className="glass-card rounded-2xl border border-blue-100/50 p-2 shadow-sm">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSettingsTab === tab.id
                    ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeSettingsTab === "general" && (
            <>
              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Company Information</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      defaultValue="Acme Corporation"
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Retail</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                      <option>1-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>501-1000 employees</option>
                      <option>1000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] transition-all">
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Coro Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Coro Number</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 text-gray-800 font-mono">
                        (555) 123-CORO
                      </div>
                      <Button
                        variant="outline"
                        className="gap-2 bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employee Enrollment Code</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 px-4 py-3 rounded-xl border border-blue-100 bg-blue-50 text-gray-800 font-mono">
                        ACME2024
                      </div>
                      <Button
                        variant="outline"
                        className="gap-2 bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Employees text this code to Coro to start their check-ins
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSettingsTab === "notifications" && (
            <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "High-priority alerts",
                    desc: "Immediate notifications for retention risks and critical issues",
                    enabled: true,
                  },
                  { title: "Daily digest", desc: "Summary of all activity from the past 24 hours", enabled: true },
                  {
                    title: "Weekly analytics report",
                    desc: "Comprehensive weekly insights delivered every Monday",
                    enabled: true,
                  },
                  {
                    title: "Campaign notifications",
                    desc: "Updates when campaigns are sent, completed, or need attention",
                    enabled: false,
                  },
                  {
                    title: "New feedback alerts",
                    desc: "Real-time notifications for incoming employee feedback",
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 rounded-xl bg-blue-50 hover:bg-blue-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      className={`w-12 h-7 rounded-full transition-colors ${item.enabled ? "bg-[#0066FF]" : "bg-slate-300"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${item.enabled ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSettingsTab === "team" && (
            <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">Team Members</h3>
                <Button className="gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] shadow-lg shadow-blue-500/25">
                  <UserPlus className="w-4 h-4" />
                  Invite Member
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "John Doe", email: "john@company.com", role: "Admin", avatar: "JD" },
                  { name: "Sarah Smith", email: "sarah@company.com", role: "Manager", avatar: "SS" },
                  { name: "Mike Johnson", email: "mike@company.com", role: "Viewer", avatar: "MJ" },
                ].map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">{member.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          member.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : member.role === "Manager"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-200 text-gray-600"
                        }`}
                      >
                        {member.role}
                      </span>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-500 hover:text-gray-800">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSettingsTab === "integrations" && (
            <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-6">Connected Integrations</h3>
              <div className="space-y-3">
                {[
                  { name: "Slack", desc: "Send alerts and summaries to Slack channels", connected: true, icon: "💬" },
                  {
                    name: "Microsoft Teams",
                    desc: "Integration with Teams for notifications",
                    connected: false,
                    icon: "👥",
                  },
                  { name: "Workday", desc: "Sync employee data from Workday", connected: true, icon: "📊" },
                  { name: "BambooHR", desc: "Import employee information automatically", connected: false, icon: "🎋" },
                  {
                    name: "Google Workspace",
                    desc: "Connect with Google Calendar and Gmail",
                    connected: false,
                    icon: "📧",
                  },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                        {integration.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{integration.name}</p>
                        <p className="text-sm text-gray-500">{integration.desc}</p>
                      </div>
                    </div>
                    <Button
                      variant={integration.connected ? "outline" : "default"}
                      className={
                        integration.connected
                          ? "bg-white border-blue-100 text-gray-700 hover:bg-blue-50"
                          : "bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] shadow-lg shadow-blue-500/25"
                      }
                    >
                      {integration.connected ? "Configure" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSettingsTab === "security" && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#0066FF]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-white border-blue-100 text-gray-700 hover:bg-blue-50">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Key className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">API Keys</p>
                        <p className="text-sm text-gray-500">Manage API keys for integrations</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-white border-blue-100 text-gray-700 hover:bg-blue-50">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">SSO Configuration</p>
                        <p className="text-sm text-gray-500">Set up Single Sign-On with your identity provider</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-white border-blue-100 text-gray-700 hover:bg-blue-50">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Data Privacy</h3>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-800">Your data is protected</p>
                      <p className="text-sm text-emerald-700 mt-1">
                        Coro acts as a third-party escrow. We never share or sell your data. Only employees can access
                        their own conversation history via their phone number.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSettingsTab === "billing" && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Current Plan</h3>
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Enterprise Plan</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Active</span>
                  </div>
                  <p className="text-3xl font-bold mb-2">
                    $2,499<span className="text-lg font-normal opacity-80">/month</span>
                  </p>
                  <p className="text-sm opacity-80">Unlimited employees, all features included</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Payment Method</h3>
                <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 rounded bg-slate-800 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" className="bg-white border-blue-100 text-gray-700 hover:bg-blue-50">
                    Update
                  </Button>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-blue-100/50 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-6">Billing History</h3>
                <div className="space-y-3">
                  {[
                    { date: "Dec 1, 2024", amount: "$2,499.00", status: "Paid" },
                    { date: "Nov 1, 2024", amount: "$2,499.00", status: "Paid" },
                    { date: "Oct 1, 2024", amount: "$2,499.00", status: "Paid" },
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-blue-50">
                      <div>
                        <p className="font-medium text-gray-800">{invoice.date}</p>
                        <p className="text-sm text-gray-500">{invoice.amount}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                          {invoice.status}
                        </span>
                        <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-gray-800">
                          <Download className="w-4 h-4" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  suffix,
  change,
  changeType,
  icon: Icon,
  gradient = "from-[#0066FF] to-[#0052CC]",
}: {
  title: string
  value: string
  suffix?: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ElementType
  gradient?: string
}) {
  return (
    <div className="glass-card rounded-2xl border border-blue-100/50 p-5 shadow-sm hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-200 transition-all group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{title}</span>
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {suffix && <span className="text-lg text-gray-400">{suffix}</span>}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
            changeType === "positive" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
        >
          {changeType === "positive" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
    </div>
  )
}
