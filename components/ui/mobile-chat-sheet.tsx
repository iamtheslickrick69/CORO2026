"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useDragControls, PanInfo } from "framer-motion"
import { MessageCircle, X, Send, RotateCcw } from "lucide-react"
import Image from "next/image"

interface Message {
  id: number
  text: string
  sender: "user" | "coro"
  timestamp: string
}

const INITIAL_GREETING = "Hey there! 👋 I'm Coro, your confidential feedback companion. How are you feeling about work today?"

const QUICK_REPLIES = ["Great week!", "It's been tough", "Just okay", "Need to vent"]

export function MobileChatSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: INITIAL_GREETING, sender: "coro", timestamp: "Just now" }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: INITIAL_GREETING }
  ])
  const [sheetHeight, setSheetHeight] = useState(85) // percentage of viewport
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragControls = useDragControls()

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingMessage])

  // Handle keyboard on mobile
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to let the sheet animate in
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const resetConversation = () => {
    setMessages([{ id: 1, text: INITIAL_GREETING, sender: "coro", timestamp: "Just now" }])
    setConversationHistory([{ role: "assistant", content: INITIAL_GREETING }])
    setInputValue("")
    setIsTyping(false)
    setStreamingMessage("")
  }

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (!textToSend || isTyping) return

    const now = new Date()
    const time = now.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit" })

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      sender: "user",
      timestamp: time
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    // Update history
    const updatedHistory = [...conversationHistory, { role: "user", content: textToSend }]
    setConversationHistory(updatedHistory)

    // Show typing
    setIsTyping(true)
    setStreamingMessage("")

    try {
      const response = await fetch("/api/coro-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory })
      })

      if (!response.ok) throw new Error("Failed")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ") && line !== "data: [DONE]") {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.text) {
                  fullResponse += data.text
                  setStreamingMessage(fullResponse)
                }
              } catch {}
            }
          }
        }
      }

      setIsTyping(false)
      setStreamingMessage("")

      const responseTime = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit" })

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: fullResponse || "I'm here to help! Tell me more about what's on your mind.",
        sender: "coro",
        timestamp: responseTime
      }])

      setConversationHistory(prev => [...prev, { role: "assistant", content: fullResponse }])
    } catch (error) {
      setIsTyping(false)
      setStreamingMessage("")
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I'm here to listen. What's on your mind? 😊",
        sender: "coro",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit" })
      }])
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged down significantly, close the sheet
    if (info.offset.y > 100) {
      setIsOpen(false)
    }
  }

  // Only show on mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#0052CC] rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">1</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            style={{ height: `${sheetHeight}vh` }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drag Handle */}
            <div
              className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
              <button
                onClick={resetConversation}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-gray-500" />
              </button>

              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image
                    src="/taurus.png"
                    alt="Coro"
                    fill
                    className="rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Coro</p>
                  <p className="text-[10px] text-green-600">Online</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "coro" && (
                    <div className="relative w-7 h-7 mr-2 flex-shrink-0">
                      <Image
                        src="/taurus.png"
                        alt="Coro"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-[#0066FF] text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                    <p className={`text-[10px] mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-400"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {/* Streaming message */}
              {isTyping && streamingMessage && (
                <div className="flex justify-start">
                  <div className="relative w-7 h-7 mr-2 flex-shrink-0">
                    <Image src="/taurus.png" alt="Coro" fill className="rounded-full object-cover" />
                  </div>
                  <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-white shadow-sm border border-gray-100">
                    <p className="text-[15px] leading-relaxed text-gray-800">{streamingMessage}</p>
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && !streamingMessage && (
                <div className="flex justify-start">
                  <div className="relative w-7 h-7 mr-2 flex-shrink-0">
                    <Image src="/taurus.png" alt="Coro" fill className="rounded-full object-cover" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-4 py-2 bg-white border-t border-gray-100">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {QUICK_REPLIES.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(reply)}
                      className="flex-shrink-0 px-4 py-2 text-sm bg-blue-50 text-[#0066FF] rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="px-4 py-3 bg-white border-t border-gray-200 safe-area-bottom">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-[16px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
                  style={{ fontSize: "16px" }} // Prevents iOS zoom on focus
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-11 h-11 bg-[#0066FF] rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-gray-300 transition-all active:scale-95"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
