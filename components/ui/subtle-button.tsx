"use client"

import { ReactNode } from "react"

interface SubtleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: "primary" | "secondary"
}

export function SubtleButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: SubtleButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
      : "bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 hover:border-[#0066FF] hover:bg-white hover:-translate-y-0.5 hover:shadow-md"

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  )
}
