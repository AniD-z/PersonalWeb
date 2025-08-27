import Image from "next/image"
import type { BlogPost } from "@/types/blog"
import { Breadcrumbs } from "./breadcrumbs"

interface BlogContentProps {
  post: BlogPost
}

export function BlogContent({ post }: BlogContentProps) {
  // Parse main modules by splitting on ## headings
  const parseMainModules = (content: string) => {
    const sections = content.split(/(?=##\s)/).filter((section) => section.trim())

    return sections.map((section) => {
      const lines = section.split("\n").filter((line) => line.trim())
      const heading = lines[0]?.replace(/^##\s*/, "").trim() || ""
      const content = lines.slice(1).join("\n").trim()

      return {
        heading,
        content,
      }
    })
  }

  const modules = parseMainModules(post.main_modules)

  // Parse table of contents into array
  const tocItems = post.table_of_contents
    .split("\n")
    .filter((item) => item.trim())
    .map((item) => item.trim())

  // Parse FAQ section
  const faqItems = post.faq_section
    .split("\n")
    .filter((item) => item.trim())
    .reduce((acc: Array<{ question: string; answer: string }>, line) => {
      if (line.startsWith("Q:")) {
        acc.push({ question: line.substring(2).trim(), answer: "" })
      } else if (line.startsWith("A:") && acc.length > 0) {
        acc[acc.length - 1].answer = line.substring(2).trim()
      }
      return acc
    }, [])

  // Parse links section and convert URLs to clickable links
  const parseLinksWithClickableUrls = (linksText: string) => {
    return linksText.split("\n").filter((item) => item.trim()).map((link) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const processedLink = link.replace(urlRegex, (url) => {
        const cleanUrl = url.replace(/[.,;:]$/, '')
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-emerald-300 underline transition-colors">${cleanUrl}</a>`
      })
      return processedLink
    })
  }

  const linksItems = parseLinksWithClickableUrls(post.links_section)

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950 min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-gray-900/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto p-6 lg:p-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blogs' },
              { label: post.title },
            ]}
          />
        </div>

        {/* Hero Image */}
        {post.hero_image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src={post.hero_image || "/placeholder.svg"} 
              alt={post.title} 
              fill 
              className="object-cover" 
              priority 
              itemProp="image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30">
                  {post.category}
                </span>
                <span className="text-white/80 text-sm">{post.author}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent"
            itemProp="headline"
          >
            {post.h1_title || post.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm mb-6">
            <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span itemProp="name" className="text-gray-300">By {post.author}</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs" itemProp="articleSection">{post.category}</span>
            <span className="text-gray-500">•</span>
            <time dateTime={post.created_at} itemProp="datePublished" className="text-gray-300">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.split(",").map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-800/60 backdrop-blur-sm border border-gray-700 text-gray-300 text-sm rounded-full hover:border-emerald-500/50 transition-colors" itemProp="keywords">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Reading time indicator */}
          <div className="text-sm text-gray-400 mb-8 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>5 min read</span>
          </div>
        </header>

        {/* Table of Contents */}
        {tocItems.length > 0 && (
          <section className="mb-12 p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Table of Contents</h2>
            <ul className="space-y-2">
              {tocItems.map((item, index) => (
                <li key={index} className="text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  <span className="text-emerald-400 mr-2">{index + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-lg leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: post.introduction }} />
          </div>
        </section>

        {/* Main Content Modules */}
        {modules.map((module, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-l-4 border-emerald-500 pl-4">
              {module.heading}
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: module.content }} />
            </div>
          </section>
        ))}

        {/* Conclusion */}
        <section className="mb-12 p-6 bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-xl border border-emerald-500/30">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">Conclusion</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.conclusion }} />
          </div>
        </section>

        {/* Links Section */}
        {linksItems.length > 0 && (
          <section className="mb-12 p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Useful Links</h2>
            <ul className="space-y-2">
              {linksItems.map((link, index) => (
                <li key={index} className="text-gray-300" dangerouslySetInnerHTML={{ __html: link }} />
              ))}
            </ul>
          </section>
        )}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-emerald-400">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="p-6 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
                  <h3 className="font-semibold mb-3 text-white flex items-start gap-3">
                    <span className="text-emerald-500 mt-1 text-sm flex-shrink-0">Q:</span>
                    <span className="leading-relaxed">{faq.question}</span>
                  </h3>
                  <p className="text-gray-300 flex items-start gap-3">
                    <span className="text-green-500 mt-1 text-sm flex-shrink-0">A:</span>
                    <span className="leading-relaxed">{faq.answer}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
