"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, RotateCcw } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "coro"
  timestamp: string
  status?: "sending" | "delivered" | "read"
}

type Mode = "employee" | "customer"

interface IPhoneMockupProps {
  className?: string
  scale?: number
  mode?: Mode
}

type EmployeeCampaignType = "pulse" | "feedback" | "wins"
type CustomerCampaignType = "postvisit" | "resolution" | "rewards"
type CampaignType = EmployeeCampaignType | CustomerCampaignType

interface Campaign {
  id: CampaignType
  name: string
  greeting: string
  quickReplies: string[]
}

const EMPLOYEE_CAMPAIGNS: Campaign[] = [
  {
    id: "pulse",
    name: "Weekly Pulse",
    greeting: "Hey there! 👋 Time for your weekly check-in. How are you feeling about work this week?",
    quickReplies: ["Great week!", "It's been tough", "Just okay", "Need to vent"],
  },
  {
    id: "feedback",
    name: "Anonymous Feedback",
    greeting: "Hi! 👋 This is a safe space to share honest feedback. What's on your mind about the workplace?",
    quickReplies: ["About my team", "About leadership", "About culture", "Something else"],
  },
  {
    id: "wins",
    name: "Quick Wins",
    greeting: "Hey! 👋 Let's celebrate some wins! What's something good that happened at work recently?",
    quickReplies: ["Got recognition!", "Team success", "Personal growth", "Share a win"],
  },
]

const CUSTOMER_CAMPAIGNS: Campaign[] = [
  {
    id: "postvisit",
    name: "Post-Visit",
    greeting: "Hey! 👋 Thanks for stopping by today. How was your experience with us?",
    quickReplies: ["It was great!", "Had an issue", "Could be better", "Quick feedback"],
  },
  {
    id: "resolution",
    name: "Issue Resolution",
    greeting: "Hi there! 👋 I heard something wasn't quite right. I'm here to help make it better — what happened?",
    quickReplies: ["Wrong order", "Service issue", "Quality problem", "Long wait"],
  },
  {
    id: "rewards",
    name: "Review & Rewards",
    greeting: "Hey! 👋 So glad you had a great experience! Would you like to share the love and earn a reward?",
    quickReplies: ["Leave a review", "Get my reward", "Tell me more", "Maybe later"],
  },
]

const MAX_MESSAGES = 20

export function IPhoneMockup({ className = "", scale = 1, mode = "employee" }: IPhoneMockupProps) {
  const CAMPAIGNS = mode === "employee" ? EMPLOYEE_CAMPAIGNS : CUSTOMER_CAMPAIGNS
  const API_ENDPOINT = mode === "employee" ? "/api/coro-chat" : "/api/coro-customer-chat"
  const defaultCampaignId = mode === "employee" ? "pulse" : "postvisit"

  const [currentTime, setCurrentTime] = useState("")
  const [activeCampaign, setActiveCampaign] = useState<CampaignType>(defaultCampaignId)
  const [messageCount, setMessageCount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: CAMPAIGNS[0].greeting,
      sender: "coro",
      timestamp: "Just now",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Conversation history for API context
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: CAMPAIGNS[0].greeting,
    },
  ])

  // Reset when mode changes
  useEffect(() => {
    const newCampaigns = mode === "employee" ? EMPLOYEE_CAMPAIGNS : CUSTOMER_CAMPAIGNS
    const newDefaultCampaign = newCampaigns[0]
    setActiveCampaign(newDefaultCampaign.id)
    setMessages([
      {
        id: 1,
        text: newDefaultCampaign.greeting,
        sender: "coro",
        timestamp: "Just now",
      },
    ])
    setConversationHistory([
      {
        role: "assistant",
        content: newDefaultCampaign.greeting,
      },
    ])
    setMessageCount(0)
    setInputValue("")
    setIsTyping(false)
    setStreamingMessage("")
  }, [mode])

  const currentCampaign = CAMPAIGNS.find((c) => c.id === activeCampaign) || CAMPAIGNS[0]

  const resetConversation = (campaign?: CampaignType) => {
    const targetCampaign = CAMPAIGNS.find((c) => c.id === (campaign || activeCampaign)) || CAMPAIGNS[0]
    setMessages([
      {
        id: 1,
        text: targetCampaign.greeting,
        sender: "coro",
        timestamp: "Just now",
      },
    ])
    setConversationHistory([
      {
        role: "assistant",
        content: targetCampaign.greeting,
      },
    ])
    setMessageCount(0)
    setInputValue("")
    setIsTyping(false)
    setStreamingMessage("")
  }

  const handleCampaignChange = (campaignId: CampaignType) => {
    setActiveCampaign(campaignId)
    resetConversation(campaignId)
  }

  const handleQuickReply = (reply: string) => {
    if (isTyping || messageCount >= MAX_MESSAGES) return
    setInputValue(reply)
    // Trigger send after a tiny delay to show the input
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent
      handleSendMessage(fakeEvent, reply)
    }, 100)
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Scroll only within the messages container, not the whole page
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  const handleSendMessage = async (e: React.FormEvent, quickReplyMessage?: string) => {
    e.preventDefault()
    const messageToSend = quickReplyMessage || inputValue.trim()
    if (!messageToSend || isTyping || messageCount >= MAX_MESSAGES) return

    const userMessage = messageToSend
    setMessageCount((prev) => prev + 1)
    const now = new Date()
    const time = now.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })

    const newMessage: Message = {
      id: messages.length + 1,
      text: userMessage,
      sender: "user",
      timestamp: time,
      status: "sending",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Update conversation history
    const updatedHistory = [...conversationHistory, { role: "user", content: userMessage }]
    setConversationHistory(updatedHistory)

    // Update to delivered after 500ms
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
    }, 500)

    // Update to read after 1 second
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))
    }, 1000)

    // Show typing indicator after 1.5 seconds (realistic delay)
    setTimeout(() => {
      setIsTyping(true)
      setStreamingMessage("")
    }, 1500)

    // Start API call after 2 seconds (gives time for typing indicator to show)
    setTimeout(async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: updatedHistory }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response")
        }

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
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }
        }

        // Add the complete response as a message
        setIsTyping(false)
        setStreamingMessage("")

        const responseTime = new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })

        const fallbackMessage = mode === "employee"
          ? "I'm here to help! Could you tell me more about what's on your mind?"
          : "Thanks for reaching out! How can I help you today?"

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: fullResponse || fallbackMessage,
            sender: "coro",
            timestamp: responseTime,
          },
        ])

        // Update conversation history with assistant response
        setConversationHistory((prev) => [...prev, { role: "assistant", content: fullResponse }])

        // Scroll within container after response
        setTimeout(scrollToBottom, 100)
      } catch (error) {
        console.error("Error:", error)
        setIsTyping(false)
        setStreamingMessage("")

        // Fallback response on error
        const responseTime = new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })

        const errorFallback = mode === "employee"
          ? "I'm here to listen and help. What's on your mind today? 😊"
          : "Thanks for reaching out! I'm here to help. What can I do for you? 😊"

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: errorFallback,
            sender: "coro",
            timestamp: responseTime,
          },
        ])
      }
    }, 2000)
  }

  return (
    <div className={`relative ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
      {/* iPhone Mockup */}
      <div className="relative w-[375px] h-[812px]">
        {/* iPhone Frame Image - Space Black */}
        <img
          src="/images/iphone-mockup.png"
          alt="iPhone Frame"
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none brightness-[0.25] contrast-[1.1]"
        />

        {/* Messages App Container */}
        <div className="absolute top-[28px] left-[18px] right-[18px] bottom-[28px] bg-white rounded-[36px] overflow-hidden z-0 flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pb-2 text-black text-sm font-medium pt-7">
            <span className="font-semibold">{currentTime}</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black/50 rounded-full"></div>
              </div>
              <svg className="w-5 h-3 ml-1" viewBox="0 0 24 16" fill="none">
                <rect x="1" y="4" width="18" height="8" rx="2" stroke="black" strokeWidth="1" fill="black" />
                <rect x="20" y="6" width="2" height="4" rx="1" fill="black" />
              </svg>
            </div>
          </div>

          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
            <button className="flex items-center gap-1 text-blue-500">
              <ChevronLeft size={24} strokeWidth={2.5} />
              <span className="text-[17px]">12</span>
            </button>

            <div className="flex flex-col items-center">
              {/* Coro Avatar */}
              <img
                src="/images/coro-avatar.png"
                alt="Coro"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-black font-semibold text-[13px] mt-0.5">Coro</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => resetConversation()}
                className="text-blue-500 p-1 hover:bg-blue-50 rounded-full transition-colors"
                title="Reset conversation"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Campaign Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {CAMPAIGNS.map((campaign) => (
              <button
                key={campaign.id}
                onClick={() => handleCampaignChange(campaign.id)}
                className={`flex-1 py-2 text-[11px] font-medium transition-colors ${
                  activeCampaign === campaign.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {campaign.name}
              </button>
            ))}
          </div>

          {/* Message Counter */}
          <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 text-[10px]">
            <span className="text-gray-500">Today</span>
            <span className={`${messageCount >= MAX_MESSAGES - 3 ? "text-orange-500" : "text-gray-400"}`}>
              {MAX_MESSAGES - messageCount} messages left
            </span>
          </div>

          {/* Messages Container */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-3 pb-2 space-y-1 bg-white">
            {messages.map((message, index) => {
              const isLastInGroup = index === messages.length - 1 || messages[index + 1]?.sender !== message.sender

              return (
                <div key={message.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {message.sender === "coro" && isLastInGroup && (
                      <img
                        src="/images/coro-avatar.png"
                        alt="Coro"
                        className="w-6 h-6 rounded-full mr-1.5 self-end mb-0.5"
                      />
                    )}
                    {message.sender === "coro" && !isLastInGroup && <div className="w-6 mr-1.5" />}

                    <div className="relative max-w-[240px]">
                      <div
                        className={`px-3 py-2 ${
                          message.sender === "user" ? "bg-[#007AFF] text-white" : "bg-[#E9E9EB] text-black"
                        } ${
                          isLastInGroup
                            ? message.sender === "user"
                              ? "rounded-[18px] rounded-br-[4px]"
                              : "rounded-[18px] rounded-bl-[4px]"
                            : "rounded-[18px]"
                        }`}
                      >
                        <p className="text-[15px] leading-[20px]">{message.text}</p>
                      </div>
                    </div>
                  </div>

                  {message.sender === "user" && isLastInGroup && message.status && (
                    <div className="flex justify-end mt-0.5 mr-1">
                      <span className="text-[10px] text-gray-500">
                        {message.status === "sending" && "Sending..."}
                        {message.status === "delivered" && "Delivered"}
                        {message.status === "read" && "Read"}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Streaming message */}
            {isTyping && streamingMessage && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <img
                  src="/images/coro-avatar.png"
                  alt="Coro"
                  className="w-6 h-6 rounded-full mr-1.5 self-end mb-0.5"
                />
                <div className="bg-[#E9E9EB] rounded-[18px] rounded-bl-[4px] px-3 py-2 max-w-[240px]">
                  <p className="text-[15px] leading-[20px] text-black">{streamingMessage}</p>
                </div>
              </div>
            )}

            {/* Typing indicator (before streaming starts) */}
            {isTyping && !streamingMessage && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <img
                  src="/images/coro-avatar.png"
                  alt="Coro"
                  className="w-6 h-6 rounded-full mr-1.5 self-end mb-0.5"
                />
                <div className="bg-[#E9E9EB] rounded-[18px] rounded-bl-[4px] px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Buttons */}
          {messages.length <= 2 && !isTyping && messageCount < MAX_MESSAGES && (
            <div className="px-3 py-2 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {currentCampaign.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-[12px] bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-3 py-2 bg-[#F6F6F6] border-t border-gray-200">
            <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
              <button type="button" className="text-gray-400 p-1">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 8v12M8 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={messageCount >= MAX_MESSAGES ? "Message limit reached" : "Message Coro..."}
                  disabled={isTyping || messageCount >= MAX_MESSAGES}
                  className="w-full bg-white text-black placeholder-gray-400 rounded-full px-4 py-2 text-[16px] focus:outline-none border border-gray-300 disabled:opacity-50"
                />
              </div>
              {inputValue.trim() ? (
                <button
                  type="submit"
                  disabled={isTyping}
                  className="bg-[#007AFF] text-white rounded-full p-1.5 transition-all disabled:opacity-50"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2.5 10L17.5 10M17.5 10L11 3.5M17.5 10L11 16.5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </button>
              ) : (
                <button type="button" className="text-gray-400 p-1">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
                    <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="13" cy="13" r="4" fill="currentColor" />
                  </svg>
                </button>
              )}
            </form>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center pb-2 bg-[#F6F6F6]">
            <div className="w-28 bg-black rounded-full h-1"></div>
          </div>
        </div>
      </div>

      {/* Demo Badge */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-xs text-gray-400">Live AI Demo — Try it!</span>
      </div>
    </div>
  )
}
