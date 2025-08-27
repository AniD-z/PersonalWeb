interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

interface CacheStats {
  hits: number
  misses: number
  size: number
}

class InMemoryCache {
  private cache = new Map<string, CacheItem<any>>()
  private stats: CacheStats = { hits: 0, misses: 0, size: 0 }
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    }

    this.cache.set(key, item)
    this.stats.size = this.cache.size
    this.logCacheOperation("SET", key)
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      this.stats.misses++
      this.logCacheOperation("MISS", key)
      return null
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      this.stats.size = this.cache.size
      this.stats.misses++
      this.logCacheOperation("EXPIRED", key)
      return null
    }

    this.stats.hits++
    this.logCacheOperation("HIT", key)
    return item.data
  }

  clear(pattern?: string): void {
    if (pattern) {
      // Clear keys matching pattern
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      // Clear all
      this.cache.clear()
    }

    this.stats.size = this.cache.size
    this.logCacheOperation("CLEAR", pattern || "ALL")
  }

  getStats(): CacheStats {
    return { ...this.stats }
  }

  private logCacheOperation(operation: string, key: string): void {
    // Cache logging disabled for security
    // Only enable in development with explicit debug flag
    if (process.env.NODE_ENV === "development" && process.env.ENABLE_CACHE_DEBUG === "true") {
      // console.log(`🗄️ Cache ${operation}: ${key}`)
    }
  }

  // Cleanup expired items
  cleanup(): void {
    const now = Date.now()
    let cleaned = 0

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
        cleaned++
      }
    }

    this.stats.size = this.cache.size
    if (cleaned > 0) {
      this.logCacheOperation("CLEANUP", `${cleaned} items`)
    }
  }
}

// Global cache instance
export const blogCache = new InMemoryCache()

// Cache keys
export const CACHE_KEYS = {
  ALL_POSTS: "blog:all_posts",
  PUBLISHED_POSTS: "blog:published_posts",
  LIGHTWEIGHT_POSTS: "blog:lightweight_posts",
  POST_BY_SLUG: (slug: string) => `blog:post:${slug}`,
  BLOG_SLUGS: "blog:slugs",
} as const
