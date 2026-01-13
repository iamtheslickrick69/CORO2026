"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  duration?: number
  borderWidth?: number
  color?: string
}

export function BorderBeam({
  className,
  duration = 4,
  borderWidth = 2,
  color = "#0066FF",
}: BorderBeamProps) {
  return (
    <>
      {/* Rotating gradient - behind content */}
      <div
        style={
          {
            "--duration": `${duration}s`,
            "--color": color,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden -z-10",
          className
        )}
      >
        <div
          className="absolute inset-[-100%] animate-[spin_var(--duration)_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, var(--color) 60deg, transparent 120deg)`,
          }}
        />
      </div>
      {/* Inner background - sits between gradient and content */}
      <div
        className="absolute rounded-[inherit] bg-white -z-[5]"
        style={{
          inset: `${borderWidth}px`,
        }}
      />
    </>
  )
}
