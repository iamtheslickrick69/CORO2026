"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const dashboardTabs = [
  {
    id: 1,
    title: "Home",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-01-light.png&w=3840&q=75",
    alt: "Coro Dashboard Home - Overview of employee sentiment and engagement metrics",
  },
  {
    id: 2,
    title: "Campaigns",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-02-light.png&w=3840&q=75",
    alt: "Coro Campaigns - Manage and launch employee feedback campaigns",
  },
  {
    id: 3,
    title: "Insights",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-03-light.png&w=3840&q=75",
    alt: "Coro Insights - AI-powered analytics and trends",
  },
  {
    id: 4,
    title: "Templates",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-04-light.png&w=3840&q=75",
    alt: "Coro Templates - Pre-built conversation templates",
  },
  {
    id: 5,
    title: "Analytics",
    src: "https://ui.shadcn.com/_next/image?url=%2Fr%2Fstyles%2Fnew-york-v4%2Fdashboard-05-light.png&w=3840&q=75",
    alt: "Coro Analytics - Deep dive into team health metrics",
  },
]

export default function FeaturesDetail() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animation
    const tl = gsap.timeline()

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        sliderRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      )

    // Parallax effect on scroll
    gsap.to(".hero-blur", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    // Auto-slide interval
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === dashboardTabs.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => {
      tl.kill()
      clearInterval(slideInterval)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
          >
            Not everything powerful <br className="hidden sm:block" />
            <span className="text-[#0066FF]">has to look complicated</span>
          </h2>
          <p
            ref={textRef}
            className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Explore the dashboard that makes employee feedback actionable. Real insights, zero complexity.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative h-[60vh] sm:h-[70vh] overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {dashboardTabs.map((tab, index) => {
              const position = index - currentSlide
              const isActive = position === 0
              const zIndex = isActive ? 30 : 20 - Math.abs(position)
              const scale = isActive ? 1 : 0.9

              const translateX = position * 100

              return (
                <div
                  key={tab.id}
                  className={`absolute transition-all duration-500 ease-in-out rounded-2xl border-4 ${
                    isActive ? "border-[#0066FF]/20" : "border-slate-200"
                  } ${isActive ? "shadow-2xl shadow-blue-500/20" : "shadow-md"}`}
                  style={{
                    transform: `translateX(${translateX}%) scale(${scale})`,
                    zIndex,
                    opacity: Math.abs(position) > 2 ? 0 : 1,
                  }}
                >
                  <div className="relative aspect-[16/9] w-[80vw] max-w-4xl rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={tab.src}
                      alt={tab.alt}
                      fill
                      className="object-cover object-top"
                      priority={tab.id === 1}
                      unoptimized
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 sm:gap-6 mt-8 flex-wrap">
          {dashboardTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                currentSlide === index
                  ? "bg-[#0066FF] text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
