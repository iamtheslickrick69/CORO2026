"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { HeroCard } from "../hero-card"
import { CampaignCard } from "../campaign-card"
import { AlertsList } from "../alerts-list"
import { StatsRow } from "../stats-row"
import { TeamsHealth } from "../teams-health"
import { ChevronRight, Send, FileText, Download } from "lucide-react"

const recentCampaigns = [
  {
    name: "Q4 Engagement Check-in",
    description: "Quarterly pulse survey to measure employee engagement and satisfaction",
    status: "active" as const,
    responseRate: 89,
    type: "recurring" as const,
    isStarred: true,
  },
  {
    name: "New Hire 30-Day Check-in",
    description: "Onboarding feedback collection for new team members",
    status: "active" as const,
    responseRate: 94,
    type: "recurring" as const,
  },
  {
    name: "Post-Layoff Sentiment",
    description: "Sensitive conversation flow for recent organizational changes",
    status: "scheduled" as const,
    type: "one-time" as const,
  },
]

interface OverviewViewProps {
  onLaunchCampaign: () => void
}

export function OverviewView({ onLaunchCampaign }: OverviewViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dashboard-section",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="dashboard-section">
        <HeroCard
          userName="Nick"
          healthScore={78}
          healthChange={4}
          onLaunchCampaign={onLaunchCampaign}
        />
      </div>

      {/* Stats Row */}
      <div className="dashboard-section">
        <StatsRow />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Campaigns */}
          <div className="dashboard-section">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
              <button className="text-sm text-[#0066FF] hover:text-[#0052CC] font-medium inline-flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentCampaigns.map((campaign, index) => (
                <CampaignCard key={index} {...campaign} />
              ))}
            </div>
          </div>

          {/* Team Health */}
          <div className="dashboard-section">
            <TeamsHealth />
          </div>
        </div>

        {/* Right Column - Alerts */}
        <div className="space-y-6">
          <div className="dashboard-section">
            <AlertsList />
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={onLaunchCampaign}
                className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                <Send className="w-5 h-5" />
                <span>Launch New Campaign</span>
              </button>
              <button className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all">
                <FileText className="w-5 h-5 text-gray-400" />
                <span>Create Template</span>
              </button>
              <button className="w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all">
                <Download className="w-5 h-5 text-gray-400" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
