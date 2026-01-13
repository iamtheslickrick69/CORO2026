"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

// Consistent spring config across the app
const springConfig = {
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function ScrollAnimation({ children, className = "", delay = 0, threshold = 0.1 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        type: "spring",
        ...springConfig,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // Ease out cubic for smooth deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easedProgress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ type: "spring", ...springConfig }}
    >
      {count}
      {suffix}
    </motion.span>
  )
}
