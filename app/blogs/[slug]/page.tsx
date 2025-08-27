import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogSlugs } from "@/lib/sheets"
import { BlogContent } from "@/components/blog-content"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

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
      title: "Blog Post Not Found | Aniket Kumar",
      description: "The requested blog post could not be found.",
    }
  }

  const keywords = post.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anidz.app'
  const fullUrl = `${baseUrl}/blogs/${slug}`
  
  // Enhanced SEO title with brand
  const seoTitle = post.h1_title || post.title
  const fullTitle = seoTitle.includes('Aniket Kumar') ? seoTitle : `${seoTitle} | Aniket Kumar`
  
  // Enhanced description
  const seoDescription = post.metaDesc || `${post.introduction?.substring(0, 160)}...`

  return {
    title: fullTitle,
    description: seoDescription,
    keywords: [...keywords, 'Aniket Kumar', 'cybersecurity', 'tech blog', 'security', 'developer'],
    authors: [{ name: post.author, url: baseUrl }],
    category: post.category,
    creator: post.author,
    publisher: 'Aniket Kumar',
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
      siteName: 'Aniket Kumar',
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
      site: '@AniD_z',
      creator: '@AniD_z',
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anidz.app'
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
      name: "Aniket Kumar",
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
      name: "Aniket Kumar"
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
      
      <main className="relative min-h-screen overflow-x-hidden">
        {/* NavBar */}
        <NavBar />

        {/* Content container with enhanced mobile/desktop responsiveness */}
        <div className="w-full">
          <article className="shadow-2xl overflow-hidden">
            <BlogContent post={post} />
          </article>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
