"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award } from "lucide-react"

interface EducationCardProps {
  degree: string
  institution: string
  location: string
  grade: string
  period: string
  type: "degree" | "school"
}

export function EducationCard({ degree, institution, location, grade, period, type }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 h-full transition-all duration-300 hover:border-red-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              {type === "degree" ? (
                <GraduationCap className="h-6 w-6 text-red-400" />
              ) : (
                <Award className="h-6 w-6 text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{degree}</h3>
              <p className="text-red-400 font-medium mb-2">{institution}</p>
              <p className="text-zinc-400 text-sm mb-2">{location}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-medium">{grade}</span>
                <span className="text-zinc-500 text-sm">{period}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
