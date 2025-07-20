"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
{
    title: "Research Project",
    company: "Samsung - Confidential Computing",
    period: "Sep 2024 - Apr 2025",
    description:
      "Working on Impact analysis of Confidential Computing on B5G/6G networks using Homomorphic Encryption, TEEs, and TPM 2.0 attestation for secure data processing.",
  },
  {
    title: "Web Developer Intern",
    company: "SNTLY Studio LLP",
    period: "Jan 2024 - May 2024",
    description:
      "Developed immersive website for international import and export of clothing with social media content integration. Prepared reports and presentations summarizing research findings.",
  },
  {
    title: "President",
    company: "FORGE - Game Development Club",
    period: "2023 - 2025",
    description:
      "Leading the game development club at Amrita Vishwa Vidyapeetam, organizing workshops, hackathons, and fostering a community of game developers and enthusiasts.",
  },
  {
    title: "Software Development Intern",
    company: "AAR N POLYMERS",
    period: "May 2024 - Aug 2024",
    description:
      "Developed Distribution Management System that calculates and disburses wages to workers based on actual working hours. Streamlined payment processes and implemented basic security features.",
  },
  
  
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
