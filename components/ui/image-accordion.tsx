"use client"

import { useState } from "react"

const accordionItems = [
  {
    id: 1,
    title: "Employee Feedback",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Customer Insights",
    imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Crisis Prevention",
    imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Real-time Analytics",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Secure Messaging",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
  },
]

interface AccordionItemProps {
  item: {
    id: number
    title: string
    imageUrl: string
  }
  isActive: boolean
  onMouseEnter: () => void
}

function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className={`
        relative h-[400px] lg:h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? "w-[280px] sm:w-[320px] lg:w-[400px]" : "w-[50px] sm:w-[55px] lg:w-[60px]"}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          isActive ? "grayscale-0" : "grayscale"
        }`}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/400x450/0066FF/ffffff?text=Coro"
        }}
      />

      {/* Subtle dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-base lg:text-lg font-semibold whitespace-nowrap
          transition-all duration-500 ease-in-out drop-shadow-lg
          ${
            isActive
              ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0 opacity-100"
              : "w-auto text-left bottom-24 left-1/2 -translate-x-1/2 -rotate-90 origin-center opacity-90"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  )
}

export function ImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleItemHover = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 p-4">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          onMouseEnter={() => handleItemHover(index)}
        />
      ))}
    </div>
  )
}
