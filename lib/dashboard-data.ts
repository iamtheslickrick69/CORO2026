import { FileText, Clock, CheckCircle2, XCircle, Calendar, Play, Pause, AlertTriangle, TrendingDown, MessageSquare } from "lucide-react"

// Campaign status options
export const campaignStatuses = {
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
export const mockCampaigns = [
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
export const mockTemplates = [
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
export const recentAlerts = [
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

export const topThemes = [
  { theme: "Work-life balance", count: 47, trend: "up", change: "+12%" },
  { theme: "Manager communication", count: 38, trend: "down", change: "-5%" },
  { theme: "Career growth", count: 31, trend: "up", change: "+8%" },
  { theme: "Compensation", count: 24, trend: "neutral", change: "0%" },
]

export const teamHealth = [
  { team: "Engineering", score: 82, change: "+3", conversations: 156 },
  { team: "Sales", score: 68, change: "-7", conversations: 89 },
  { team: "Operations", score: 91, change: "+5", conversations: 124 },
  { team: "Customer Success", score: 76, change: "+1", conversations: 67 },
]

// Analytics data
export const sentimentData = [
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

export const responseRateData = [
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

export const departmentData = [
  { name: "Engineering", score: 82, conversations: 156 },
  { name: "Sales", score: 68, conversations: 89 },
  { name: "Operations", score: 91, conversations: 124 },
  { name: "Customer Success", score: 76, conversations: 67 },
  { name: "Marketing", score: 85, conversations: 45 },
  { name: "HR", score: 88, conversations: 32 },
]

export const themeData = [
  { name: "Work-life balance", value: 47, color: "#0066FF" },
  { name: "Manager communication", value: 38, color: "#3b82f6" },
  { name: "Career growth", value: 31, color: "#8b5cf6" },
  { name: "Compensation", value: 24, color: "#f59e0b" },
  { name: "Team collaboration", value: 19, color: "#10b981" },
]
