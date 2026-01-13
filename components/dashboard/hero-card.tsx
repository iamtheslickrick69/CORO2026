"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroCardProps {
  userName: string
  healthScore: number
  healthChange: number
  onLaunchCampaign?: () => void
}

export function HeroCard({ userName, healthScore, healthChange, onLaunchCampaign }: HeroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )

      // Score counter animation
      gsap.fromTo(
        scoreRef.current,
        { innerText: 0 },
        {
          innerText: healthScore,
          duration: 1.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          delay: 0.3
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [healthScore])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0066FF] via-[#0052CC] to-[#003D99] p-8 shadow-xl shadow-blue-500/20"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-white/90">Live Dashboard</span>
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Welcome back, {userName}
            </h1>
            <p className="mt-2 text-blue-100/80">
              Your culture health is strong. Here's the latest.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button className="bg-white text-[#0066FF] hover:bg-blue-50 shadow-lg">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                View Reports
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
            <Button
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10"
              onClick={onLaunchCampaign}
            >
              Launch Campaign
            </Button>
          </div>
        </div>

        {/* Right - Score Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[200px]">
          <p className="text-sm text-blue-100/80 mb-2">Culture Health Score</p>
          <div className="flex items-end gap-2">
            <span ref={scoreRef} className="text-5xl font-bold text-white">0</span>
            <span className="text-2xl text-white/60 mb-1">/100</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">+{healthChange}</span>
            <span className="text-xs text-blue-100/60">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  )
}
