
import Link from "next/link"
import Image from "next/image"
import { getPaginatedPublishedPosts } from "@/lib/sheets"
import { Pagination } from "@/components/pagination"
import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Footer } from "@/components/footer"

// Enable static generation with revalidation
export const revalidate = 300 // 5 minutes

interface BlogIndexProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const pageSize = 12

  const { posts, totalPosts, totalPages, currentPage, hasNextPage, hasPrevPage } = await getPaginatedPublishedPosts(
    page,
    pageSize,
  )

  return (
    <main className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* NavBar and ProfileDropdown */}
      <NavBar />
      <ProfileDropdown />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">Insights & Stories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles on plastic recycling, sustainability, and industry innovations
          </p>
        </header>

        {/* Featured Articles Section */}
        {posts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium rounded-full">
                Featured
              </div>
              <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Main Featured Article */}
              <article className="group bg-background/80 rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 flex flex-col">
                <Link href={`/blogs/${posts[0].slug}`} className="block flex-grow">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={posts[0].hero_image || "/placeholder.svg"}
                      alt={posts[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-3 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">{posts[0].category}</span>
                      <span>•</span>
                      <span>{posts[0].author}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors line-clamp-2 flex-grow">
                      {posts[0].h1_title || posts[0].title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">{posts[0].metaDesc}</p>
                    <time className="text-sm text-muted-foreground block mt-auto">
                      {new Date(posts[0].created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </article>

              {/* Side Featured Articles */}
              <div className="space-y-4 flex flex-col">
                {posts.slice(1, 3).map((post, index) => (
                  <article key={post.slug} className="group bg-background/60 rounded-lg overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 flex-grow">
                    <Link href={`/blogs/${post.slug}`} className="flex gap-4 p-4 h-full">
                      <div className="relative w-24 h-full flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={post.hero_image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 space-y-2 flex flex-col">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-emerald-400">{index + 2}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                        </div>
                        <h4 className="font-semibold group-hover:text-emerald-400 transition-colors line-clamp-2 text-sm flex-grow">
                          {post.h1_title || post.title}
                        </h4>
                        <time className="text-xs text-muted-foreground mt-auto">
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
            <p className="text-sm text-muted-foreground">
              {totalPosts} article{totalPosts !== 1 ? "s" : ""} • Page {currentPage} of {totalPages}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(3).map((post) => (
              <article key={post.slug} className="group bg-background/80 rounded-xl shadow-lg overflow-hidden border border-gray-800 hover:border-emerald-500 transition-all duration-300 flex flex-col">
                <Link href={`/blogs/${post.slug}`} className="block flex-grow">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.hero_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-2 px-4 pb-4 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>

                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent flex-grow">
                      {post.h1_title || post.title}
                    </h2>

                    <p className="text-muted-foreground line-clamp-3">{post.metaDesc}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <time className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>

                      {post.tags && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags
                            .split(",")
                            .slice(0, 2)
                            .map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                                {tag.trim()}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            basePath="/blogs"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
