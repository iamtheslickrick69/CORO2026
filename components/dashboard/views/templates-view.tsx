"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Plus,
  Search,
  FileText,
  MessageSquare,
  GitBranch,
  Star,
  MoreHorizontal,
  Copy,
  Edit3,
  Trash2,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

const templates = [
  {
    id: 1,
    name: "Quarterly Pulse",
    description: "Standard quarterly engagement check-in with sentiment analysis",
    category: "Engagement",
    messages: 5,
    branches: 3,
    usedCount: 24,
    isDefault: true,
    isStarred: true,
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
    isStarred: false,
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
    isStarred: false,
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
    isStarred: true,
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
    isStarred: false,
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
    isStarred: false,
  },
]

const categories = ["All", "Engagement", "Onboarding", "Crisis", "Leadership", "Offboarding", "Custom"]

const categoryColors: Record<string, string> = {
  Engagement: "bg-blue-100 text-blue-700",
  Onboarding: "bg-emerald-100 text-emerald-700",
  Crisis: "bg-red-100 text-red-700",
  Leadership: "bg-purple-100 text-purple-700",
  Offboarding: "bg-amber-100 text-amber-700",
  Custom: "bg-gray-100 text-gray-700",
}

export function TemplatesView() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === "All" || template.category === activeCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".template-card",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [activeCategory, searchQuery])

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500 mt-1">Pre-built conversation flows for common scenarios</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:shadow-lg hover:shadow-blue-500/25 transition-all">
          <Plus className="w-4 h-4" />
          Create Template
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/25"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="template-card group bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                template.isDefault
                  ? "bg-gradient-to-br from-[#0066FF] to-[#0052CC]"
                  : "bg-gray-100"
              }`}>
                <FileText className={`w-5 h-5 ${template.isDefault ? "text-white" : "text-gray-500"}`} />
              </div>
              <div className="flex items-center gap-1">
                {template.isDefault && (
                  <span className="text-xs px-2 py-1 bg-blue-50 text-[#0066FF] rounded-full font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Default
                  </span>
                )}
                <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-50 rounded-lg transition-all">
                  <Star className={`w-4 h-4 ${template.isStarred ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-4">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[template.category]}`}>
                {template.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {template.messages} msgs
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {template.branches} branches
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Used {template.usedCount} times</span>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
