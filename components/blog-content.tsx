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
      // Regular expression to find URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g
      
      // Replace URLs with clickable links
      const processedLink = link.replace(urlRegex, (url) => {
        // Clean up URL (remove trailing punctuation if any)
        const cleanUrl = url.replace(/[.,;:]$/, '')
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:text-emerald-300 underline transition-colors">${cleanUrl}</a>`
      })
      
      return processedLink
    })
  }

  const linksItems = parseLinksWithClickableUrls(post.links_section)

  return (
    <div className="p-3 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24">
      {/* Breadcrumbs for SEO and UX */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blogs' },
          { label: post.title },
        ]}
      />

      {/* Hero Image - Optimized for all screen sizes */}
      {post.hero_image && (
        <div className="relative w-[calc(100%+1.5rem)] sm:w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+6rem)] xl:w-[calc(100%+8rem)] 2xl:w-[calc(100%+12rem)] left-1/2 -translate-x-1/2 h-40 sm:h-56 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem] mb-6 sm:mb-8 lg:mb-12 xl:mb-16 rounded-lg sm:rounded-xl overflow-hidden -mt-3 sm:-mt-6 md:-mt-8 lg:-mt-12 xl:-mt-16 2xl:-mt-24">
          <Image 
            src={post.hero_image || "/placeholder.svg"} 
            alt={post.title} 
            fill 
            className="object-cover" 
            priority 
            itemProp="image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      {/* Header - Enhanced for SEO */}
      <header className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 text-center lg:text-left">
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 lg:mb-6 xl:mb-8 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent"
          itemProp="headline"
        >
          {post.h1_title || post.title}
        </h1>

        {/* Article Meta - Mobile optimized */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm mb-3 sm:mb-4 lg:mb-6">
          <div className="flex items-center gap-1 sm:gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span itemProp="name">By {post.author}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs" itemProp="articleSection">{post.category}</span>
          <span className="hidden sm:inline">•</span>
          <time dateTime={post.created_at} itemProp="datePublished" className="text-xs sm:text-sm">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Tags - Mobile responsive */}
        {post.tags && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-1 sm:gap-2 mb-4 sm:mb-6 lg:mb-8 xl:mb-10">
            {post.tags.split(",").map((tag, index) => (
              <span key={index} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-background/60 backdrop-blur-sm border border-gray-700 text-muted-foreground text-xs sm:text-sm rounded-full hover:border-emerald-500/50 transition-colors" itemProp="keywords">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Reading time indicator */}
        <div className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex items-center justify-center lg:justify-start gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{Math.ceil((post.introduction + post.main_modules + post.conclusion).split(' ').length / 200)} min read</span>
        </div>

        {/* Enhanced Gradient Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent mb-4 sm:mb-6 lg:mb-8 xl:mb-10" />
      </header>

      {/* Content with optimized typography and mobile responsiveness */}
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none dark:prose-invert 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-20
          prose-h2:text-lg sm:prose-h2:text-xl lg:prose-h2:text-2xl xl:prose-h2:text-3xl 2xl:prose-h2:text-4xl 
          prose-h2:mb-3 sm:prose-h2:mb-4 lg:prose-h2:mb-6 xl:prose-h2:mb-8 
          prose-h2:mt-6 sm:prose-h2:mt-8 lg:prose-h2:mt-10 xl:prose-h2:mt-12 
          prose-h3:text-base sm:prose-h3:text-lg lg:prose-h3:text-xl xl:prose-h3:text-2xl 2xl:prose-h3:text-3xl 
          prose-h3:mb-2 sm:prose-h3:mb-3 lg:prose-h3:mb-4 xl:prose-h3:mb-6 
          prose-h3:mt-4 sm:prose-h3:mt-6 lg:prose-h3:mt-8 xl:prose-h3:mt-10
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-lg
          prose-p:mb-3 sm:prose-p:mb-4 lg:prose-p:mb-6 xl:prose-p:mb-8 
          prose-a:text-emerald-400 prose-a:no-underline prose-a:transition-colors hover:prose-a:text-emerald-300 
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-emerald-400 prose-code:bg-background/50 prose-code:px-1 sm:prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
          prose-blockquote:border-l-emerald-500 prose-blockquote:bg-background/30 prose-blockquote:pl-3 sm:prose-blockquote:pl-4 lg:prose-blockquote:pl-6 xl:prose-blockquote:pl-8 
          prose-blockquote:py-2 sm:prose-blockquote:py-3 lg:prose-blockquote:py-4 xl:prose-blockquote:py-6 prose-blockquote:rounded-r-lg prose-blockquote:my-4 sm:prose-blockquote:my-6
          prose-ul:space-y-1 sm:prose-ul:space-y-2 lg:prose-ul:space-y-3 prose-ul:my-3 sm:prose-ul:my-4 lg:prose-ul:my-6
          prose-ol:space-y-1 sm:prose-ol:space-y-2 lg:prose-ol:space-y-3 prose-ol:my-3 sm:prose-ol:my-4 lg:prose-ol:my-6
          prose-li:text-muted-foreground prose-li:text-sm sm:prose-li:text-base lg:prose-li:text-lg
          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-4 sm:prose-img:my-6 lg:prose-img:my-8
          prose-table:text-sm sm:prose-table:text-base prose-th:bg-background/50 prose-th:text-foreground prose-th:font-semibold
          prose-td:border-gray-700 prose-th:border-gray-700">
          
          {/* H3 Intro Title */}
          {post.h3_intro_title && (
            <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-emerald-400 text-center lg:text-left" itemProp="alternativeHeadline">{post.h3_intro_title}</h3>
          )}

          {/* Introduction */}
          <div className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed" itemProp="articleBody">
            <div dangerouslySetInnerHTML={{ __html: post.introduction }} />
          </div>

        {/* Table of Contents - Enhanced for mobile and SEO */}
        {tocItems.length > 0 && (
          <nav className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 p-3 sm:p-4 lg:p-6 xl:p-8 bg-background/30 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl" role="navigation" aria-label="Table of Contents">
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-emerald-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Table of Contents
            </h2>
            <ol className="space-y-2 sm:space-y-3 lg:space-y-4 list-none">
              {tocItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, "")
                      .replace(/\s+/g, "-")}`}
                    className="text-sm sm:text-base lg:text-lg text-muted-foreground hover:text-emerald-400 transition-colors flex items-center gap-2 lg:gap-3 group p-2 rounded hover:bg-background/20"
                    aria-label={`Navigate to section: ${item}`}
                  >
                    <span className="text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity text-xs sm:text-sm lg:text-base font-mono min-w-[1.5rem]">{(index + 1).toString().padStart(2, '0')}.</span>
                    <span className="leading-relaxed">{item}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Main Modules/Sections - Enhanced for SEO and readability */}
        {modules.map((module, index) => {
          const sectionId = module.heading
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-")

          return (
            <section key={index} id={sectionId} className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 scroll-mt-20" itemProp="articleSection">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-foreground flex items-start gap-2 lg:gap-3 xl:gap-4">
                <div className="w-1 h-5 sm:h-6 lg:h-8 xl:h-10 2xl:h-12 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full mt-1 flex-shrink-0"></div>
                <span className="leading-tight">{module.heading}</span>
              </h3>
              <div className="pl-3 sm:pl-4 lg:pl-6 xl:pl-8 border-l border-gray-700/50 space-y-3 sm:space-y-4 lg:space-y-6">
                <div dangerouslySetInnerHTML={{ __html: module.content }} />
              </div>
            </section>
          )
        })}

        {/* Conclusion - Enhanced for SEO */}
        {post.conclusion && (
          <section className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 p-4 sm:p-6 lg:p-8 xl:p-10 bg-gradient-to-r from-emerald-500/10 to-green-600/10 border border-emerald-500/20 rounded-lg sm:rounded-xl" itemProp="articleBody">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-emerald-400 flex items-center gap-2 lg:gap-3 xl:gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              Conclusion
            </h2>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div dangerouslySetInnerHTML={{ __html: post.conclusion }} />
            </div>
          </section>
        )}

        {/* Links Section - Mobile optimized */}
        {linksItems.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 text-emerald-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Useful Links & Resources
            </h2>
            <div className="p-3 sm:p-4 lg:p-6 xl:p-8 bg-background/30 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl hover:border-emerald-500/50 transition-colors">
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                {linksItems.map((link, index) => (
                  <li key={index} className="text-sm sm:text-base lg:text-lg flex items-start gap-2">
                    <span className="text-emerald-500 mt-1 text-xs">•</span>
                    <div dangerouslySetInnerHTML={{ __html: link }} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ Section - Enhanced for SEO and mobile */}
        {faqItems.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16" itemScope itemType="https://schema.org/FAQPage">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 xl:mb-12 text-emerald-400 flex items-center gap-2 lg:gap-3 xl:gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {faqItems.map((faq, index) => (
                <div key={index} className="p-3 sm:p-4 lg:p-6 xl:p-8 bg-background/30 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl hover:border-emerald-500/50 transition-colors" itemScope itemType="https://schema.org/Question">
                  <h4 className="font-bold text-sm sm:text-base lg:text-lg xl:text-xl mb-2 sm:mb-3 lg:mb-4 text-foreground flex items-start gap-2 lg:gap-3" itemProp="name">
                    <span className="text-emerald-500 mt-1 text-xs sm:text-sm lg:text-base flex-shrink-0">Q:</span>
                    <span className="leading-relaxed">{faq.question}</span>
                  </h4>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed flex items-start gap-2 lg:gap-3" itemProp="text">
                      <span className="text-green-500 mt-1 text-xs sm:text-sm lg:text-base flex-shrink-0">A:</span>
                      <span className="leading-relaxed">{faq.answer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        </div>
      </div>
    </div>
  )
}
