"use client"

import { motion } from "framer-motion"
import { Trophy, Users, FileText } from "lucide-react"

interface AchievementCardProps {
  title: string
  description: string
  date: string
  type: "award" | "leadership" | "publication"
}

export function AchievementCard({ title, description, date, type }: AchievementCardProps) {
  const getIcon = () => {
    switch (type) {
      case "award":
        return <Trophy className="h-6 w-6 text-yellow-400" />
      case "leadership":
        return <Users className="h-6 w-6 text-blue-400" />
      case "publication":
        return <FileText className="h-6 w-6 text-green-400" />
      default:
        return <Trophy className="h-6 w-6 text-yellow-400" />
    }
  }

  const getColor = () => {
    switch (type) {
      case "award":
        return "from-yellow-500/10 to-yellow-700/10"
      case "leadership":
        return "from-blue-500/10 to-blue-700/10"
      case "publication":
        return "from-green-500/10 to-green-700/10"
      default:
        return "from-yellow-500/10 to-yellow-700/10"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 h-full transition-all duration-300 hover:border-red-500/50">
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${getColor()} rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200`}
        ></div>

        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-700/50 flex items-center justify-center flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-zinc-300 mb-3">{description}</p>
              <span className="text-zinc-500 text-sm">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
