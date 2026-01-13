"use client"

import { useState } from "react"
import { X, Calendar, Clock, Video, ChevronLeft, ChevronRight, Check } from "lucide-react"

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<"date" | "confirm">("date")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  if (!isOpen) return null

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    setStep("confirm")
  }

  const handleClose = () => {
    setStep("date")
    setSelectedDate(null)
    setSelectedTime(null)
    onClose()
  }

  const today = new Date().getDate()
  const isCurrentMonth = currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book a Demo</h2>
              <p className="text-sm text-gray-500">Schedule a 30-minute call with our team</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {step === "date" ? (
          <div className="flex flex-col md:flex-row">
            {/* Left side - Meeting info */}
            <div className="md:w-1/3 p-6 bg-gray-50 border-r border-gray-100">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Meeting Type</p>
                  <p className="font-semibold text-gray-900">Coro Product Demo</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">30 min</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Google Meet</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Learn how Coro can help you collect real feedback from employees and customers via secure SMS conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Calendar */}
            <div className="md:w-2/3 p-6">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="font-semibold text-gray-900">{monthName}</h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const isPast = isCurrentMonth && day < today
                  const isWeekend = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay() === 0 || new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay() === 6
                  const isSelected = selectedDate === day
                  const isDisabled = isPast || isWeekend

                  return (
                    <button
                      key={day}
                      onClick={() => !isDisabled && handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        py-2 text-sm rounded-lg transition-all
                        ${isSelected ? "bg-[#0066FF] text-white font-semibold" : ""}
                        ${!isSelected && !isDisabled ? "hover:bg-blue-50 text-gray-700" : ""}
                        ${isDisabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                      `}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Available times for {currentMonth.toLocaleString("default", { month: "long" })} {selectedDate}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`
                          py-2 px-3 text-sm rounded-lg border transition-all
                          ${selectedTime === time
                            ? "bg-[#0066FF] text-white border-[#0066FF]"
                            : "border-gray-200 hover:border-[#0066FF] hover:text-[#0066FF]"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm button */}
              {selectedDate && selectedTime && (
                <div className="mt-6">
                  <button
                    onClick={handleConfirm}
                    className="w-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation step */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h3>
            <p className="text-gray-600 mb-6">
              Your demo has been scheduled for{" "}
              <span className="font-semibold">
                {currentMonth.toLocaleString("default", { month: "long" })} {selectedDate} at {selectedTime}
              </span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              A calendar invite has been sent to your email with the Google Meet link.
            </p>
            <button
              onClick={handleClose}
              className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
