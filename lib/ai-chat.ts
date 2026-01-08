// Predefined CORO responses for employee feedback
const responses = [
  "Thanks for sharing that. Your feedback helps us understand what's working and what needs attention.",
  "I appreciate you being honest. Would more team support or resources help with what you're working on?",
  "That's valuable insight. What's one thing that would make your day-to-day work easier?",
  "I hear you. Is there anything specific that's been on your mind this week?",
  "Thanks for the update. Remember, everything shared here is confidential - only you can access this conversation.",
  "Your input matters. What's been the highlight of your week so far?",
  "I understand. Is there a particular project or task that's been challenging lately?",
]

export async function generateChatResponse(message: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)]
}
