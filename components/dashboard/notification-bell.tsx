"use client"

import { useState } from "react"
import { Bell, X, AlertTriangle, TrendingUp, MessageSquare, CheckCircle } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Retention risk detected",
    description: "Engineering team shows declining sentiment",
    time: "2 min ago",
    unread: true,
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600"
  },
  {
    id: 2,
    type: "success",
    title: "Campaign completed",
    description: "Q4 Pulse achieved 94% response rate",
    time: "1 hour ago",
    unread: true,
    icon: CheckCircle,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    id: 3,
    type: "insight",
    title: "New theme emerging",
    description: "Work-life balance mentioned 23 times",
    time: "3 hours ago",
    unread: false,
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    id: 4,
    type: "message",
    title: "12 new responses",
    description: "New Hire Check-in campaign",
    time: "5 hours ago",
    unread: false,
    icon: MessageSquare,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
]

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                    notification.unread ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notification.iconBg}`}>
                    <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50/50">
              <button className="w-full text-sm font-medium text-[#0066FF] hover:text-[#0052CC] py-2 rounded-xl hover:bg-blue-50 transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
