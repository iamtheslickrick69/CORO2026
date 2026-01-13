"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaLinkedin, FaTwitter } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { CalendlyModal } from "@/components/ui/calendly-modal"
import { AboutModal } from "@/components/ui/about-modal"
import { CareersModal } from "@/components/ui/careers-modal"
import { HelpCenterModal } from "@/components/ui/help-center-modal"
import { LegalModal } from "@/components/ui/legal-modal"

export const Footer7 = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isCareersOpen, setIsCareersOpen] = useState(false)
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false)
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState<"privacy" | "terms">("privacy")

  const openLegal = (tab: "privacy" | "terms") => {
    setLegalTab(tab)
    setIsLegalOpen(true)
  }

  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-4 lg:items-start lg:max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href="/">
                <div className="relative h-8 w-28">
                  <Image
                    src="/loopsync-logo.png"
                    alt="LoopSync"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Anonymous feedback that builds trust between employees and leadership. Every voice deserves to be heard.
            </p>
            {/* Contact Email */}
            <div className="flex flex-col gap-1">
              <p className="text-xs text-slate-500 font-medium">Contact Us</p>
              <a href="mailto:nick@loopsync.io" className="text-sm text-[#0066FF] hover:underline font-medium">
                nick@loopsync.io
              </a>
            </div>
            {/* CTA Button */}
            <Button
              onClick={() => setIsCalendlyOpen(true)}
              className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:opacity-90 text-white px-5 py-2 text-sm font-semibold whitespace-nowrap"
            >
              Book a Demo
            </Button>
            <ul className="flex items-center space-x-4 text-slate-500">
              <li className="hover:text-[#0066FF] transition-colors">
                <a href="https://twitter.com/coro" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="size-5" />
                </a>
              </li>
              <li className="hover:text-[#0066FF] transition-colors">
                <a href="https://linkedin.com/company/coro" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="size-5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Links */}
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-12">
            {/* Product */}
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Product</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li className="hover:text-[#0066FF] transition-colors">
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li className="hover:text-[#0066FF] transition-colors">
                  <a href="#security">Security</a>
                </li>
                <li className="hover:text-[#0066FF] transition-colors">
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Company</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li className="hover:text-[#0066FF] transition-colors">
                  <button onClick={() => setIsAboutOpen(true)} className="hover:text-[#0066FF]">
                    About
                  </button>
                </li>
                <li className="hover:text-[#0066FF] transition-colors">
                  <button onClick={() => setIsCareersOpen(true)} className="hover:text-[#0066FF]">
                    Careers
                  </button>
                </li>
                <li className="hover:text-[#0066FF] transition-colors">
                  <button onClick={() => setIsCalendlyOpen(true)} className="hover:text-[#0066FF]">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Resources</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li className="hover:text-[#0066FF] transition-colors">
                  <button onClick={() => setIsHelpCenterOpen(true)} className="hover:text-[#0066FF]">
                    Help Center
                  </button>
                </li>
                <li className="hover:text-[#0066FF] transition-colors">
                  <button onClick={() => openLegal("privacy")} className="hover:text-[#0066FF]">
                    Privacy Policy
                  </button>
                </li>
                <li className="hover:text-[#0066FF] transition-colors">
                  <button onClick={() => openLegal("terms")} className="hover:text-[#0066FF]">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs font-medium text-slate-500 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1 pb-12 sm:pb-0">© 2026 LoopSync. All rights reserved.</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
            <li className="hover:text-[#0066FF] transition-colors">
              <button onClick={() => openLegal("terms")}>Terms and Conditions</button>
            </li>
            <li className="hover:text-[#0066FF] transition-colors">
              <button onClick={() => openLegal("privacy")}>Privacy Policy</button>
            </li>
          </ul>
        </div>

        {/* Modals */}
        <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
        <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        <CareersModal isOpen={isCareersOpen} onClose={() => setIsCareersOpen(false)} />
        <HelpCenterModal isOpen={isHelpCenterOpen} onClose={() => setIsHelpCenterOpen(false)} />
        <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} initialTab={legalTab} />
      </div>
    </section>
  )
}
