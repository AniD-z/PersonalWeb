"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
}

export function GlassmorphicCard({ children, className }: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn("", className)}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-red-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">{children}</div>
      </div>
    </motion.div>
  )
}
