"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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

// Spring configuration for smooth, natural animations
const springConfig = {
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

interface AccordionItemProps {
  item: {
    id: number
    title: string
    imageUrl: string
  }
  isActive: boolean
  onMouseEnter: () => void
  index: number
}

function AccordionItem({ item, isActive, onMouseEnter, index }: AccordionItemProps) {
  return (
    <motion.div
      className="relative h-[400px] lg:h-[450px] rounded-2xl overflow-hidden cursor-pointer"
      animate={{
        width: isActive ? 400 : 60,
      }}
      transition={{
        type: "spring",
        ...springConfig,
        delay: index * 0.02, // Subtle stagger
      }}
      onMouseEnter={onMouseEnter}
      style={{
        boxShadow: isActive
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Background Image */}
      <motion.img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          filter: isActive ? "brightness(1)" : "brightness(0.7)",
        }}
        transition={{
          type: "spring",
          ...springConfig,
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = "https://placehold.co/400x450/0066FF/ffffff?text=Coro"
        }}
      />

      {/* Dark gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        animate={{
          opacity: isActive ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          ...springConfig,
        }}
      />

      {/* Caption Text - Horizontal when collapsed, normal when expanded */}
      <motion.span
        className="absolute text-white text-base lg:text-lg font-semibold whitespace-nowrap drop-shadow-lg"
        animate={{
          bottom: isActive ? 24 : 96,
          left: "50%",
          x: "-50%",
          rotate: isActive ? 0 : -90,
          opacity: isActive ? 1 : 0.9,
        }}
        transition={{
          type: "spring",
          ...springConfig,
        }}
      >
        {item.title}
      </motion.span>
    </motion.div>
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
          index={index}
        />
      ))}
    </div>
  )
}
