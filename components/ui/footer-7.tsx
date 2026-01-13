"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaLinkedin, FaTwitter } from "react-icons/fa"
import { Button } from "@/components/ui/button"

interface Footer7Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  sections?: Array<{
    title: string
    links: Array<{ name: string; href: string }>
  }>
  description?: string
  socialLinks?: Array<{
    icon: React.ReactElement
    href: string
    label: string
  }>
  copyright?: string
  legalLinks?: Array<{
    name: string
    href: string
  }>
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Security", href: "#security" },
      { name: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
]

const defaultSocialLinks = [
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
]

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
]

export const Footer7 = ({
  logo = {
    url: "/",
    src: "/logo-standard.png",
    alt: "Coro",
    title: "Coro",
  },
  sections = defaultSections,
  description = "Anonymous feedback that builds trust between employees and leadership. Every voice deserves to be heard.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Coro. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-4 lg:items-start lg:max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url}>
                <div className="relative h-8 w-24">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
            {/* CTA Button */}
            <Button className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:opacity-90 text-white px-5 py-2 text-sm font-semibold whitespace-nowrap">
              Book a Demo
            </Button>
            <ul className="flex items-center space-x-4 text-slate-500">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-[#0066FF] transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-12">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-2 font-bold text-slate-900">{section.title}</h3>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-[#0066FF] transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs font-medium text-slate-500 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-[#0066FF] transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
