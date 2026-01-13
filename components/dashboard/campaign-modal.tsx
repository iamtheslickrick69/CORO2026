"use client"

import { useState } from "react"
import { X, Send, Users, Calendar, FileText, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const templates = [
  { id: 1, name: "Quarterly Pulse", description: "Standard engagement check-in", category: "Engagement" },
  { id: 2, name: "Onboarding Check-in", description: "New hire feedback", category: "Onboarding" },
  { id: 3, name: "Crisis Response", description: "Sensitive conversations", category: "Crisis" },
  { id: 4, name: "Leadership 360", description: "Manager feedback", category: "Leadership" },
]

const audiences = [
  { id: 1, name: "All Employees", count: 1247 },
  { id: 2, name: "Engineering", count: 156 },
  { id: 3, name: "Sales", count: 89 },
  { id: 4, name: "New Hires (Last 90 days)", count: 34 },
  { id: 5, name: "Managers", count: 89 },
]

export function CampaignModal({ isOpen, onClose, onSuccess }: CampaignModalProps) {
  const [step, setStep] = useState(1)
  const [campaignName, setCampaignName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [selectedAudience, setSelectedAudience] = useState<number | null>(null)
  const [scheduleType, setScheduleType] = useState<"now" | "scheduled">("now")

  if (!isOpen) return null

  const handleCreate = () => {
    // Simulate creation
    setTimeout(() => {
      onClose()
      onSuccess?.()
      setStep(1)
      setCampaignName("")
      setSelectedTemplate(null)
      setSelectedAudience(null)
    }, 500)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Campaign</h2>
              <p className="text-sm text-gray-500 mt-1">Step {step} of 3</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      s <= step ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC]" : ""
                    }`}
                    style={{ width: s <= step ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {/* Step 1: Name & Template */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g., Q4 Engagement Check-in"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Template
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedTemplate === template.id
                            ? "border-[#0066FF] bg-blue-50"
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <FileText className={`w-5 h-5 ${
                            selectedTemplate === template.id ? "text-[#0066FF]" : "text-gray-400"
                          }`} />
                          {selectedTemplate === template.id && (
                            <Check className="w-4 h-4 text-[#0066FF]" />
                          )}
                        </div>
                        <p className="font-medium text-gray-900 mt-2">{template.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Audience */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Audience
                </label>
                <div className="space-y-2">
                  {audiences.map((audience) => (
                    <button
                      key={audience.id}
                      onClick={() => setSelectedAudience(audience.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                        selectedAudience === audience.id
                          ? "border-[#0066FF] bg-blue-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Users className={`w-5 h-5 ${
                          selectedAudience === audience.id ? "text-[#0066FF]" : "text-gray-400"
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{audience.name}</p>
                          <p className="text-xs text-gray-500">{audience.count} employees</p>
                        </div>
                      </div>
                      {selectedAudience === audience.id && (
                        <Check className="w-5 h-5 text-[#0066FF]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  When to Send
                </label>
                <div className="space-y-3">
                  <button
                    onClick={() => setScheduleType("now")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      scheduleType === "now"
                        ? "border-[#0066FF] bg-blue-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Send className={`w-5 h-5 ${
                        scheduleType === "now" ? "text-[#0066FF]" : "text-gray-400"
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">Send Immediately</p>
                        <p className="text-xs text-gray-500">Campaign will start right away</p>
                      </div>
                    </div>
                    {scheduleType === "now" && (
                      <Check className="w-5 h-5 text-[#0066FF]" />
                    )}
                  </button>

                  <button
                    onClick={() => setScheduleType("scheduled")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      scheduleType === "scheduled"
                        ? "border-[#0066FF] bg-blue-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-5 h-5 ${
                        scheduleType === "scheduled" ? "text-[#0066FF]" : "text-gray-400"
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">Schedule for Later</p>
                        <p className="text-xs text-gray-500">Choose a specific date and time</p>
                      </div>
                    </div>
                    {scheduleType === "scheduled" && (
                      <Check className="w-5 h-5 text-[#0066FF]" />
                    )}
                  </button>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-700 mb-3">Campaign Summary</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name</span>
                      <span className="font-medium text-gray-900">{campaignName || "Untitled"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Template</span>
                      <span className="font-medium text-gray-900">
                        {templates.find(t => t.id === selectedTemplate)?.name || "None"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Audience</span>
                      <span className="font-medium text-gray-900">
                        {audiences.find(a => a.id === selectedAudience)?.name || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50/50">
            <Button
              variant="ghost"
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="text-gray-600"
            >
              {step > 1 ? "Back" : "Cancel"}
            </Button>

            <Button
              onClick={() => step < 3 ? setStep(step + 1) : handleCreate()}
              disabled={
                (step === 1 && (!campaignName || !selectedTemplate)) ||
                (step === 2 && !selectedAudience)
              }
              className="gap-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step < 3 ? (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Launch Campaign
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
