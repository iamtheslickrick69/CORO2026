"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { ChevronRight, LayoutDashboard } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { OverviewView } from "@/components/dashboard/views/overview-view"
import { CampaignsView } from "@/components/dashboard/views/campaigns-view"
import { AnalyticsView } from "@/components/dashboard/views/analytics-view"
import { TemplatesView } from "@/components/dashboard/views/templates-view"
import { TeamsView } from "@/components/dashboard/views/teams-view"
import { CampaignModal } from "@/components/dashboard/campaign-modal"
import { NotificationBell } from "@/components/dashboard/notification-bell"
import { Toast } from "@/components/dashboard/toast"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const mainRef = useRef<HTMLDivElement>(null)

  // Animate view transitions
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      )
    }
  }, [activeTab])

  const handleLaunchCampaign = () => setShowCampaignModal(true)

  const handleCampaignSuccess = () => {
    setToastMessage("Campaign launched successfully!")
    setShowToast(true)
  }

  const handleCloseToast = useCallback(() => {
    setShowToast(false)
  }, [])

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      overview: "Overview",
      campaigns: "Campaigns",
      analytics: "Analytics",
      templates: "Templates",
      teams: "Teams"
    }
    return titles[activeTab] || "Overview"
  }

  const renderView = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewView onLaunchCampaign={handleLaunchCampaign} />
      case "campaigns":
        return <CampaignsView />
      case "analytics":
        return <AnalyticsView />
      case "templates":
        return <TemplatesView />
      case "teams":
        return <TeamsView />
      default:
        return <OverviewView onLaunchCampaign={handleLaunchCampaign} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Top Right Notification Bell */}
      <div className="fixed top-4 right-4 lg:top-6 lg:right-8 z-30">
        <NotificationBell />
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 pt-16 lg:pt-8 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <LayoutDashboard className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">Dashboard</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="font-medium text-gray-900">{getPageTitle()}</span>
          </div>

          <div ref={mainRef}>
            {renderView()}
          </div>
        </div>
      </main>

      {/* Campaign Modal */}
      <CampaignModal
        isOpen={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        onSuccess={handleCampaignSuccess}
      />

      {/* Success Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </div>
  )
}
