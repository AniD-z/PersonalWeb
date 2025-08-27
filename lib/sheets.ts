import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"
import type { BlogPost, LightweightBlogPost, PaginatedPosts } from "@/types/blog"
import { blogCache, CACHE_KEYS } from "./cache"

const SHEET_ID = process.env.GOOGLE_SHEET_ID!
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n")

const serviceAccountAuth = new JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

async function getSheet() {
  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth)
  await doc.loadInfo()
  return doc.sheetsByIndex[0]
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function safeLog(message: string, data?: any) {
  // Logging disabled for security in production
  return
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Check cache first
  const cached = blogCache.get<BlogPost[]>(CACHE_KEYS.ALL_POSTS)
  if (cached) {
    return cached
  }

  try {
    safeLog("🔄 Fetching all posts from data source...")

    const sheet = await getSheet()
    const rows = await sheet.getRows()

    const posts = rows.map((row) => {
      const title = row.get("title") || ""
      const providedSlug = row.get("slug") || ""
      const slug = providedSlug || generateSlug(title)

      return {
        title,
        slug,
        metaDesc: row.get("metaDesc") || "",
        hero_image: row.get("hero_image") || "/placeholder.svg?height=400&width=800",
        status: (row.get("status") || "draft") as "draft" | "published",
        h1_title: row.get("h1_title") || title,
        h3_intro_title: row.get("h3_intro_title") || "",
        introduction: row.get("introduction") || "",
        table_of_contents: row.get("table_of_contents") || "",
        main_modules: row.get("main_modules") || "",
        conclusion: row.get("conclusion") || "",
        links_section: row.get("links_section") || "",
        faq_section: row.get("faq_section") || "",
        created_at: row.get("created_at") || new Date().toISOString(),
        author: row.get("author") || "Admin",
        category: row.get("category") || "General",
        tags: row.get("tags") || "",
      } as BlogPost
    })

    // Cache the results
    blogCache.set(CACHE_KEYS.ALL_POSTS, posts)
    safeLog(`✅ Cached ${posts.length} posts`)

    return posts
  } catch (error) {
    // Re-throw error to maintain proper error handling
    throw error
  }
}

export async function getLightweightPosts(): Promise<LightweightBlogPost[]> {
  // Check cache first
  const cached = blogCache.get<LightweightBlogPost[]>(CACHE_KEYS.LIGHTWEIGHT_POSTS)
  if (cached) {
    return cached
  }

  try {
    safeLog("🔄 Fetching lightweight posts...")

    const sheet = await getSheet()
    const rows = await sheet.getRows()

    const posts = rows.map((row) => {
      const title = row.get("title") || ""
      const providedSlug = row.get("slug") || ""
      const slug = providedSlug || generateSlug(title)

      return {
        title,
        slug,
        metaDesc: row.get("metaDesc") || "",
        hero_image: row.get("hero_image") || "/placeholder.svg?height=400&width=800",
        status: (row.get("status") || "draft") as "draft" | "published",
        h1_title: row.get("h1_title") || title,
        created_at: row.get("created_at") || new Date().toISOString(),
        author: row.get("author") || "Admin",
        category: row.get("category") || "General",
        tags: row.get("tags") || "",
      } as LightweightBlogPost
    })

    // Cache the results
    blogCache.set(CACHE_KEYS.LIGHTWEIGHT_POSTS, posts)
    safeLog(`✅ Cached ${posts.length} lightweight posts`)

    return posts
  } catch (error) {
    // Re-throw error to maintain proper error handling
    throw error
  }
}

export async function getPaginatedPublishedPosts(page = 1, pageSize = 12): Promise<PaginatedPosts> {
  const cacheKey = `${CACHE_KEYS.PUBLISHED_POSTS}:page:${page}:size:${pageSize}`
  const cached = blogCache.get<PaginatedPosts>(cacheKey)
  if (cached) {
    return cached
  }

  const lightweightPosts = await getLightweightPosts()
  const publishedPosts = lightweightPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const totalPosts = publishedPosts.length
  const totalPages = Math.ceil(totalPosts / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const posts = publishedPosts.slice(startIndex, endIndex)

  const result: PaginatedPosts = {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }

  // Cache the paginated result
  blogCache.set(cacheKey, result)
  safeLog(`✅ Cached paginated posts for page ${page}`)

  return result
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const cached = blogCache.get<BlogPost[]>(CACHE_KEYS.PUBLISHED_POSTS)
  if (cached) {
    return cached
  }

  const posts = await getAllPosts()
  const publishedPosts = posts.filter((post) => post.status === "published")

  blogCache.set(CACHE_KEYS.PUBLISHED_POSTS, publishedPosts)
  return publishedPosts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const cacheKey = CACHE_KEYS.POST_BY_SLUG(slug)
  const cached = blogCache.get<BlogPost>(cacheKey)
  if (cached) {
    return cached
  }

  const posts = await getAllPosts()
  const foundPost = posts.find((post) => post.slug === slug)

  if (foundPost) {
    blogCache.set(cacheKey, foundPost)
  }

  return foundPost || null
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const cached = blogCache.get<string[]>(CACHE_KEYS.BLOG_SLUGS)
  if (cached) {
    return cached
  }

  const posts = await getAllPublishedPosts()
  const slugs = posts.map((post) => post.slug)

  blogCache.set(CACHE_KEYS.BLOG_SLUGS, slugs)
  return slugs
}

export async function updatePostStatus(slug: string, status: "draft" | "published"): Promise<void> {
  try {
    const sheet = await getSheet()
    const rows = await sheet.getRows()

    const row = rows.find((r) => {
      const title = r.get("title") || ""
      const providedSlug = r.get("slug") || ""
      const generatedSlug = providedSlug || generateSlug(title)
      return generatedSlug === slug
    })

    if (row) {
      row.set("status", status)
      await row.save()

      // Clear all caches when data changes
      blogCache.clear()
      safeLog(`✅ Updated post status and cleared cache: ${slug} -> ${status}`)
    }
  } catch (error) {
    // Error logging disabled for security
    // if (process.env.NODE_ENV === "development") {
    //   console.error("Error updating post status:", error instanceof Error ? error.message : "Unknown error")
    // }
    throw new Error("Failed to update post status")
  }
}

export async function getLatestPosts(limit: number = 3, excludeSlug?: string): Promise<LightweightBlogPost[]> {
  // Check cache first
  const cacheKey = `latest_posts_${limit}_${excludeSlug || 'none'}`
  const cached = blogCache.get<LightweightBlogPost[]>(cacheKey)
  if (cached) {
    return cached
  }

  try {
    const posts = await getLightweightPosts()
    
    // Filter published posts, exclude current post if specified, sort by created_at (newest first), and take the limit
    const latestPosts = posts
      .filter(post => post.status === "published" && (!excludeSlug || post.slug !== excludeSlug))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)

    // Cache the results
    blogCache.set(cacheKey, latestPosts, 300000) // 5 minutes cache
    safeLog(`✅ Cached ${latestPosts.length} latest posts`)

    return latestPosts
  } catch (error) {
    throw error
  }
}
