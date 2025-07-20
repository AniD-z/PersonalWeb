"use client"

import { useEffect, useState } from "react"
import motivationalTexts from "@/data/motivationalText"
import "./Loader.css"

const Loader = () => {
  const [text, setText] = useState("Loading...")

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalTexts.length)
    setText(motivationalTexts[randomIndex])
  }, [])

  const renderLoader = (displayText: string) => (
    <div className="body-m">
      <div className="hexagon" aria-label="Animated hexagonal ripples">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hexagon__group">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="hexagon__sector" />
            ))}
          </div>
        ))}
      </div>
      <p aria-label="Loading">{displayText}</p>
    </div>
  )

  return renderLoader(text)
}

export default Loader
