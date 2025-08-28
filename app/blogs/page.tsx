
import Link from "next/link"
import Image from "next/image"
import { getPaginatedPublishedPosts } from "@/lib/sheets"
import { Pagination } from "@/components/pagination"
import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

// Enable static generation with revalidation
export const revalidate = 300 // 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Insights & Stories',
    description: 'Explore the latest articles on Cybersecurity, sustainability, and industry innovations by Aniket Kumar.',
    keywords: ['blog', 'cybersecurity', 'articles', 'Aniket Kumar', 'security', 'technology', 'insights'],
    openGraph: {
      title: 'Blog - Insights & Stories | Aniket Kumar',
      description: 'Explore the latest articles on Cybersecurity, sustainability, and industry innovations by Aniket Kumar.',
      url: 'https://anidz.app/blogs',
      siteName: 'Aniket Kumar',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@AniD_z',
      creator: '@AniD_z',
      title: 'Blog - Insights & Stories | Aniket Kumar',
      description: 'Explore the latest articles on Cybersecurity, sustainability, and industry innovations by Aniket Kumar.',
    },
    alternates: {
      canonical: 'https://anidz.app/blogs',
    },
  }
}

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
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950 text-foreground overflow-x-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-900/5 to-transparent"></div>
      
      {/* NavBar */}
      <NavBar />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Latest Insights
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
            Insights & Stories
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive deep into <span className="text-emerald-400 font-semibold">cybersecurity</span>, explore cutting-edge technology, and discover industry innovations that shape our digital future.
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
              <article className="group bg-background/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-500 flex flex-col hover:shadow-emerald-500/20">
                <Link href={`/blogs/${posts[0].slug}`} className="block flex-grow">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={posts[0].hero_image || "/placeholder.svg"}
                      alt={posts[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-4 flex-grow flex flex-col bg-gradient-to-b from-gray-900/90 to-gray-800/90">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-medium border border-emerald-500/30">{posts[0].category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-300">{posts[0].author}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors line-clamp-2 flex-grow text-white">
                      {posts[0].h1_title || posts[0].title}
                    </h3>
                    <p className="text-gray-300 line-clamp-3 leading-relaxed">{posts[0].metaDesc}</p>
                    <time className="text-sm text-emerald-400 block mt-auto font-medium">
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
                  <article key={post.slug} className="group bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-500 flex flex-col hover:shadow-emerald-500/20">
                    <Link href={`/blogs/${post.slug}`} className="flex gap-4 p-0 h-32 min-h-[8rem]">
                      <div className="relative w-32 h-full flex-shrink-0 rounded-l-xl overflow-hidden">
                        <Image
                          src={post.hero_image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                      </div>
                      <div className="flex-1 space-y-2 flex flex-col justify-between p-4">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-6 h-6 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center font-bold text-xs">{index + 2}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-emerald-300 font-medium">{post.category}</span>
                        </div>
                        <h4 className="font-semibold group-hover:text-emerald-400 transition-colors line-clamp-2 text-base flex-grow text-white">
                          {post.h1_title || post.title}
                        </h4>
                        <time className="text-xs text-emerald-400 mt-auto font-medium">
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
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.hero_image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 rounded-full text-xs font-medium border border-emerald-500/30">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3 flex-grow flex flex-col bg-gradient-to-b from-gray-900/90 to-gray-800/90">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{post.author}</span>
                      <span>•</span>
                      <time className="text-emerald-400">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors line-clamp-2 flex-grow text-white">
                      {post.h1_title || post.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">{post.metaDesc}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700/50">
                      <span className="text-xs text-emerald-400 font-medium">Read more →</span>
                      <div className="flex items-center text-xs text-gray-400">
                        <span>5 min read</span>
                      </div>
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
