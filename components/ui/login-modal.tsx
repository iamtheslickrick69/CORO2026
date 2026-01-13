"use client"

import { useState } from "react"
import { X, Mail, Lock, Eye, EyeOff, Calendar } from "lucide-react"
import { CalendlyModal } from "./calendly-modal"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  if (!isOpen) return null

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Google OAuth would redirect here in production")
    }, 1000)
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Login successful! (Demo)")
    }, 1000)
  }

  const handleBookDemo = () => {
    setShowCalendly(true)
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          {/* Content */}
          <div className="p-6 pt-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 mt-1 text-sm">Sign in to your Coro account</p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 h-11 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-400">or</span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full h-11 pl-11 pr-4 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-11 pl-11 pr-11 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF]" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-[#0066FF] hover:underline font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 text-sm"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Book Demo Section */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-center text-sm text-gray-500 mb-3">New to Coro?</p>
              <button
                onClick={handleBookDemo}
                className="w-full h-11 flex items-center justify-center gap-2 border-2 border-[#0066FF] text-[#0066FF] rounded-xl font-semibold hover:bg-[#0066FF]/5 transition-all duration-200 text-sm"
              >
                <Calendar className="w-4 h-4" />
                Book a Demo
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-4">
              By signing in, you agree to our{" "}
              <button className="text-[#0066FF] hover:underline">Terms</button>
              {" "}and{" "}
              <button className="text-[#0066FF] hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
    </>
  )
}
