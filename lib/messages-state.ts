"use client"

import { create } from "zustand"
import type { Message, Conversation } from "./types"

interface MessagesState {
  conversations: Conversation[]
  activeConversationId: string | null
  addMessage: (conversationId: string, message: Message) => void
  setActiveConversation: (id: string | null) => void
  markAsRead: (conversationId: string) => void
  addReaction: (conversationId: string, messageId: string, reaction: string) => void
}

// Initial conversation with CORO
// Use fixed timestamps to avoid hydration errors
const baseTimestamp = 1704067200000 // Fixed timestamp: Jan 1, 2024
const coroConversation: Conversation = {
  id: "coro",
  contact: {
    id: "coro",
    name: "CORO",
    avatar: "",
    isOnline: true,
  },
  messages: [
    {
      id: "1",
      content: "Hey Sarah! This is CORO. Got a minute for a quick check-in?",
      sender: "assistant",
      timestamp: baseTimestamp - 1000 * 60 * 10,
      status: "delivered",
    },
    {
      id: "2",
      content: "Sure, what's up?",
      sender: "user",
      timestamp: baseTimestamp - 1000 * 60 * 9,
      status: "read",
    },
    {
      id: "3",
      content: "How are you feeling about work this week? Scale of 1-10?",
      sender: "assistant",
      timestamp: baseTimestamp - 1000 * 60 * 8,
      status: "delivered",
    },
    {
      id: "4",
      content: "Honestly? Maybe a 5. The new project timeline feels impossible.",
      sender: "user",
      timestamp: baseTimestamp - 1000 * 60 * 7,
      status: "read",
    },
    {
      id: "5",
      content: "I hear you. What would help make that timeline more manageable?",
      sender: "assistant",
      timestamp: baseTimestamp - 1000 * 60 * 6,
      status: "delivered",
    },
  ],
  lastMessageAt: baseTimestamp - 1000 * 60 * 6,
  unreadCount: 0,
}

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: [coroConversation],
  activeConversationId: "coro", // Open CORO conversation by default
  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessageAt: message.timestamp,
              unreadCount: conv.unreadCount + (message.sender === "assistant" ? 1 : 0),
            }
          : conv,
      ),
    })),
  setActiveConversation: (id) => set({ activeConversationId: id }),
  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map((msg) => ({
                ...msg,
                status: msg.sender === "user" ? "read" : msg.status,
              })),
            }
          : conv,
      ),
    })),
  addReaction: (conversationId, messageId, reaction) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      reactions: [...(msg.reactions || []), reaction],
                    }
                  : msg,
              ),
            }
          : conv,
      ),
    })),
}))
