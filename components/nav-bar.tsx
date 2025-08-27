"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavBarProps {
  navItems?: Array<{ name: string; href: string }>
}

export function NavBar({ navItems }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const defaultNavItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/#contact" },
  ]

  const navigationItems = navItems || defaultNavItems

  // Trigger the resume download
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/data/Aniket_Resume.pdf"
    link.download = "Aniket_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsOpen(false)
  }

  const handleNavClick = () => setIsOpen(false)

  const handleOverlayClick = () => setIsOpen(false)

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md border-b border-emerald-500/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="font-bold text-xl z-50 relative">
              <span className="bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent">Aniket</span>
              <span className="text-white">K</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-emerald-500 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                size="sm"
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-600 hover:to-green-800 text-white border-0"
              >
                Download Resume
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden z-50 relative p-2 text-white hover:text-emerald-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={handleOverlayClick}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[60%] bg-black border-r border-emerald-500/20 z-50 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-6">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className="text-white hover:text-emerald-500 transition-colors duration-200 text-lg font-medium block py-2"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Download Resume Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Button
                    onClick={handleDownloadResume}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-700 hover:from-emerald-600 hover:to-green-800 text-white border-0"
                  >
                    Download Resume
                  </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto mb-8"
                >
                  <div className="flex space-x-4">
                    <Link
                      href="https://github.com/AniD-z"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNavClick}
                      className="p-2 text-white hover:text-emerald-500 transition-colors"
                    >
                      <Github size={20} />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/aniketk0x45/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNavClick}
                      className="p-2 text-white hover:text-emerald-500 transition-colors"
                    >
                      <Linkedin size={20} />
                    </Link>
                    <Link
                      href="mailto:aniketkumar0x45@gmail.com"
                      onClick={handleNavClick}
                      className="p-2 text-white hover:text-emerald-500 transition-colors"
                    >
                      <Mail size={20} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
