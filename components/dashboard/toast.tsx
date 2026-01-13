"use client"

import { useEffect, useState } from "react"
import { CheckCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type = "success", isVisible, onClose }: ToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 300)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible && !show) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
        <CheckCircle className="w-5 h-5 text-emerald-600" />
      </div>
      <div className="pr-2">
        <p className="font-medium text-gray-900">{message}</p>
        <p className="text-sm text-gray-500">Your campaign is now live</p>
      </div>
      <button
        onClick={() => {
          setShow(false)
          setTimeout(onClose, 300)
        }}
        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  )
}
