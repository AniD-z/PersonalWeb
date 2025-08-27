import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogSlugs } from "@/lib/sheets"
import { BlogContent } from "@/components/blog-content"
import { NavBar } from "@/components/nav-bar"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Footer } from "@/components/footer"
import { PoweredByBadge } from "@/components/powered-by-badge"

// Enable static generation with revalidation
export const revalidate = 300 // 5 minutes

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found | TeyzSec",
      description: "The requested blog post could not be found.",
    }
  }

  const keywords = post.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://teyzsec.com'
  const fullUrl = `${baseUrl}/blogs/${slug}`
  
  // Enhanced SEO title with brand
  const seoTitle = post.h1_title || post.title
  const fullTitle = seoTitle.includes('TeyzSec') ? seoTitle : `${seoTitle} | TeyzSec`
  
  // Enhanced description
  const seoDescription = post.metaDesc || `${post.introduction?.substring(0, 160)}...`

  return {
    title: fullTitle,
    description: seoDescription,
    keywords: [...keywords, 'TeyzSec', 'cybersecurity', 'tech blog', 'security'],
    authors: [{ name: post.author, url: baseUrl }],
    category: post.category,
    creator: post.author,
    publisher: 'TeyzSec',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: seoDescription,
      url: fullUrl,
      siteName: 'TeyzSec',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: post.hero_image,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
      authors: [post.author],
      publishedTime: post.created_at,
      modifiedTime: post.created_at,
      section: post.category,
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@TeyzSec',
      creator: '@TeyzSec',
      title: fullTitle,
      description: seoDescription,
      images: [
        {
          url: post.hero_image,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.created_at,
      'article:section': post.category,
      'article:tag': keywords.join(', '),
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post || post.status !== "published") {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://teyzsec.com'
  const fullUrl = `${baseUrl}/blogs/${slug}`
  
  // Calculate reading time (average 200 words per minute)
  const wordCount = (post.introduction + post.main_modules + post.conclusion).split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": fullUrl,
    headline: post.h1_title || post.title,
    alternativeHeadline: post.title,
    description: post.metaDesc,
    image: {
      "@type": "ImageObject",
      url: post.hero_image,
      width: 1200,
      height: 630,
      caption: post.title
    },
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: {
      "@type": "Person",
      name: post.author,
      url: baseUrl
    },
    publisher: {
      "@type": "Organization",
      name: "TeyzSec",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/placeholder-logo.png`,
        width: 300,
        height: 100
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    keywords: post.tags,
    articleSection: post.category,
    articleBody: post.introduction,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    copyrightHolder: {
      "@type": "Organization",
      name: "TeyzSec"
    },
    copyrightYear: new Date(post.created_at).getFullYear(),
    genre: ["Technology", "Cybersecurity", "Education"],
    audience: {
      "@type": "Audience",
      audienceType: "Technology Professionals"
    }
  }

  return (
    <>
      {/* SEO Head elements */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden" itemScope itemType="https://schema.org/BlogPosting">
        {/* NavBar and ProfileDropdown */}
        <NavBar />
        <ProfileDropdown />

        {/* Content container with enhanced mobile/desktop responsiveness */}
        <div className="relative z-10 w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-8 lg:py-16">
          <div className="max-w-8xl mx-auto">
            <article className="bg-background/80 backdrop-blur-md rounded-lg sm:rounded-2xl border-0 sm:border border-gray-800/50 shadow-2xl overflow-hidden">
              <BlogContent post={post} />
            </article>
          </div>
        </div>

        {/* Powered By Badge - Mobile optimized */}
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
          <PoweredByBadge />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
