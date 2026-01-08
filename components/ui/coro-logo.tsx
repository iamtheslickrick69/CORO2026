interface CoroLogoProps {
  className?: string
}

export function CoroLogo({ className = "" }: CoroLogoProps) {
  return (
    <svg
      viewBox="0 0 160 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="coro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#0052CC" />
        </linearGradient>
      </defs>

      {/* CORO Text */}
      <text
        x="0"
        y="36"
        fill="url(#coro-gradient)"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="40"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        CORO
      </text>

      {/* Decorative Circle */}
      <circle
        cx="148"
        cy="24"
        r="8"
        fill="url(#coro-gradient)"
        opacity="0.8"
      />
    </svg>
  )
}
