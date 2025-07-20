"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { ModernNavbar } from "@/components/modern-navbar"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import Loader from "@/components/Loader"
import { EducationCard } from "@/components/education-card"
import { AchievementCard } from "@/components/achievement-card"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loader for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      <ScrollProgress />
      <ModernNavbar navItems={navItems} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                Aniket Kumar
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-[600px] mx-auto">
              I craft exceptional digital experiences with code, creativity, and a passion for innovation.
            </p>
            <div className="flex justify-center pt-4">
  <Button className="relative overflow-hidden group bg-gradient-to-r from-red-500 to-red-700 border-0">
    <Link href="#projects" className="relative z-10 flex items-center font-bold text-white">
      View Projects
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
    <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></span>
  </Button>
</div>
            <div className="flex gap-4 pt-4 justify-center">
              <Link href="https://github.com/AniD-z" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/aniketk0x45/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="mailto:aniketkumar0x45@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src="/photo.jpeg?height=700&width=600"
                  alt="Shine Kyaw Kyaw Aung"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-sm md:text-base lg:text-lg text-zinc-300">
                  A passion for developing innovative solutions in web development, game-based learning, and network
                  security. I specialize in Network Security, Cloud Security, full-stack development with React, Node.js, and modern web technologies.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-zinc-300 mt-4">
                  My journey includes working on cutting-edge projects like Confidential Computing for 5G/6G networks,
                  developing educational gaming platforms, and creating immersive web experiences. I've been recognized
                  in multiple hackathons and served as president of multiple groups. 
                </p>
                <p className="text-sm md:text-base lg:text-lg text-zinc-300 mt-4">
                  When I'm not coding, you can find me exploring new technologies, leading my game development team, and
                  contributing to research in network security and educational technology.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm text-zinc-500">Name</div>
                    <div className="text-sm md:text-base font-medium">Aniket Kumar</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm text-zinc-500">Email</div>
                    <div className="text-sm md:text-base font-medium">aniketkumar0x45@gmail.com</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm text-zinc-500">Education</div>
                    <div className="text-sm md:text-base font-medium">Computer Science, Amrita Vishwa Vidyapeetam</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm text-zinc-500">CGPA</div>
                    <div className="text-sm md:text-base font-medium text-green-500">8.2/10.0</div>
                  </div>
                </div>

                <div className="mt-8">
  <a
    href="/data/resume.pdf" // path to the resume file in your /data folder
    download="Aniket_Resume.pdf" // name of the downloaded file
  >
    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm md:text-base">
      Download Resume
    </Button>
  </a>
</div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}

      {/* Projects Section - Moved above Skills */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ProjectCard
              title="Impact Analysis of Confidential Computing on B5G/6G (SAMSUNG)"
              description="Developed Confidential Computing solutions using Homomorphic Encryption, TEEs, and TPM 2.0 attestation for secure 5G networks and edge computing."
              tags={["Confidential Computing", "5G/6G", "TEE", "Samsung"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl=""
              repoUrl=""
            />
            <ProjectCard
              title="SchemaVerse"
              description="A game-based learning platform for NoSQL queries with custom code editor, focusing on aggregation pipelines and data filtering."
              tags={["React.js", "Node.js", "Express.js", "MongoDB"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://dbms-inky.vercel.app/"
              repoUrl="https://github.com/AniD-z/DBMS"
            />
            <ProjectCard
              title="Algorithmic Arcade"
              description="Educational platform that gamifies data structures learning through interactive puzzles, visualizers, and progressive rewards."
              tags={["React.js", "Node.js", "Data Structures", "Gamification"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://dsa-full.vercel.app/"
              repoUrl="https://github.com/AniD-z/DSA_full"
            />
            <ProjectCard
              title="Distribution Management System"
              description="Wage calculation and disbursement system for factory workers based on actual working hours with security features."
              tags={["Management System", "Security", "Factory Automation"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://www.aarnpolymers.com/"
              repoUrl=""
            />
            <ProjectCard
              title="International Import/Export Website"
              description="Immersive website for international clothing trade with social media content integration and security measures."
              tags={["Web Development", "E-commerce", "Security", "Social Media"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl="https://sntweb.vercel.app/"
              repoUrl=""
            />
            <ProjectCard
              title="Reverse SHell Attack"
              description="This a replication of reverse shell attacks and analysis of the attack."
              tags={["Metasploit", "powershell", "Netcat", "shell"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl=""
              repoUrl="https://github.com/AniD-z/Reverse_Shell_Backdoor"
            />
            <ProjectCard
              title="Evil Twin "
              description="This is a simulation of evil twin attack and its analysis."
              tags={["Handshake", "aircrack-ng", "shell", "router"]}
              image="/placeholder.svg?height=400&width=600"
              demoUrl=""
              repoUrl="https://github.com/AniD-z/Evil_Twin"
            />
          </div>
        </div>
      </section>

      {/* Skills Section - Moved below Projects */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            
            <SkillBadge name="C++" level={85} />
            <SkillBadge name="Java" level={80} />
            <SkillBadge name="Go" level={75} />
            <SkillBadge name="Python" level={90} />
            <SkillBadge name="React.js" level={95} />
            <SkillBadge name="Node.js" level={90} />
            <SkillBadge name="Express.js" level={85} />
            <SkillBadge name="MongoDB" level={80} />
            <SkillBadge name="UI/UX Design" level={85} />
            <SkillBadge name="Network Security" level={80} />
            <SkillBadge name="3GPP Specifications" level={75} />
            <SkillBadge name="Leadership" level={95} />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Achievements & Publications" subtitle="Recognition and contributions" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <AchievementCard
              title="Top 15 - 5G/6G Hackathon TCOE India"
              description="Achieved top 15 position in the prestigious 5G/6G Hackathon, showcasing innovative solutions for next-generation networks."
              date="September 2024"
              type="award"
            />
            <AchievementCard
              title="Second Prize - ELECTRONICA '23 Hackathon"
              description="Won second place in ELECTRONICA '23 Hackathon for developing innovative electronic solutions."
              date="November 2023"
              type="award"
            />
            <AchievementCard
              title="President of FORGE Game Development Club"
              description="Leading the game development community, organizing events, workshops, and fostering innovation in game development."
              date="2023 - 2025"
              type="leadership"
            />
            <AchievementCard
              title="SchemaVerse: Game-based Learning of NoSQL Queries"
              description="Published research paper at IEEE CONECCT 2024 on innovative game-based approach to teaching NoSQL database concepts."
              date="2024"
              type="publication"
            />
          </div>
        </div>
      </section>
      <section id="education" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Education" subtitle="My academic journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <EducationCard
              degree="B.Tech Computer Science"
              institution="Amrita Vishwa Vidyapeetam"
              location="Bangalore, India"
              grade="CGPA: 8.2/10.0"
              period="2022 - 2026"
              type="degree"
            />
            <EducationCard
              degree="Class 12th CBSE Board"
              institution="CBSE Board"
              location="Bangalore, India"
              grade="80%"
              period="2021 - 2022"
              type="school"
            />
            <EducationCard
              degree="Class 10th CBSE Board"
              institution="CBSE Board"
              location="Bangalore, India"
              grade="93%"
              period="2019 - 2020"
              type="school"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">aniketkumar0x45@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium">Linkedin.com/in/aniketk0x45/</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <div className="font-medium">github.com/AniD-z</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">Aniket</span>
              <span className="text-white">K</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Aniket Kumar. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/AniD-z" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/aniketk0x45/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:aniketkumar0x45@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
