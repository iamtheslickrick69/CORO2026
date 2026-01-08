import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50/30 to-white text-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.1),transparent_70%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollAnimation>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-balance">
            Right Now, Someone on Your Team Is Thinking About Quitting.
            <br />
            <span className="text-[#0066FF]">You Just Don't Know It Yet.</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            CORO closes the blind spots. See what you're missing before it's too late.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0066FF] to-[#3385FF] rounded-xl opacity-70 blur group-hover:opacity-100 transition-opacity duration-300" />
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white px-8 py-6 text-base font-semibold shadow-2xl shadow-blue-500/30 group"
              >
                See What Your Employees Aren't Telling You
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium border-blue-200 text-gray-700 hover:bg-blue-50/50 group glass-card hover:border-[#0066FF]/40"
            >
              <Play className="mr-2 w-4 h-4 text-[#0066FF]" />
              Watch Demo
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
